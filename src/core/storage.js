import { DEFAULTS } from "./constants.js";

export const loadSettings = async () => browser.storage.local.get(DEFAULTS);

export const saveSettings = async (settings) => browser.storage.local.set(settings);

export const onSettingsChanged = (callback) => {
  browser.storage.onChanged.addListener(async (changes, area) => {
    if (area === "local") {
      const settings = await loadSettings();
      callback(settings);
    }
  });
};
