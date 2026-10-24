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
  textStroke: document.getElementById("textStroke").checked,
  textShadow: document.getElementById("textShadow").checked,
});

const setFormValues = (settings) => {
  document.getElementById("fontSize").value =
    settings.fontSize || DEFAULTS.fontSize;

  document.getElementById("fontColor").value =
    settings.fontColor || DEFAULTS.fontColor;

  document.getElementById("bgColor").value =
    settings.bgColor || DEFAULTS.bgColor;

  document.getElementById("bgOpacity").value =
    settings.bgOpacity || DEFAULTS.bgOpacity;

  document.getElementById("textStroke").checked = Boolean(
    settings.textStroke === true || settings.textStroke === "yes",
  );

  document.getElementById("textShadow").checked = Boolean(
    settings.textShadow === true || settings.textShadow === "yes",
  );
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
