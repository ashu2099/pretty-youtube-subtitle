export const STYLE_ID = "yt-subtitle-custom-style";

export const DEFAULTS = {
  fontSize: "22",
  fontColor: "#ffffff",
  bgColor: "#000000",
  bgOpacity: "0.75",
  textStroke: false,
  textShadow: false,
};

export const DEFAULT_CONFIG = {
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
