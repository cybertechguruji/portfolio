import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { parseJupyterNotebook, ParsedNotebook } from "./notebook";

export interface ContentItem {
  slug: string;
  title: string;
  date: string;
  category: string;
  thumbnail: string;
  description: string;
  contentHtml?: string;
  rawContent?: string;
  projectType?: "dashboard" | "notebook" | "standard";
  dashboardData?: any;
  notebookData?: ParsedNotebook | null;
}

const contentRoot = path.join(process.cwd(), "content");
const publicRoot = path.join(process.cwd(), "public");

/**
 * Synchronize static assets (images, pdfs, etc.) from a post's folder
 * into public/_content/<directory>/<slug>/ so Next.js can serve them directly.
 */
function syncFolderAssets(sourceDir: string, targetSubPath: string): void {
  try {
    const destDir = path.join(publicRoot, "_content", targetSubPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && !entry.name.endsWith(".md")) {
        const srcFile = path.join(sourceDir, entry.name);
        const destFile = path.join(destDir, entry.name);

        const srcStat = fs.statSync(srcFile);
        const shouldCopy =
          !fs.existsSync(destFile) ||
          srcStat.mtimeMs > fs.statSync(destFile).mtimeMs;

        if (shouldCopy) {
          fs.copyFileSync(srcFile, destFile);
        }
      }
    }
  } catch (err) {
    console.error(`Failed to sync assets for ${targetSubPath}:`, err);
  }
}

/**
 * Resolves a thumbnail path:
 * If it's relative (e.g. './cover.png' or 'cover.png'), maps it to '/_content/<dir>/<slug>/<file>'.
 * If it's already absolute (e.g. '/images/...' or 'https://...'), leaves it intact.
 */
function resolveThumbnailPath(
  thumbnail: string | undefined,
  directory: "blogs" | "projects",
  slug: string,
  isFolder: boolean
): string {
  if (!thumbnail) return "/images/placeholder.svg";

  if (
    thumbnail.startsWith("http://") ||
    thumbnail.startsWith("https://") ||
    thumbnail.startsWith("/")
  ) {
    return thumbnail;
  }

  if (isFolder) {
    const cleaned = thumbnail.replace(/^\.\//, "");
    return `/_content/${directory}/${slug}/${cleaned}`;
  }

  return thumbnail;
}

/**
 * Resolves relative image src inside HTML:
 * Transforms <img src="./chart.png"> or <img src="chart.png">
 * into <img src="/_content/<dir>/<slug>/chart.png">.
 */
function resolveHtmlImages(
  htmlContent: string,
  directory: "blogs" | "projects",
  slug: string
): string {
  const baseAssetPath = `/_content/${directory}/${slug}`;

  return htmlContent.replace(
    /<img([^>]+)src=["'](?:\.\/)?([^"']+)["']/gi,
    (match, prefix, src) => {
      if (
        src.startsWith("http://") ||
        src.startsWith("https://") ||
        src.startsWith("/") ||
        src.startsWith("data:")
      ) {
        return match;
      }
      return `<img${prefix}src="${baseAssetPath}/${src}"`;
    }
  );
}

/**
 * Find the markdown file path and folder status for a given slug.
 * Supports:
 * 1. content/<dir>/<slug>/index.md
 * 2. content/<dir>/<slug>/<slug>.md
 * 3. content/<dir>/<slug>.md (legacy single-file format)
 */
function resolvePostPath(
  directory: "blogs" | "projects",
  slug: string
): { filePath: string; folderDir: string | null } | null {
  const dirPath = path.join(contentRoot, directory);

  // 1. Folder with index.md
  const folderIndex = path.join(dirPath, slug, "index.md");
  if (fs.existsSync(folderIndex)) {
    return { filePath: folderIndex, folderDir: path.join(dirPath, slug) };
  }

  // 2. Folder with <slug>.md
  const folderNamed = path.join(dirPath, slug, `${slug}.md`);
  if (fs.existsSync(folderNamed)) {
    return { filePath: folderNamed, folderDir: path.join(dirPath, slug) };
  }

  // 3. Loose <slug>.md file
  const looseFile = path.join(dirPath, `${slug}.md`);
  if (fs.existsSync(looseFile)) {
    return { filePath: looseFile, folderDir: null };
  }

  return null;
}

// Get all items in a folder (e.g. 'blogs' or 'projects')
export function getAllContent(directory: "blogs" | "projects"): ContentItem[] {
  const dirPath = path.join(contentRoot, directory);

  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const items: ContentItem[] = [];

  for (const entry of entries) {
    let slug = "";
    let resolved: { filePath: string; folderDir: string | null } | null = null;

    if (entry.isDirectory()) {
      slug = entry.name;
      resolved = resolvePostPath(directory, slug);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      slug = entry.name.replace(/\.md$/, "");
      resolved = resolvePostPath(directory, slug);
    }

    if (!resolved) continue;

    try {
      const fileContents = fs.readFileSync(resolved.filePath, "utf8");
      const { data, content } = matter(fileContents);

      if (resolved.folderDir) {
        syncFolderAssets(resolved.folderDir, `${directory}/${slug}`);
      }

      const thumbnail = resolveThumbnailPath(
        data.thumbnail,
        directory,
        slug,
        Boolean(resolved.folderDir)
      );

      items.push({
        slug,
        title: data.title || "Untitled",
        date: data.date || "",
        category: data.category || "General",
        thumbnail,
        description: data.description || "",
        rawContent: content,
        projectType: data.projectType || "standard",
      });
    } catch (err) {
      console.error(`Error reading ${resolved.filePath}:`, err);
    }
  }

  // Sort newest first by date if date exists
  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Get single item by slug with rendered HTML
export async function getContentBySlug(
  directory: "blogs" | "projects",
  slug: string
): Promise<ContentItem | null> {
  const resolved = resolvePostPath(directory, slug);

  if (!resolved) {
    return null;
  }

  const fileContents = fs.readFileSync(resolved.filePath, "utf8");
  const { data, content } = matter(fileContents);

  // Sync assets if in co-located folder
  if (resolved.folderDir) {
    syncFolderAssets(resolved.folderDir, `${directory}/${slug}`);
  }

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(content);
  let rawHtml = processedContent.toString();

  // Resolve relative image URLs if in co-located folder
  if (resolved.folderDir) {
    rawHtml = resolveHtmlImages(rawHtml, directory, slug);
  }

  // Wrap all tables in a full-width responsive container for Style A
  const contentHtml = rawHtml
    .replace(
      /<table>/g,
      '<div class="table-wrapper my-6 w-full max-w-full overflow-x-auto rounded-2xl border border-m3-outline-variant/30 bg-m3-surface-container-lowest shadow-sm"><table class="w-full min-w-full table-auto border-collapse">'
    )
    .replace(/<\/table>/g, "</table></div>");

  const thumbnail = resolveThumbnailPath(
    data.thumbnail,
    directory,
    slug,
    Boolean(resolved.folderDir)
  );

  let dashboardData = data.dashboard || null;
  if (!dashboardData && resolved.folderDir) {
    const dashboardJsonPath = path.join(resolved.folderDir, "dashboard.json");
    if (fs.existsSync(dashboardJsonPath)) {
      try {
        dashboardData = JSON.parse(fs.readFileSync(dashboardJsonPath, "utf8"));
      } catch (e) {
        console.error(`Failed to parse dashboard.json in ${resolved.folderDir}`, e);
      }
    }
  }

  let notebookData: ParsedNotebook | null = null;
  if (data.projectType === "notebook" && resolved.folderDir) {
    let notebookPath = data.notebookFile
      ? path.join(resolved.folderDir, data.notebookFile.replace(/^\.\//, ""))
      : null;

    if (!notebookPath || !fs.existsSync(notebookPath)) {
      // Find first .ipynb in directory
      const ipynbFile = fs
        .readdirSync(resolved.folderDir)
        .find((f) => f.endsWith(".ipynb"));
      if (ipynbFile) {
        notebookPath = path.join(resolved.folderDir, ipynbFile);
      }
    }

    if (notebookPath && fs.existsSync(notebookPath)) {
      try {
        const rawJson = fs.readFileSync(notebookPath, "utf8");
        notebookData = await parseJupyterNotebook(rawJson);
      } catch (e) {
        console.error(`Failed to parse notebook at ${notebookPath}`, e);
      }
    }
  }

  return {
    slug,
    title: data.title || "Untitled",
    date: data.date || "",
    category: data.category || "General",
    thumbnail,
    description: data.description || "",
    contentHtml,
    rawContent: content,
    projectType: data.projectType || "standard",
    dashboardData,
    notebookData,
  };
}
