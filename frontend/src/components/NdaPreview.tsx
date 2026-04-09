"use client";

import { forwardRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface NdaPreviewProps {
  markdown: string;
}

const NdaPreview = forwardRef<HTMLDivElement, NdaPreviewProps>(
  function NdaPreview({ markdown }, ref) {
    return (
      <div
        ref={ref}
        className="nda-preview bg-white p-8 rounded-lg shadow-sm border border-slate-200 max-w-none"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
    );
  }
);

export default NdaPreview;
