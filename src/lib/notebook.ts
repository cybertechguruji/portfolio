import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

export interface NotebookOutput {
  type: "text" | "image" | "html" | "error";
  content: string;
}

export interface NotebookCell {
  id?: string;
  type: "markdown" | "code";
  executionCount?: number | null;
  code?: string;
  htmlContent?: string;
  outputs?: NotebookOutput[];
}

export interface ParsedNotebook {
  cells: NotebookCell[];
  tableOfContents: { id: string; title: string }[];
}

function normalizeSource(source: string | string[] | undefined): string {
  if (!source) return "";
  if (Array.isArray(source)) {
    return source.join("");
  }
  return source;
}

export async function parseJupyterNotebook(
  rawJson: string
): Promise<ParsedNotebook> {
  const notebook = JSON.parse(rawJson);
  const rawCells = notebook.cells || [];
  const cells: NotebookCell[] = [];
  const tableOfContents: { id: string; title: string }[] = [];

  for (let i = 0; i < rawCells.length; i++) {
    const rawCell = rawCells[i];
    const sourceText = normalizeSource(rawCell.source);

    if (rawCell.cell_type === "markdown") {
      // Extract h1/h2 headings for Table of Contents
      const headingMatches = sourceText.match(/^(?:##?)\s+(.+)$/gm);
      if (headingMatches) {
        for (const heading of headingMatches) {
          const title = heading.replace(/^#+\s+/, "").trim();
          const id = title
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
          tableOfContents.push({ id, title });
        }
      }

      const processed = await remark()
        .use(remarkGfm)
        .use(html)
        .process(sourceText);

      cells.push({
        id: `cell-${i}`,
        type: "markdown",
        htmlContent: processed.toString(),
      });
    } else if (rawCell.cell_type === "code") {
      const outputs: NotebookOutput[] = [];
      const rawOutputs = rawCell.outputs || [];

      for (const out of rawOutputs) {
        if (out.output_type === "stream" && out.text) {
          outputs.push({
            type: "text",
            content: normalizeSource(out.text),
          });
        } else if (out.output_type === "error" && out.traceback) {
          const cleanTraceback = Array.isArray(out.traceback)
            ? out.traceback.join("\n").replace(/\u001b\[.*?m/g, "")
            : String(out.traceback);
          outputs.push({
            type: "error",
            content: cleanTraceback,
          });
        } else if (out.data) {
          if (out.data["image/png"]) {
            outputs.push({
              type: "image",
              content: `data:image/png;base64,${out.data["image/png"].trim()}`,
            });
          }
          if (out.data["text/html"]) {
            outputs.push({
              type: "html",
              content: normalizeSource(out.data["text/html"]),
            });
          } else if (out.data["text/plain"] && !out.data["image/png"]) {
            outputs.push({
              type: "text",
              content: normalizeSource(out.data["text/plain"]),
            });
          }
        }
      }

      cells.push({
        id: `cell-${i}`,
        type: "code",
        executionCount: rawCell.execution_count || null,
        code: sourceText,
        outputs,
      });
    }
  }

  return { cells, tableOfContents };
}
