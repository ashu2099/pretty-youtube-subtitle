(function () {
  const STYLE_ID = "yt-subtitle-custom-style";

  const DEFAULTS = {
    fontSize: "22",
    fontColor: "#ffffff",
    bgColor: "#000000",
    bgOpacity: "0.75",
    textStroke: "no",
    textShadow: "no"
  };

  const BASIC_COLORS = {
    black: "0, 0, 0",
    white: "255, 255, 255",
    gray: "128, 128, 128",
    grey: "128, 128, 128",
    red: "255, 0, 0",
    green: "0, 128, 0",
    blue: "0, 0, 255",
    yellow: "255, 255, 0",
    cyan: "0, 255, 255",
    magenta: "255, 0, 255",
    navy: "0, 0, 128"
  };

  function hexOrNameToRgba(color, opacity) {
    const op = parseFloat(opacity);
    const alpha = Number.isFinite(op) ? Math.max(0, Math.min(1, op)) : 0.75;
    if (!color) {
      return `rgba(0, 0, 0, ${alpha})`;
    }
    const trimmed = color.trim().toLowerCase();
    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(trimmed)) {
      let hex = trimmed.substring(1);
      if (hex.length === 3) {
        hex = hex.split("").map((c) => c + c).join("");
      }
      const num = parseInt(hex, 16);
      return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
    }
    if (BASIC_COLORS[trimmed]) {
      return `rgba(${BASIC_COLORS[trimmed]}, ${alpha})`;
    }
    return `rgba(0, 0, 0, ${alpha})`;
  }

  function buildCss(settings) {
    const size = parseInt(settings.fontSize, 10) || 22;
    const color = settings.fontColor || "#ffffff";
    const bg = hexOrNameToRgba(settings.bgColor, settings.bgOpacity);
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
  }

  function applyStyles(settings) {
    let el = document.getElementById(STYLE_ID);
    if (!el) {
      el = document.createElement("style");
      el.id = STYLE_ID;
      (document.head || document.documentElement).appendChild(el);
    }
    el.textContent = buildCss(settings);
  }

  browser.storage.local.get(DEFAULTS).then(applyStyles);

  browser.storage.onChanged.addListener((changes, area) => {
    if (area === "local") {
      browser.storage.local.get(DEFAULTS).then(applyStyles);
    }
  });
})();
