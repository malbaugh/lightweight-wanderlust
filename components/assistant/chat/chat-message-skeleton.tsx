import { Box, Skeleton } from "@mui/material";

function ChatMessageSkeleton({ lines }: { lines?: number }) {
  const finalLineCount = lines || 2;
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", ml: "32px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {Array.from({ length: finalLineCount }, (_, i) => i).map((i) => (
          <Skeleton
            key={i}
            variant="text"
            sx={{
              fontSize: "1.4rem",
              fontWeight: 600,
              ml: "12px",
              lineHeight: "1.8rem",
              pt: "2px",
              width: "100%",
            }}
          />
        ))}
        <Skeleton
          variant="text"
          sx={{
            fontSize: "1.4rem",
            fontWeight: 600,
            ml: "12px",
            lineHeight: "1.8rem",
            pt: "2px",
            width: "75%",
          }}
        />
      </Box>
    </Box>
  );
}

export default ChatMessageSkeleton;
