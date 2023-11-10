import React from "react";
import { Container, Box } from "@mui/material";
import Head from "next/head";
import { NavBar, Footer } from "@components";

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => (
  <>
    <Head>
      <title>Wanderlust</title>
    </Head>
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <NavBar />
      <Container component="main" sx={{ flexGrow: 1, mt: 5 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  </>
);

export default Layout;
