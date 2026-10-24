const STYLE_ID = "yt-subtitle-custom-style";

const DEFAULTS = {
  fontSize: "22",
  fontColor: "#ffffff",
  bgColor: "#000000",
  bgOpacity: "0.75",
  textStroke: "no",
  textShadow: "no"
};

const buildCss = (settings) => {
  const size = parseInt(settings.fontSize, 10) || 22;
  const color = settings.fontColor || "#ffffff";
  const bg = `rgb(from ${settings.bgColor || "#000000"} r g b / ${settings.bgOpacity || "0.75"})`;
  const stroke = settings.textStroke === "yes"
    ? "paint-order: stroke fill !important; -webkit-text-stroke: 1px black !important;"
    : "-webkit-text-stroke: 0px !important;";
  const shadow = settings.textShadow === "yes"
    ? "text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.8) !important;"
    : "text-shadow: none !important;";

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
      background-color: transparent !important;
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
