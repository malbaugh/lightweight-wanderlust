import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Settings } from "@objects";
import { Logger } from "@utils";

const initialSettings: Settings = {
  responsiveFontSizes: true,
  mode: "light",
  threadId: null,
};

export const restoreSettings = () => {
  let settings: Settings | null = null;

  try {
    const storedData = globalThis.localStorage.getItem("settings");

    if (storedData) {
      settings = JSON.parse(storedData);
    } else {
      settings = {
        responsiveFontSizes: true,
        mode: globalThis.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
        threadId: null,
      };
    }
  } catch (error) {
    Logger.error(error);
  }

  return settings;
};

export const storeSettings = (settings: Settings) => {
  globalThis.localStorage.setItem("settings", JSON.stringify(settings));
};

export const SettingsContext = createContext({
  settings: initialSettings,
  saveSettings: (value: Settings) => {},
});

type SettingsProviderProps = {
  children: React.ReactNode;
};
export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    const restoredSettings = restoreSettings();

    if (restoredSettings) {
      setSettings(restoredSettings);
    }
  }, []);

  const saveSettings = (updatedSettings: Settings) => {
    setSettings(updatedSettings);
    storeSettings(updatedSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        saveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const SettingsConsumer = SettingsContext.Consumer;
