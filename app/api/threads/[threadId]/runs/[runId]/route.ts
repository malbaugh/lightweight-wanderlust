import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const GET = async function handler(
  req: NextRequest,
  { params }: { params: { threadId: string; runId: string } | undefined }
) {
  try {
    if (params) {
      const run = await openai.beta.threads.runs.retrieve(
        params.threadId,
        params.runId
      );
      return NextResponse.json({ run: run });
    } else {
      return NextResponse.json(
        { error: "No thread found for this user" },
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

export const POST = async function handler(
  req: NextRequest,
  { params }: { params: { threadId: string; runId: string } | undefined }
) {
  try {
    if (params) {
      const { toolOutputs } = await req.json();
      const run = await openai.beta.threads.runs.submitToolOutputs(
        params.threadId,
        params.runId,
        { tool_outputs: toolOutputs }
      );
      return NextResponse.json({ run: run });
    } else {
      return NextResponse.json(
        { error: "No thread found for this user" },
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
