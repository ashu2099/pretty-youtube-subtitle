const { STYLE_ID, DEFAULTS, STYLE_RULES } = globalThis;

const buildCss = (settings) => {
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

  return `
    .ytp-caption-segment {
      font-size: ${size}px !important;
      color: ${color} !important;
      -webkit-text-fill-color: ${color} !important;
      background-color: ${bg} !important;
      ${stroke}
      ${shadow}
    }
    .caption-window {
      ${STYLE_RULES.captionWindow}
      text-align: ${align} !important;
    }
    .caption-visual-line {
      text-align: ${align} !important;
    }
  `;
};

const applyStyles = (settings) => {
  let el = document.getElementById(STYLE_ID);
  if (!el) {
    el = document.createElement("style");
    el.id = STYLE_ID;
    (document.head || document.documentElement).appendChild(el);
  }
  el.textContent = buildCss(settings);
};

const updateStyles = async () => {
  const settings = await browser.storage.local.get(DEFAULTS);
  applyStyles(settings);
};

updateStyles();

browser.storage.onChanged.addListener((changes, area) => {
  if (area === "local") {
    updateStyles();
  }
});
