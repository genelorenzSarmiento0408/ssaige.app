"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileText,
  Link as LinkIcon,
  Loader2,
  Sparkles,
  File,
} from "lucide-react";
import Link from "next/link";
import Toast from "@/components/toast";

export default function UploadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [savedMaterialId, setSavedMaterialId] = useState<string | null>(null);
  const [sourceType, setSourceType] = useState<"text" | "url" | "file">("text");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    // Allow PPTX files and auto-parse them
    const pptxMime =
      "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      pptxMime,
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please upload a PDF, DOCX, PPTX, or TXT file");
      return;
    }

    setFile(selectedFile);
    if (!title) {
      setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
    }
    setError("");

    // If the file is PPTX, call the server-side parser to extract text
    if (selectedFile.type === pptxMime) {
      (async () => {
        setLoading(true);
        try {
          const form = new FormData();
          form.append("file", selectedFile);

          const res = await fetch("/api/import/pptx", {
            method: "POST",
            body: form,
          });

          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err?.error || "Failed to parse PPTX");
          }

          const json = await res.json();
          if (json?.content) {
            const parsedContent = json.content;
            const parsedTitle =
              json.title || selectedFile.name.replace(/\.[^/.]+$/, "");

            setSourceType("text");
            setContent(parsedContent);
            if (!title) setTitle(parsedTitle);

            // Auto-save and generate after successful parse
            setToast("Parsing complete — saving…");
            await autoSaveAndGenerate(parsedTitle, parsedContent);
          } else {
            setError("Could not extract content from PPTX");
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "PPTX parsing failed");
        } finally {
          setLoading(false);
        }
      })();
    } else {
      // For PDF, DOCX, TXT - use generic file import endpoint
      (async () => {
        setLoading(true);
        try {
          const form = new FormData();
          form.append("file", selectedFile);

          const res = await fetch("/api/import/file", {
            method: "POST",
            body: form,
          });

          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err?.error || "Failed to parse file");
          }

          const json = await res.json();
          if (json?.content) {
            const parsedContent = json.content;
            const parsedTitle =
              json.title || selectedFile.name.replace(/\.[^/.]+$/, "");

            setSourceType("text");
            setContent(parsedContent);
            if (!title) setTitle(parsedTitle);

            // Auto-save and generate after successful parse
            setToast("Parsing complete — saving…");
            await autoSaveAndGenerate(parsedTitle, parsedContent);
          } else {
            setError("Could not extract content from file");
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "File parsing failed");
        } finally {
          setLoading(false);
        }
      })();
    }
  };

  const autoSaveAndGenerate = async (
    titleParam: string,
    contentParam: string
  ) => {
    // If we've already saved this material, don't save again
    if (savedMaterialId) return;

    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", titleParam);
      formData.append("sourceType", "text");
      formData.append("content", contentParam);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) throw new Error("Failed to upload material");

      const { material } = await uploadResponse.json();
      setSavedMaterialId(material?.id ?? null);

      // Trigger generation
      setToast("Generation started…");
      const genRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ materialId: material.id }),
      });

      if (!genRes.ok) throw new Error("Failed to generate AI materials");

      // Redirect to dashboard when done
      router.push(`/dashboard`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Auto-save failed");
    } finally {
      setLoading(false);
      // Clear toast after a short while
      setTimeout(() => setToast(null), 3500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("sourceType", sourceType);

      if (sourceType === "file" && file) {
        formData.append("file", file);
      } else if (sourceType === "url" && url) {
        formData.append("url", url);
      } else if (sourceType === "text" && content) {
        formData.append("content", content);
      } else {
        throw new Error("Please provide content");
      }

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) throw new Error("Failed to upload material");

      const { material } = await uploadResponse.json();

      // Generate AI content
      await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ materialId: material.id }),
      });

      router.push(`/dashboard`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-teal-50 to-lime-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-linear-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                SSAIGE
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-emerald-600 via-teal-600 to-lime-500 bg-clip-text text-transparent">
            Upload Study Material
          </h1>
          <p className="text-gray-600 text-lg">
            Add your content and let AI generate notes, flashcards, and quizzes
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Source Type Selection */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setSourceType("text")}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                sourceType === "text"
                  ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FileText className="w-5 h-5 inline mr-2" />
              Paste Text
            </button>
            <button
              onClick={() => setSourceType("file")}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                sourceType === "file"
                  ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <File className="w-5 h-5 inline mr-2" />
              Upload File
            </button>
            <button
              onClick={() => setSourceType("url")}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                sourceType === "url"
                  ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <LinkIcon className="w-5 h-5 inline mr-2" />
              From URL
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Biology Chapter 5: Cell Structure"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            {/* Content Input */}
            {sourceType === "text" ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your study material here..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none min-h-[300px]"
                  required
                />
              </div>
            ) : sourceType === "file" ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  File Upload
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    dragActive
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {file ? (
                    <div className="space-y-4">
                      <File className="w-16 h-16 mx-auto text-emerald-600" />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {file.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="text-sm text-red-600 hover:text-red-700 font-semibold"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-16 h-16 mx-auto text-gray-400" />
                      <div>
                        <p className="text-gray-700 font-semibold">
                          Drag and drop your file here
                        </p>
                        <p className="text-sm text-gray-500 mt-1">or</p>
                      </div>
                      <label className="inline-block px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-700 cursor-pointer transition-colors">
                        Choose File
                        <input
                          type="file"
                          accept=".pdf,.docx,.txt,.pptx"
                          onChange={(e) =>
                            e.target.files &&
                            handleFileSelect(e.target.files[0])
                          }
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500">
                        Supports PDF, DOCX, PPTX, and TXT files
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/article"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing... This may take a moment
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload & Generate Study Materials
                </>
              )}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4">
            <p className="text-sm text-emerald-900">
              <strong>📚 What happens next:</strong> Our AI will analyze your
              content and automatically generate:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-emerald-800 ml-4">
              <li>• Comprehensive study notes with key points</li>
              <li>• 15 flashcards for memorization</li>
              <li>• 10 quiz questions to test your knowledge</li>
            </ul>
            {sourceType === "file" && (
              <p className="text-xs text-emerald-700 mt-3">
                ✨ Supported formats: PDF, DOCX, PPTX, TXT
              </p>
            )}
          </div>
        </div>
      </div>
      <Toast message={toast} onClose={() => setToast(null)} duration={3500} />
    </div>
  );
}
