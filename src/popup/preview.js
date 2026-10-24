import { DEFAULTS, DEFAULT_CONFIG } from "../core/constants.js";

export const updatePreview = (previewEl, settings) => {
  const size =
    parseInt(settings.fontSize, 10) || parseInt(DEFAULTS.fontSize, 10);
  const color = settings.fontColor || DEFAULTS.fontColor;
  const bg = `rgb(from ${settings.bgColor || DEFAULTS.bgColor} r g b / ${settings.bgOpacity || DEFAULTS.bgOpacity})`;

  const isStroke =
    settings.textStroke === true || settings.textStroke === "yes";

  const isShadow =
    settings.textShadow === true || settings.textShadow === "yes";

  const stroke = isStroke
    ? DEFAULT_CONFIG.stroke.yes
    : DEFAULT_CONFIG.stroke.no;

  const shadow = isShadow
    ? DEFAULT_CONFIG.shadow.yes
    : DEFAULT_CONFIG.shadow.no;

  previewEl.style.cssText = `
    font-size: ${size}px !important;
    color: ${color} !important;
    -webkit-text-fill-color: ${color} !important;
    background-color: ${bg} !important;
    ${stroke}
    ${shadow}
  `;
};
