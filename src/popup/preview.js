export const updatePreview = (previewEl, settings) => {
  const size = parseInt(settings.fontSize, 10) || 22;
  const color = settings.fontColor || "#ffffff";

  previewEl.style.fontSize = `${size}px`;
  previewEl.style.color = color;
  previewEl.style.webkitTextFillColor = color;
  previewEl.style.backgroundColor = `rgb(from ${settings.bgColor || "#000000"} r g b / ${settings.bgOpacity || "0.75"})`;

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
};
