import { Box } from "@mui/material";
import { AssistantWritingSkeleton, ChatMessageSkeleton } from "@components";

function ChatHistorySkeleton() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 3,
        my: 8,
        width: "calc(100% - 44px)",
      }}
    >
      <ChatMessageSkeleton lines={1} />
      <AssistantWritingSkeleton lines={4} />
      <ChatMessageSkeleton lines={3} />
      <AssistantWritingSkeleton lines={2} />
      <ChatMessageSkeleton lines={2} />
      <AssistantWritingSkeleton lines={5} />
    </Box>
  );
}

export default ChatHistorySkeleton;
