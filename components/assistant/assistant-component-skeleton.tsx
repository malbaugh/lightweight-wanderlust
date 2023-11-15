import { Box, Skeleton } from "@mui/material";
import { ChatHistorySkeleton } from "@components";

function AssistantComponentSkeleton() {
  return (
    <Box
      sx={{
        mx: { xs: 1, md: 4 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 1, md: 4 },
        height: { xs: "auto", md: "calc(100vh - 96px - 88px)" },
      }}
    >
      <Box sx={{ width: { xs: "100%", md: "50%" } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              height: "calc(100vh - 96px - 88px - 68px)",
              overflowY: "hidden",
            }}
          >
            <ChatHistorySkeleton />
          </Box>

          <Skeleton sx={{ width: "75%", height: "88px" }} />
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
        }}
      >
        <Skeleton variant="rounded" sx={{ height: "100%" }} />
      </Box>
    </Box>
  );
}

export default AssistantComponentSkeleton;
