import { DEFAULTS } from "../core/constants.js";
import { Store } from "../core/store.js";
import { loadSettings, saveSettings } from "../core/storage.js";
import { updatePreview } from "./preview.js";

const form = document.getElementById("styler-form");
const previewEl = document.getElementById("preview-caption");
const store = new Store(DEFAULTS);

function getFormValues() {
  return {
    fontSize: document.getElementById("fontSize").value,
    fontColor: document.getElementById("fontColor").value,
    bgColor: document.getElementById("bgColor").value,
    bgOpacity: document.getElementById("bgOpacity").value,
    textStroke: document.getElementById("textStroke").value,
    textShadow: document.getElementById("textShadow").value
  };
}

function setFormValues(settings) {
  document.getElementById("fontSize").value = settings.fontSize || DEFAULTS.fontSize;
  document.getElementById("fontColor").value = settings.fontColor || DEFAULTS.fontColor;
  document.getElementById("bgColor").value = settings.bgColor || DEFAULTS.bgColor;
  document.getElementById("bgOpacity").value = settings.bgOpacity || DEFAULTS.bgOpacity;
  document.getElementById("textStroke").value = settings.textStroke || DEFAULTS.textStroke;
  document.getElementById("textShadow").value = settings.textShadow || DEFAULTS.textShadow;
}

store.subscribe((state) => {
  updatePreview(previewEl, state);
  saveSettings(state);
});

loadSettings().then((settings) => {
  setFormValues(settings);
  store.setState(settings);
});

form.addEventListener("input", () => {
  store.setState(getFormValues());
});

form.addEventListener("change", () => {
  store.setState(getFormValues());
});

document.getElementById("resetBtn").addEventListener("click", () => {
  setFormValues(DEFAULTS);
  store.setState(DEFAULTS);
});
