import { hexOrNameToRgba } from "../core/css-builder.js";

export function updatePreview(previewEl, settings) {
  const size = parseInt(settings.fontSize, 10) || 22;
  const color = settings.fontColor || "#ffffff";

  previewEl.style.fontSize = `${size}px`;
  previewEl.style.color = color;
  previewEl.style.webkitTextFillColor = color;
  previewEl.style.backgroundColor = hexOrNameToRgba(settings.bgColor, settings.bgOpacity);

  if (settings.textStroke === "yes") {
    previewEl.style.paintOrder = "stroke fill";
    previewEl.style.webkitTextStroke = "1px black";
  } else {
    previewEl.style.paintOrder = "normal";
    previewEl.style.webkitTextStroke = "0px";
  }

  if (settings.textShadow === "yes") {
    previewEl.style.textShadow = "2px 2px 3px rgba(0, 0, 0, 0.8)";
  } else {
    previewEl.style.textShadow = "none";
  }
}
