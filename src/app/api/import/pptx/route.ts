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

    // Dynamic import to avoid forcing this dependency for users who don't need PPTX
    const JSZipModule = await import("jszip");
    const JSZip = JSZipModule.default || JSZipModule;

    const zip = await JSZip.loadAsync(buffer);

    // Collect slide XML files under ppt/slides/slideN.xml
    const slideFiles = Object.keys(zip.files).filter((p) =>
      p.match(/^ppt\/slides\/slide[0-9]+\.xml$/)
    );

    const slidesText: string[] = [];

    for (const path of slideFiles.sort((a, b) => a.localeCompare(b))) {
      const entry = zip.files[path];
      const xml = await entry.async("string");

      // Extract text nodes (<a:t>...</a:t>) which contain slide text
      const matches = Array.from(xml.matchAll(/<a:t[^>]*>([\s\S]*?)<\/a:t>/g));
      const texts = matches.map((m) => m[1].replace(/<[^>]+>/g, "").trim());
      const slideText = texts.filter(Boolean).join(" ");
      if (slideText) slidesText.push(slideText);
    }

    const content = cleanText(slidesText.join("\n\n"));

    return NextResponse.json({
      success: true,
      content,
      title: file.name.replace(/\.[^/.]+$/, ""),
    });
  } catch (err) {
    console.error("PPTX import error:", err);
    return NextResponse.json(
      { error: "Failed to parse PPTX" },
      { status: 500 }
    );
  }
}

