import {
  createTheme as createMuiTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { baseThemeOptions } from "./base-theme-options";
import { darkThemeOptions } from "./dark-theme-options";
import { lightThemeOptions } from "./light-theme-options";
import { Settings } from "@objects";

export const createTheme = (config: Settings) => {
  let theme = createMuiTheme(
    baseThemeOptions,
    config.mode === "dark" ? darkThemeOptions : lightThemeOptions
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
