const STYLE_ID = "yt-subtitle-custom-style";

const DEFAULTS = {
  fontSize: "22",
  fontColor: "#ffffff",
  bgColor: "#000000",
  bgOpacity: "0.75",
  textStroke: false,
  textShadow: false,
};

const DEFAULT_CONFIG = {
  stroke: {
    yes: "paint-order: stroke fill !important; -webkit-text-stroke: 1px black !important;",
    no: "-webkit-text-stroke: 0px !important;",
  },
  shadow: {
    yes: "text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.8) !important;",
    no: "text-shadow: none !important;",
  },
  captionWindow: "background-color: transparent !important;",
};

const buildCss = (settings) => {
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
      ${DEFAULT_CONFIG.captionWindow}
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
