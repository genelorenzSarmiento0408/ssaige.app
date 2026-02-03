import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cleanText } from "@/lib/ai/text-processing";
import { chunkText } from "@/lib/ai/text-processing";
import { embedTexts } from "@/lib/ai/embeddings";
import type { Database } from "@/types/database";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Get authenticated user (secure method)
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const url = formData.get("url") as string;
    const sourceType = formData.get("sourceType") as string;

    if (!title || !sourceType) {
      return NextResponse.json(
        { error: "Title and source type required" },
        { status: 400 }
      );
    }

    let finalContent = content;

    // If URL is provided, fetch the content
    if (sourceType === "url" && url) {
      try {
        const axios = (await import("axios")).default;
        const cheerio = await import("cheerio");

        const response = await axios.get(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
          timeout: 10000,
        });

        const $ = cheerio.load(response.data);

        // Remove unwanted elements
        $("script, style, nav, header, footer, iframe, noscript").remove();

        // Extract text from main content areas
        const mainContent = $(
          "main, article, .content, #content, .post, .entry-content"
        ).text();
        finalContent = mainContent || $("body").text();

        if (!finalContent || finalContent.trim().length < 50) {
          return NextResponse.json(
            { error: "Could not extract meaningful content from URL" },
            { status: 400 }
          );
        }
      } catch (err) {
        console.error("URL fetch error:", err);
        return NextResponse.json(
          { error: "Failed to fetch content from URL" },
          { status: 400 }
        );
      }
    } else if (!finalContent) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // Ensure the user has a profile entry (auto-create on authentication)
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .single();

    if (!existingProfile) {
      // Create profile if it doesn't exist
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        email: user.email!,
        name:
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email?.split("@")[0] ||
          null,
      });

      if (profileError) {
        console.error("Profile creation error:", profileError);
        return NextResponse.json(
          { error: "Failed to create user profile. Please contact support." },
          { status: 500 }
        );
      }
    }

    // Clean and store the content
    const cleanedContent = cleanText(finalContent);

    const { data: material, error } = await supabase
      .from("study_materials")
      .insert({
        user_id: userId,
        title,
        content: cleanedContent,
        source_type: sourceType,
      })
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json(
        { error: "Failed to save material" },
        { status: 500 }
      );
    }

    // --- US3: chunk and embed content, store material_chunks ---
    // Optimize: Process in background for instant response
    // This doesn't block the API response
    (async () => {
      try {
        const chunks = chunkText(cleanedContent, 1000);
        if (chunks.length > 0) {
          // Limit chunks to avoid excessive processing time
          const maxChunks = 50; // Limit for faster processing
          const limitedChunks = chunks.slice(0, maxChunks);

          // Batch embed in smaller groups for better performance
          const batchSize = 20;
          const chunkRows: Database["public"]["Tables"]["material_chunks"]["Insert"][] =
            [];

          for (let i = 0; i < limitedChunks.length; i += batchSize) {
            const batch = limitedChunks.slice(i, i + batchSize);
            const embeddings = await embedTexts(batch);

            batch.forEach((chunk, idx) => {
              chunkRows.push({
                material_id: material.id,
                chunk_text: chunk,
                embedding: embeddings[
                  idx
                ] as unknown as Database["public"]["Tables"]["material_chunks"]["Insert"]["embedding"],
              });
            });
          }

          // Insert all chunks in one batch
          if (chunkRows.length > 0) {
            await supabase.from("material_chunks").insert(chunkRows);
          }
        }
      } catch (err) {
        console.error("Background chunking/embedding error:", err);
      }
    })().catch(console.error); // Fire and forget

    return NextResponse.json({ success: true, material });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload material" },
      { status: 500 }
    );
  }
}

