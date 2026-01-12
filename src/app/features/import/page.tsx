"use client";

import Link from "next/link";
import {
  Upload,
  FileText,
  Link as LinkIcon,
  FileSpreadsheet,
  ArrowLeft,
  Check,
} from "lucide-react";

export default function ImportLearnMore() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
            <Upload className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Multi-Source Import
          </h1>
          <p className="text-xl text-gray-600">
            Upload any content and let AI transform it into study tools
          </p>
        </div>

        {/* Supported Formats */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Supported Formats
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
              <FileText className="w-6 h-6 text-indigo-600" />
              <div>
                <h4 className="font-semibold text-gray-900">PDF Documents</h4>
                <p className="text-sm text-gray-600">
                  Textbooks, papers, notes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="font-semibold text-gray-900">Word Documents</h4>
                <p className="text-sm text-gray-600">.docx files</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
              <div>
                <h4 className="font-semibold text-gray-900">PowerPoint</h4>
                <p className="text-sm text-gray-600">.pptx presentations</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <LinkIcon className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="font-semibold text-gray-900">Web URLs</h4>
                <p className="text-sm text-gray-600">
                  Articles, Wikipedia, blogs
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
              <FileSpreadsheet className="w-6 h-6 text-yellow-600" />
              <div>
                <h4 className="font-semibold text-gray-900">
                  Flashcard Import
                </h4>
                <p className="text-sm text-gray-600">Anki, Quizlet, Excel</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-lg">
              <FileText className="w-6 h-6 text-pink-600" />
              <div>
                <h4 className="font-semibold text-gray-900">Plain Text</h4>
                <p className="text-sm text-gray-600">Copy & paste anything</p>
              </div>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Upload or Paste
                </h3>
                <p className="text-gray-600">
                  Drag and drop files, paste URLs, or copy text directly. We
                  support multiple file types and formats.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Automatic Processing
                </h3>
                <p className="text-gray-600">
                  Our AI extracts text, cleans formatting, and prepares content
                  for intelligent analysis and study tool generation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Generate Study Materials
                </h3>
                <p className="text-gray-600">
                  Create notes, flashcards, quizzes, or chat with the AI tutor -
                  all from your uploaded content.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <Check className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Smart Extraction</h3>
            <p className="text-gray-600 text-sm">
              AI identifies and extracts relevant content, ignoring headers,
              footers, and irrelevant elements
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <Check className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Format Agnostic</h3>
            <p className="text-gray-600 text-sm">
              Works with any format - from academic papers to web articles to
              presentation slides
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <Check className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Bulk Upload</h3>
            <p className="text-gray-600 text-sm">
              Upload multiple files at once to create a comprehensive study
              library
            </p>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-gray-900 mb-4">Pro Tips:</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">•</span>
              Use clear, descriptive titles for better organization
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">•</span>
              PDFs with clear text work best (not scanned images)
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">•</span>
              Combine multiple sources for comprehensive study materials
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">•</span>
              Web articles are automatically cleaned and formatted
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/upload"
            className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors font-semibold"
          >
            <Upload className="w-5 h-5 mr-2" />
            Start Uploading Content
          </Link>
        </div>
      </div>
    </div>
  );
}
