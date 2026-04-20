"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import NdaForm from "@/components/NdaForm";
import NdaPreview from "@/components/NdaPreview";
import DownloadButton from "@/components/DownloadButton";
import { useAuth } from "@/lib/auth";
import {
  NdaFormData,
  defaultFormData,
  generateFullDocument,
} from "@/lib/nda-template";

export default function Home() {
  const router = useRouter();
  const { token, isLoading, logout } = useAuth();
  const [formData, setFormData] = useState<NdaFormData>(defaultFormData);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && !token) {
      router.push("/login");
    }
  }, [token, isLoading, router]);

  if (isLoading || !token) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-400 text-sm">Loading…</div>
      </div>
    );
  }

  const markdown = generateFullDocument(formData);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#032147" }}>
              Prelegal
            </h1>
            <p className="text-sm" style={{ color: "#888888" }}>
              Mutual NDA Creator
            </p>
          </div>
          <div className="flex items-center gap-4">
            <DownloadButton previewRef={previewRef} />
            <button
              onClick={logout}
              className="text-sm hover:underline"
              style={{ color: "#888888" }}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Panel */}
          <div className="no-print">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2
                className="text-xl font-semibold mb-6"
                style={{ color: "#032147" }}
              >
                Fill in your NDA details
              </h2>
              <NdaForm data={formData} onChange={setFormData} />
            </div>
          </div>

          {/* Preview Panel */}
          <div>
            <div className="sticky top-8">
              <div className="flex items-center justify-between mb-4 no-print">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#032147" }}
                >
                  Document Preview
                </h2>
                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">
                  Live preview
                </span>
              </div>
              <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">
                <NdaPreview ref={previewRef} markdown={markdown} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-12 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-slate-400 text-center">
            Based on Common Paper Mutual NDA (Version 1.0) &mdash; free to use
            under CC BY 4.0
          </p>
        </div>
      </footer>
    </div>
  );
}
