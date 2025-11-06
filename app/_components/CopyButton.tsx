"use client";

import { useState } from "react";

type CopyButtonProps = {
  content: string;
  label?: string;
  testId?: string;
};

export function CopyButton({ content, label = "복사", testId }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("클립보드 복사 실패", error); 
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      aria-label={`${label} 버튼`}
      onClick={handleCopy}
      data-testid={testId}
      className="rounded-lg border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-800"
    >
      {copied ? "복사됨" : label}
    </button>
  );
}