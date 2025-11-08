"use client";

import { useState } from "react";

type DownloadButtonProps = {
  content: string;
  filename: string;
  format?: "txt" | "json" | "md";
  label?: string;
  testId?: string;
};

export function DownloadButton({ 
  content, 
  filename, 
  format = "txt",
  label = "다운로드",
  testId 
}: DownloadButtonProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    try {
      setDownloading(true);
      
      let blob: Blob;
      let mimeType: string;
      let fileExtension: string;
      let finalContent: string;

      switch (format) {
        case "json":
          mimeType = "application/json";
          fileExtension = "json";
          finalContent = typeof content === "string" ? content : JSON.stringify(content, null, 2);
          break;
        case "md":
          mimeType = "text/markdown";
          fileExtension = "md";
          finalContent = content;
          break;
        default: // txt
          mimeType = "text/plain";
          fileExtension = "txt";
          finalContent = content;
          break;
      }

      blob = new Blob([finalContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setTimeout(() => setDownloading(false), 500);
    } catch (error) {
      console.error("다운로드 실패", error);
      setDownloading(false);
    }
  };

  return (
    <button
      type="button"
      aria-label={`${label} 버튼`}
      onClick={handleDownload}
      disabled={downloading}
      data-testid={testId}
      className="rounded-lg border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {downloading ? "다운로드 중..." : label}
    </button>
  );
}

