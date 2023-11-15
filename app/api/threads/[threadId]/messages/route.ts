import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { generateMessage } from "@objects";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const GET = async function handler(
  req: NextRequest,
  { params }: { params: { threadId: string } | undefined }
) {
  try {
    const assistantId = process.env.OPENAI_ASSISTANT_ID;
    if (!assistantId) {
      return NextResponse.json(
        { error: "No assistant id found" },
        { status: 404 }
      );
    }

    if (params) {
      const threadMessages = await openai.beta.threads.messages.list(
        params.threadId
      );
      return NextResponse.json({
        newMessages: threadMessages.data
          .filter((msg) => msg.file_ids.length === 0)
          .map((msg) => generateMessage(msg)),
      });
    } else {
      return NextResponse.json(
        { error: "No thread id provided" },
        { status: 400 }
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

export const POST = async function handler(
  req: NextRequest,
  { params }: { params: { threadId: string } | undefined }
) {
  try {
    const assistantId = process.env.OPENAI_ASSISTANT_ID;
    if (!assistantId) {
      return NextResponse.json(
        { error: "No assistant id found" },
        { status: 404 }
      );
    }

    if (params) {
      const { messageContent } = await req.json();

      const threadMessage = await openai.beta.threads.messages.create(
        params.threadId,
        {
          content: messageContent,
          role: "user",
        }
      );
      const run = await openai.beta.threads.runs.create(params.threadId, {
        assistant_id: assistantId,
      });
      return NextResponse.json({
        run: run,
        message: generateMessage(threadMessage),
      });
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
