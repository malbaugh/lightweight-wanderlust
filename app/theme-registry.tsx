"use client";

import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { createTheme } from "../theme";
import { SettingsProvider, SettingsConsumer } from "@contexts";
import { useState } from "react";

type Props = {
  options?: any;
  children: React.ReactNode;
};
export default function ThemeRegistry({ options, children }: Props) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <SettingsProvider>
      <SettingsConsumer>
        {({ settings }) => (
          <ThemeProvider
            theme={createTheme({
              responsiveFontSizes: settings.responsiveFontSizes,
              mode: settings.mode,
              threadId: settings.threadId,
            })}
          >
            <CssBaseline />
            {children}
          </ThemeProvider>
        )}
      </SettingsConsumer>
    </SettingsProvider>
  );
}
