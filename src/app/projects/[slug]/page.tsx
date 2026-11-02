import { Suspense } from "react";
import { getContentBySlug, getAllContent } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { ProjectDashboard } from "@/components/project-dashboard";
import { ProjectNotebook } from "@/components/project-notebook";

interface ProjectPostProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = getAllContent("projects");
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPostProps) {
  const { slug } = await params;
  const project = await getContentBySlug("projects", slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Data Analyst Portfolio`,
    description: project.description,
  };
}

function ProjectPostSkeleton() {
  return (
    <article className="w-full max-w-full bg-m3-surface-container-low border border-m3-outline-variant/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-m3-1 animate-pulse overflow-hidden">
      <div className="flex gap-3 sm:gap-4 mb-4">
        <div className="h-6 w-24 bg-m3-surface-container-highest rounded-full" />
        <div className="h-6 w-20 bg-m3-surface-container-highest rounded-full" />
      </div>
      <div className="h-8 sm:h-10 w-3/4 bg-m3-surface-container-highest rounded-xl mb-6" />
      <div className="space-y-3">
        <div className="h-4 w-full bg-m3-surface-container-highest rounded" />
        <div className="h-4 w-5/6 bg-m3-surface-container-highest rounded" />
        <div className="h-4 w-2/3 bg-m3-surface-container-highest rounded" />
      </div>
    </article>
  );
}

async function ProjectPostContent({ params }: ProjectPostProps) {
  const { slug } = await params;
  const project = await getContentBySlug("projects", slug);

  if (!project) {
    notFound();
  }

  const isDashboard = project.projectType === "dashboard";
  const isNotebook = project.projectType === "notebook";

  // Check if notebook has an embedded {{notebook}} tag in the markdown story
  const notebookTagRegex = /<p>\s*\{\{\s*notebook\s*\}\}\s*<\/p>|\{\{\s*notebook\s*\}\}/i;
  const hasNotebookTag = isNotebook && Boolean(project.notebookData) && notebookTagRegex.test(project.contentHtml || "");

  let beforeNotebookHtml = project.contentHtml || "";
  let afterNotebookHtml = "";

  if (hasNotebookTag) {
    const parts = (project.contentHtml || "").split(notebookTagRegex);
    beforeNotebookHtml = parts[0] || "";
    afterNotebookHtml = parts[1] || "";
  }

  const proseClasses = `prose dark:prose-invert max-w-none w-full
    [&>h1]:text-2xl sm:[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mt-10 [&>h1]:mb-4 [&>h1]:text-m3-on-surface [&>h1]:break-words
    [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-m3-on-surface [&>h2]:border-b [&>h2]:border-m3-outline-variant/30 [&>h2]:pb-2.5 [&>h2]:break-words
    [&>h3]:text-base sm:[&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-m3-on-surface [&>h3]:break-words
    [&>h4]:text-sm sm:[&>h4]:text-base [&>h4]:font-semibold [&>h4]:mt-4 [&>h4]:mb-2 [&>h4]:text-m3-on-surface [&>h4]:break-words
    [&>p]:text-m3-on-surface-variant [&>p]:leading-relaxed [&>p]:mb-4 [&>p]:text-sm sm:[&>p]:text-base [&>p]:break-words
    [&>ul]:list-disc [&>ul]:pl-5 sm:[&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:mb-6 [&>ul]:text-m3-on-surface-variant [&>ul]:text-sm sm:[&>ul]:text-base [&>ul]:break-words
    [&>ol]:list-decimal [&>ol]:pl-5 sm:[&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:mb-6 [&>ol]:text-m3-on-surface-variant [&>ol]:text-sm sm:[&>ol]:text-base [&>ol]:break-words
    [&_li]:marker:text-m3-primary
    [&>blockquote]:border-l-4 [&>blockquote]:border-m3-primary [&>blockquote]:bg-m3-surface-container [&>blockquote]:pl-4 [&>blockquote]:py-3 [&>blockquote]:rounded-r-xl [&>blockquote]:italic [&>blockquote]:my-6 [&>blockquote]:text-m3-on-surface [&>blockquote]:break-words
    [&_.table-wrapper]:my-6 [&_.table-wrapper]:w-full [&_.table-wrapper]:max-w-full [&_.table-wrapper]:overflow-x-auto [&_.table-wrapper]:rounded-2xl [&_.table-wrapper]:border [&_.table-wrapper]:border-m3-outline-variant/30 [&_.table-wrapper]:bg-m3-surface-container-lowest [&_.table-wrapper]:shadow-sm
    [&_table]:w-full [&_table]:min-w-full [&_table]:table-auto [&_table]:border-collapse
    [&_thead]:bg-m3-surface-container [&_thead]:w-full
    [&_th]:text-m3-on-surface [&_th]:font-semibold [&_th]:px-4 [&_th]:py-3 sm:[&_th]:px-5 sm:[&_th]:py-3.5 [&_th]:border-b [&_th]:border-m3-outline-variant/30 [&_th]:text-xs sm:[&_th]:text-sm
    [&_tbody_tr]:transition-colors hover:[&_tbody_tr]:bg-m3-surface-container-low/50
    [&_td]:px-4 [&_td]:py-3 sm:[&_td]:px-5 sm:[&_td]:py-3.5 [&_td]:border-b [&_td]:border-m3-outline-variant/20 [&_td]:text-m3-on-surface-variant [&_td]:text-xs sm:[&_td]:text-sm
    [&_tbody_tr:last-child>td]:border-b-0
    [&_a]:text-m3-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:opacity-80 [&_a]:break-words
    [&_img]:rounded-xl sm:[&_img]:rounded-2xl [&_img]:border [&_img]:border-m3-outline-variant/30 [&_img]:my-6 [&_img]:max-w-full [&_img]:h-auto [&_img]:object-contain [&_img]:shadow-m3-1 [&_img]:mx-auto
    [&>hr]:my-8 sm:[&>hr]:my-10 [&>hr]:border-m3-outline-variant/30
    [&>pre]:w-full [&>pre]:max-w-full [&>pre]:overflow-x-auto [&>pre]:bg-[#1e1e1e] [&>pre]:text-[#d4d4d4] dark:[&>pre]:bg-[#121316] dark:[&>pre]:text-[#e2e2e6] [&>pre]:border [&>pre]:border-m3-outline-variant/40 [&>pre]:p-4 [&>pre]:rounded-2xl [&>pre]:my-6 [&>pre]:shadow-sm
    [&>pre>code]:text-xs sm:[&>pre>code]:text-sm [&>pre>code]:font-mono [&>pre>code]:leading-relaxed
    [&>:not(pre)>code]:bg-m3-surface-container-highest [&>:not(pre)>code]:px-1.5 [&>:not(pre)>code]:py-0.5 [&>:not(pre)>code]:rounded-md [&>:not(pre)>code]:text-xs [&>:not(pre)>code]:font-mono [&>:not(pre)>code]:break-all`;

  return (
    <div className="w-full">
      {/* 1. If Dashboard Type, render the interactive Hero Canvas */}
      {isDashboard && (
        <ProjectDashboard data={project.dashboardData} />
      )}

      {/* 2. If Notebook Type WITHOUT an embedded tag, fallback to rendering at top */}
      {isNotebook && project.notebookData && !hasNotebookTag && (
        <ProjectNotebook
          title={project.title}
          notebookData={project.notebookData}
        />
      )}

      {/* 3. Full Executive Case Study Article */}
      <article className="w-full max-w-full bg-m3-surface-container-low border border-m3-outline-variant/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-m3-1 overflow-hidden break-words">
        {/* Category & Date Metadata Badges */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-m3-on-surface-variant mb-4">
          {project.category && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-m3-secondary-container text-m3-on-secondary-container font-semibold">
              <Tag className="w-3 h-3" />
              {project.category}
            </span>
          )}
          {project.date && (
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {project.date}
            </span>
          )}
        </div>

        {/* Project Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-m3-on-surface mb-6 break-words">
          {project.title}
        </h1>

        {/* Full Rich Markdown Content (with optional embedded notebook) */}
        {hasNotebookTag ? (
          <>
            <div
              className={proseClasses}
              dangerouslySetInnerHTML={{ __html: beforeNotebookHtml }}
            />

            <div className="my-8 -mx-1 sm:-mx-3">
              <ProjectNotebook
                title={project.title}
                notebookData={project.notebookData}
              />
            </div>

            <div
              className={proseClasses}
              dangerouslySetInnerHTML={{ __html: afterNotebookHtml }}
            />
          </>
        ) : (
          <div
            className={proseClasses}
            dangerouslySetInnerHTML={{ __html: project.contentHtml || "" }}
          />
        )}
      </article>
    </div>
  );
}

export default function ProjectPostPage({ params }: ProjectPostProps) {
  return (
    <main className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-medium text-m3-primary hover:underline mb-6 sm:mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to all projects
      </Link>

      <Suspense fallback={<ProjectPostSkeleton />}>
        <ProjectPostContent params={params} />
      </Suspense>
    </main>
  );
}
