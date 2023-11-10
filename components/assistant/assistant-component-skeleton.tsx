import { Box, Skeleton } from "@mui/material";
import { ChatHistorySkeleton } from "@components";

function AssistantComponentSkeleton() {
  return (
    <Box sx={{ mx: 4, display: "flex", gap: 4, height: "calc(100vh - 96px - 88px)" }}>
      <Box sx={{ width: "50%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{ height: "calc(100vh - 96px - 88px - 68px)", overflowY: "hidden" }}
          >
            <ChatHistorySkeleton />
          </Box>

          <Skeleton sx={{ width: "75%", height: "88px" }} />
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Skeleton variant="rounded" sx={{ height: "100%" }} />
      </Box>
    </Box>
  );
}

export default AssistantComponentSkeleton;
