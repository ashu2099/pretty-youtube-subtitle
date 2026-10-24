import { DEFAULTS } from "./constants.js";

export function loadSettings() {
  return browser.storage.local.get(DEFAULTS);
}

export function saveSettings(settings) {
  return browser.storage.local.set(settings);
}

export function onSettingsChanged(callback) {
  browser.storage.onChanged.addListener((changes, area) => {
    if (area === "local") {
      loadSettings().then(callback);
    }
  });
}
