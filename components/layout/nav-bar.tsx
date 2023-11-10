"use client";

import {
  AppBar,
  Box,
  Container,
  Toolbar,
  alpha,
  useTheme,
} from "@mui/material";
import { Logo, AnimatedIcon } from "@components";
import { Moon as MoonIcon, Sun as SunIcon } from "@icons";
import { useSettings } from "@hooks";

const NavBar = () => {
  const theme = useTheme();
  const { settings, saveSettings } = useSettings();

  const color = theme.palette.background.paper;

  function handleThemeChange() {
    let mode: "light" | "dark";
    if (settings.mode === "dark") {
      mode = "light";
    } else {
      mode = "dark";
    }

    saveSettings({
      ...settings,
      mode: mode,
    });
  }

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: alpha(color, 0.1),
        backdropFilter: "blur(15px)",
        p: 2,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Logo />

          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              gap: 2,
            }}
          >
            <AnimatedIcon
              sx={{
                display: {
                  sm: "flex",
                  xs: "none",
                },
              }}
              falseIcon={<MoonIcon fontSize="small" />}
              trueIcon={<SunIcon fontSize="small" />}
              onClick={handleThemeChange}
              state={settings.mode === "dark"}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
