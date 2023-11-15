import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const POST = async function handler(
  req: NextRequest,
  { params }: { params: { threadId: string } | undefined }
) {
  try {
    const assistantId = process.env.OPENAI_ASSISTANT_ID;

    if (params && assistantId) {
      const data = await req.formData();
      const rawFile: File | null = data.get("file") as unknown as File;

      if (!rawFile) {
        return NextResponse.json(
          { error: "No file found in request" },
          { status: 400 }
        );
      }

      const file = await openai.files.create({
        file: rawFile,
        purpose: "assistants",
      });

      const openAiMessage = await openai.beta.threads.messages.create(
        params.threadId,
        {
          content:
            "Briefly summarize the contents of this file. If the file has information on flights, consider using the updateFlightInfo function to populate the flight information to the user.",
          role: "user",
          file_ids: [file.id],
        }
      );

      const run = await openai.beta.threads.runs.create(params.threadId, {
        assistant_id: assistantId,
      });
      return NextResponse.json({ run: run });
    } else {
      return NextResponse.json(
        { error: "No thread or assistant found for this user" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
};
