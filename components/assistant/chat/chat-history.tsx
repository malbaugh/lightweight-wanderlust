import { Box } from "@mui/material";
import { AssistantWritingSkeleton, ChatMessage } from "@components";
import { Message } from "@objects";

type Props = {
  messages: Message[];
  assistantWriting: boolean;
};

function ChatHistory({ messages, assistantWriting }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 3,
        my: 8,
        width: "calc(100% - 44px)",
      }}
    >
      {messages.map((message: Message, i) => (
        <ChatMessage
          key={i}
          message={message}
          lastMessage={i === messages.length - 1 && !assistantWriting}
        />
      ))}
      {assistantWriting && <AssistantWritingSkeleton />}
    </Box>
  );
}

export default ChatHistory;
