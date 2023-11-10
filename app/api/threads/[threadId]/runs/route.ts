import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const GET = async function handler(
  req: NextRequest,
  { params }: { params: { threadId: string } | undefined }
) {
  try {
    if (params) {
      const runs = await openai.beta.threads.runs.list(params.threadId, {
        limit: 1,
      });
      const latestRun = runs.data[0];
      if (
        !latestRun ||
        latestRun.status === "completed" ||
        latestRun.status === "cancelled" ||
        latestRun.status === "failed" ||
        latestRun.status === "expired"
      ) {
        return NextResponse.json({ run: null });
      }

      const run = await openai.beta.threads.runs.retrieve(
        params.threadId,
        latestRun.id
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
