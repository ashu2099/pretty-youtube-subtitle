import { DEFAULTS } from "../core/constants.js";
import { Store } from "../core/store.js";
import { loadSettings, saveSettings } from "../core/storage.js";
import { updatePreview } from "./preview.js";

const form = document.getElementById("styler-form");
const previewEl = document.getElementById("preview-caption");
const store = new Store(DEFAULTS);

const getFormValues = () => ({
  fontSize: document.getElementById("fontSize").value,
  fontColor: document.getElementById("fontColor").value,
  bgColor: document.getElementById("bgColor").value,
  bgOpacity: document.getElementById("bgOpacity").value,
  textStroke: document.getElementById("textStroke").value,
  textShadow: document.getElementById("textShadow").value
});

const setFormValues = (settings) => {
  document.getElementById("fontSize").value = settings.fontSize || DEFAULTS.fontSize;
  document.getElementById("fontColor").value = settings.fontColor || DEFAULTS.fontColor;
  document.getElementById("bgColor").value = settings.bgColor || DEFAULTS.bgColor;
  document.getElementById("bgOpacity").value = settings.bgOpacity || DEFAULTS.bgOpacity;
  document.getElementById("textStroke").value = settings.textStroke || DEFAULTS.textStroke;
  document.getElementById("textShadow").value = settings.textShadow || DEFAULTS.textShadow;
};

store.subscribe((state) => {
  updatePreview(previewEl, state);
  saveSettings(state);
});

const init = async () => {
  const settings = await loadSettings();
  setFormValues(settings);
  store.setState(settings);
};

init();

const handleFormInput = () => {
  store.setState(getFormValues());
};

form.addEventListener("input", handleFormInput);
form.addEventListener("change", handleFormInput);

document.getElementById("resetBtn").addEventListener("click", () => {
  setFormValues(DEFAULTS);
  store.setState(DEFAULTS);
});
