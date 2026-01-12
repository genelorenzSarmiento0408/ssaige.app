import { NextRequest, NextResponse } from "next/server";
import { cleanText } from "@/lib/ai/text-processing";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File required" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filename = file.name || "upload";
    const lower = filename.toLowerCase();

    let content = "";

    if (lower.endsWith(".pdf") || file.type === "application/pdf") {
      // PDF parsing - using old version that works in Node.js
      const pdfParse = eval("require")("pdf-parse");
      const data = await pdfParse(buffer);
      content = data.text || "";
    } else if (
      lower.endsWith(".docx") ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // DOCX parsing using mammoth
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({ buffer });
      content = result?.value || "";
    } else if (file.type === "text/plain" || lower.endsWith(".txt")) {
      content = buffer.toString("utf-8");
    } else {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    const cleaned = cleanText(content || "");

    return NextResponse.json({
      success: true,
      content: cleaned,
      title: filename.replace(/\.[^/.]+$/, ""),
    });
  } catch (err) {
    console.error("File import error:", err);
    return NextResponse.json(
      { error: "Failed to parse file" },
      { status: 500 }
    );
  }
}
