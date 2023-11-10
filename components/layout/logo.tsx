import { SxProps, Theme } from "@mui/material/styles";
import ExploreIcon from "@mui/icons-material/ExploreOutlined";
import { Box, Typography } from "@mui/material";

interface Props {
  sx?: SxProps<Theme>;
}

export default function Logo({ sx }: Props) {
  return (
    <Box sx={sx}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <ExploreIcon sx={{ color: "text.primary", height: 32, width: 32 }} />
        <Typography
          variant="h5"
          sx={{
            color: "text.primary",
            display: {
              sm: "inline",
              xs: "none",
            },
          }}
        >
          Wanderlust
        </Typography>
      </Box>
    </Box>
  );
}
