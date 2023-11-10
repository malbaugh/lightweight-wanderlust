import { Box, Typography } from "@mui/material";
import { Logo } from "..";

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "calc(100vh - 88px - 96px)",
      }}
    >
      <Logo />
    </Box>
  );
}

export default Loading;
