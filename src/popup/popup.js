const { DEFAULTS } = globalThis;
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
  textAlign:
    document.querySelector(".group-btn.active")?.dataset.align ||
    DEFAULTS.textAlign,
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

  const alignVal = settings.textAlign || DEFAULTS.textAlign;

  for (const btn of document.querySelectorAll(".group-btn")) {
    btn.classList.remove("active");
  }

  const activeBtn = document.querySelector(
    `.group-btn[data-align="${alignVal}"]`,
  );

  if (activeBtn) {
    activeBtn.classList.add("active");
  }

  document.getElementById("textStroke").checked = Boolean(settings.textStroke);

  document.getElementById("textShadow").checked = Boolean(settings.textShadow);
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

document
  .getElementById("alignment-group")
  .addEventListener("click", (event) => {
    const btn = event.target.closest(".group-btn");
    if (!btn) return;
    for (const b of document.querySelectorAll(".group-btn")) {
      b.classList.remove("active");
    }
    btn.classList.add("active");
    store.setState(getFormValues());
  });

document.getElementById("resetBtn").addEventListener("click", () => {
  setFormValues(DEFAULTS);
  store.setState(DEFAULTS);
});
