import { ThreadMessage } from "openai/resources/beta/threads/messages/messages.mjs";
import { v4 as genUUID } from "uuid";

export type MessageType =
  | "center"
  | "zoom"
  | "mark"
  | "file"
  | "read-file"
  | "flight"
  | "dialog";
export interface Message extends ThreadMessage {
  type: MessageType;
}

export function generateAnnotation(text: string, type: MessageType): Message {
  return {
    assistant_id: "",
    content: [{ type: "text", text: { value: text, annotations: [] } }],
    created_at: Date.now() / 1000,
    file_ids: [],
    id: genUUID(),
    metadata: {},
    object: "thread.message",
    role: "assistant",
    run_id: "",
    thread_id: "",
    type,
  };
}

export function generateMessage(message: ThreadMessage): Message {
  return {
    ...message,
    type: "dialog",
  };
}
