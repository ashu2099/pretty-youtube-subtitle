const { DEFAULTS, STYLE_RULES } = globalThis;

export const updatePreview = (previewEl, settings) => {
  const size = parseInt(settings.fontSize || DEFAULTS.fontSize, 10);

  const color = settings.fontColor || DEFAULTS.fontColor;
  const bg = `rgb(from ${settings.bgColor || DEFAULTS.bgColor} r g b / ${settings.bgOpacity || DEFAULTS.bgOpacity})`;
  const align = settings.textAlign || DEFAULTS.textAlign;

  const stroke = settings.textStroke
    ? STYLE_RULES.stroke.active
    : STYLE_RULES.stroke.inactive;

  const shadow = settings.textShadow
    ? STYLE_RULES.shadow.active
    : STYLE_RULES.shadow.inactive;

  previewEl.style.cssText = `
    font-size: ${size}px !important;
    color: ${color} !important;
    -webkit-text-fill-color: ${color} !important;
    background-color: ${bg} !important;
    ${stroke}
    ${shadow}
  `;

  if (previewEl.parentElement) {
    const alignMap = {
      left: "flex-start",
      center: "center",
      right: "flex-end",
    };

    previewEl.parentElement.style.justifyContent =
      alignMap[align] || "flex-start";
  }
};
