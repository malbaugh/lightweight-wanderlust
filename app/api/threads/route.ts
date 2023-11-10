import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const POST = async function handler(req: NextRequest) {
  try {
    const thread = await openai.beta.threads.create({});
    return NextResponse.json({ threadId: thread.id });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
};
