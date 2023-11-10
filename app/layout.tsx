"use client";

import { Footer, NavBar } from "@components";
import React from "react";
import { Box } from "@mui/material";
import Head from "next/head";
import ThemeRegistry from "./theme-registry";

type Props = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <Head>
        <title>Wanderlust</title>
      </Head>
      <body style={{ margin: 0, padding: 0 }}>
        <ThemeRegistry options={{ key: "mui" }}>
          <NavBar />
          <Box
            id="app"
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              width: "100vw",
              pt: "96px",
              justifyContent: "space-between",
              backgroundColor: "background.paper",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>{children}</Box>
            <Footer />
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
