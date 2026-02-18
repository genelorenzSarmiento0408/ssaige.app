"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Send, Loader2, Brain } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

interface Message {
  role: "user" | "assistant";
  content: string;
  created_at?: string;
}

export default function TutorPage() {
  const { colors } = useTheme();
  const params = useParams();
  const materialId = params.id as string;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [materialTitle, setMaterialTitle] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient();

      // Load material info
      const { data: material } = await supabase
        .from("study_materials")
        .select("title")
        .eq("id", materialId)
        .single();

      if (material) {
        setMaterialTitle(material.title);
      }

      // Load chat history
      const { data: history } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("material_id", materialId)
        .order("created_at", { ascending: true });

      if (history) {
        setMessages(
          history.map((msg) => ({
            role: msg.role as "user" | "assistant",
            content: msg.content,
          }))
        );
      }
    };

    loadData();
  }, [materialId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || loading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setLoading(true);

    // Add user message immediately
    const newUserMessage: Message = {
      role: "user",
      content: userMessage,
    };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          materialId,
        }),
      });

      const data = await response.json();

      if (data.response) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.response,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 to-pink-50 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900">AI Tutor</h1>
                <p className="text-sm text-gray-600">{materialTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {messages.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ask your AI tutor anything!
              </h3>
              <p className="text-gray-600 mb-4">
                I have access to your study material and can help explain
                concepts, answer questions, and more.
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
                <button
                  onClick={() =>
                    setInputMessage("Can you summarize the main concepts?")
                  }
                  className="px-4 py-2 bg-white border-2 border-purple-200 rounded-xl text-purple-700 hover:border-purple-400 transition-colors"
                >
                  Summarize main concepts
                </button>
                <button
                  onClick={() => setInputMessage("What are the key takeaways?")}
                  className="px-4 py-2 bg-white border-2 border-purple-200 rounded-xl text-purple-700 hover:border-purple-400 transition-colors"
                >
                  Key takeaways
                </button>
                <button
                  onClick={() =>
                    setInputMessage("Give me some practice questions")
                  }
                  className="px-4 py-2 bg-white border-2 border-purple-200 rounded-xl text-purple-700 hover:border-purple-400 transition-colors"
                >
                  Practice questions
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                      message.role === "user"
                        ? "bg-linear-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-white shadow-md text-gray-900"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2 text-purple-600">
                        <Brain className="w-4 h-4" />
                        <span className="text-sm font-semibold">AI Tutor</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t bg-white">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex gap-4">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question about your study material..."
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none resize-none"
              rows={1}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || loading}
              className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
