const mainStyleId = "yt-subtitle-custom-style";

const mainDefaults = {
  fontSize: "22",
  fontColor: "#ffffff",
  bgColor: "#000000",
  bgOpacity: "0.75",
  textStroke: false,
  textShadow: false,
};

const mainDefaultConfig = {
  stroke: {
    yes: "paint-order: stroke fill !important; -webkit-text-stroke: 2px black !important;",
    no: "-webkit-text-stroke: 0px !important;",
  },
  shadow: {
    yes: "text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.8) !important;",
    no: "text-shadow: none !important;",
  },
  captionWindow: "background-color: transparent !important;",
};

Object.assign(globalThis, {
  STYLE_ID: mainStyleId,
  DEFAULTS: mainDefaults,
  DEFAULT_CONFIG: mainDefaultConfig,
});
