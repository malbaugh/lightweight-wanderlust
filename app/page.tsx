"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AssistantComponent } from "@components";
import { Container, Box } from "@mui/material";
import Head from "next/head";
import Cookie from "js-cookie";
import axios from "axios";
import { Logger } from "@utils";

export default function Index() {
  const [threadId, setThreadId] = useState<string | null>(null);

  function handleThreadIdChange(threadId: string | null) {
    if (threadId === null) {
      Logger.debug("Removing threadId from cookie");
      Cookie.remove("threadId");
    } else {
      Logger.debug("Setting threadId in cookie");
      Cookie.set("threadId", threadId);
    }
    setThreadId(threadId);
  }

  useEffect(() => {
    if (!threadId) {
      const cachedThreadId = Cookie.get("threadId");
      if (cachedThreadId) {
        setThreadId(cachedThreadId);
      } else {
        createThread();
      }
    }
  }, []);

  const createThread = useCallback(async () => {
    Logger.debug("Creating a new thread");
    return axios
      .post(`/api/threads`)
      .then((response) => {
        const { threadId }: { threadId: string } = response.data;
        handleThreadIdChange(threadId);
      })
      .catch((error) => {
        Logger.error(error);
      });
  }, []);

  if (!threadId) return null;

  return (
    <>
      <Head>
        <title>Wanderlust</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <AssistantComponent threadId={threadId} />
        </Container>
      </Box>
    </>
  );
}
