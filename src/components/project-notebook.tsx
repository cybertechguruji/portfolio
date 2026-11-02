"use client";

import React, { useState } from "react";
import {
  Code2,
  Copy,
  Check,
  FileCode2,
  EyeOff,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { ParsedNotebook, NotebookCell } from "@/lib/notebook";

interface ProjectNotebookProps {
  title: string;
  notebookData?: ParsedNotebook | null;
  children?: React.ReactNode;
}

export function ProjectNotebook({
  title,
  notebookData,
}: ProjectNotebookProps) {
  const [copiedCellId, setCopiedCellId] = useState<string | null>(null);
  // viewMode: "all" (code + outputs) vs "outputs-only" (executive view)
  const [showAllCode, setShowAllCode] = useState(true);
  // Track individual collapsed code cells
  const [collapsedCells, setCollapsedCells] = useState<Record<string, boolean>>({});

  const handleCopy = (cellId: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCellId(cellId);
    setTimeout(() => setCopiedCellId(null), 2000);
  };

  const toggleCellCollapse = (cellId: string) => {
    setCollapsedCells((prev) => ({
      ...prev,
      [cellId]: !prev[cellId],
    }));
  };

  const hasNotebook = Boolean(
    notebookData && notebookData.cells && notebookData.cells.length > 0
  );

  if (!hasNotebook) {
    return null;
  }

  return (
    <div className="w-full my-8 font-sans not-prose">
      {/* Main Notebook Canvas */}
      <div className="w-full rounded-3xl bg-m3-surface-container-lowest border border-m3-outline-variant/30 shadow-m3-2 overflow-hidden">
        {/* Notebook Top IDE Bar & View Mode Toggle */}
        <div className="px-4 sm:px-6 py-3.5 bg-m3-surface-container border-b border-m3-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-m3-primary/10 text-m3-primary flex items-center justify-center font-bold shrink-0">
              <FileCode2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-m3-on-surface font-mono">
                {title.toLowerCase().replace(/\s+/g, "_")}.ipynb
              </span>
              <div className="text-[11px] text-m3-on-surface-variant flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Executed • Python 3 (ipykernel)</span>
              </div>
            </div>
          </div>

          {/* Executive Mode / Developer Mode Toggle Button */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              type="button"
              onClick={() => setShowAllCode(!showAllCode)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                showAllCode
                  ? "bg-m3-surface text-m3-on-surface border-m3-outline-variant/30 hover:bg-m3-surface-container-high"
                  : "bg-m3-primary text-m3-on-primary border-m3-primary shadow-xs"
              }`}
              title={showAllCode ? "Hide all code cells to view charts and outputs only" : "Show Python code cells"}
            >
              {showAllCode ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Executive Mode (Hide Code)</span>
                </>
              ) : (
                <>
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Developer Mode (Show Code)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Notebook Cells Container */}
        <div className="p-4 sm:p-7 space-y-6">
          {notebookData!.cells.map((cell: NotebookCell, i: number) => {
            if (cell.type === "markdown") {
              return (
                <div
                  key={cell.id || i}
                  className="prose dark:prose-invert max-w-none text-sm sm:text-base px-2 py-1 text-m3-on-surface"
                  dangerouslySetInnerHTML={{ __html: cell.htmlContent || "" }}
                />
              );
            }

            // Code Cell
            const cellId = cell.id || `cell-${i}`;
            const cellCode = cell.code || "";
            const isCopied = copiedCellId === cellId;
            const isIndividualCollapsed = Boolean(collapsedCells[cellId]);
            const isCodeHidden = !showAllCode || isIndividualCollapsed;
            const hasOutputs = cell.outputs && cell.outputs.length > 0;

            return (
              <div
                key={cellId}
                className="rounded-2xl border border-m3-outline-variant/30 overflow-hidden shadow-xs bg-m3-surface-container-low transition-all"
              >
                {/* Code Header Bar */}
                <div className="px-4 py-2 bg-m3-surface-container border-b border-m3-outline-variant/20 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-m3-primary">
                      In [{cell.executionCount || i + 1}]:
                    </span>
                    {!showAllCode && (
                      <span className="text-[10px] text-m3-on-surface-variant font-sans px-2 py-0.5 rounded-md bg-m3-surface border border-m3-outline-variant/20">
                        Code Hidden (Executive View)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Individual Collapse/Expand Button */}
                    <button
                      type="button"
                      onClick={() => toggleCellCollapse(cellId)}
                      className="p-1 rounded text-m3-on-surface-variant hover:text-m3-on-surface hover:bg-m3-surface-container-high transition-colors cursor-pointer"
                      title={isCodeHidden ? "Expand Code" : "Collapse Code"}
                    >
                      {isCodeHidden ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronUp className="w-4 h-4" />
                      )}
                    </button>

                    {/* Copy Button */}
                    <button
                      type="button"
                      onClick={() => handleCopy(cellId, cellCode)}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-m3-surface hover:bg-m3-surface-container-high text-m3-on-surface-variant hover:text-m3-on-surface transition-colors cursor-pointer"
                      title="Copy code"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-[11px] font-sans text-emerald-500 font-semibold">
                            Copied
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-sans">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Code Block Content (collapsible) */}
                {!isCodeHidden && (
                  <div className="p-4 bg-zinc-950 text-zinc-100 font-mono text-xs sm:text-sm overflow-x-auto selection:bg-m3-primary/30">
                    <pre className="m-0 leading-relaxed">
                      <code>{cellCode}</code>
                    </pre>
                  </div>
                )}

                {/* Outputs Section (Always visible, even when code is hidden!) */}
                {hasOutputs && (
                  <div className="p-4 bg-m3-surface-container-lowest border-t border-m3-outline-variant/20 space-y-4">
                    {cell.outputs!.map((output, outIdx) => {
                      if (output.type === "image") {
                        return (
                          <div
                            key={outIdx}
                            className="w-full flex justify-center py-2 overflow-x-auto"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={output.content}
                              alt={`Notebook Chart Output ${i + 1}`}
                              className="max-w-full h-auto rounded-xl shadow-xs border border-m3-outline-variant/20 bg-white dark:bg-zinc-100 p-2"
                            />
                          </div>
                        );
                      }

                      if (output.type === "html") {
                        return (
                          <div
                            key={outIdx}
                            className="w-full overflow-x-auto py-2 text-xs text-m3-on-surface font-sans"
                            dangerouslySetInnerHTML={{ __html: output.content }}
                          />
                        );
                      }

                      if (output.type === "text") {
                        return (
                          <div
                            key={outIdx}
                            className="w-full font-mono text-xs text-m3-on-surface p-3 rounded-xl bg-m3-surface-container-low border border-m3-outline-variant/20 overflow-x-auto whitespace-pre-wrap leading-relaxed"
                          >
                            {output.content}
                          </div>
                        );
                      }

                      if (output.type === "error") {
                        return (
                          <div
                            key={outIdx}
                            className="w-full font-mono text-xs text-rose-600 dark:text-rose-400 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 overflow-x-auto whitespace-pre-wrap"
                          >
                            {output.content}
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
