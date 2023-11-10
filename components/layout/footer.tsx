import React from "react";
import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TwitterIcon from "@mui/icons-material/Twitter";
import GithubIcon from "@mui/icons-material/GitHub";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 3,
    }}
  >
    <Container
      maxWidth="sm"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        sx={{ mr: 1 }}
      >
        Follow me at
      </Typography>
      <IconButton
        href="https://twitter.com/dane_albaugh"
        target="_blank"
        sx={{ color: "text.secondary" }}
      >
        <TwitterIcon />
      </IconButton>
      <IconButton
        href="https://github.com/malbaugh"
        target="_blank"
        sx={{ color: "text.secondary" }}
      >
        <GithubIcon />
      </IconButton>
    </Container>
  </Box>
);

export default Footer;
