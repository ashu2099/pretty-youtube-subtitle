# YouTube Subtitle Styler for Firefox

A lightweight WebExtension for **Firefox for Android** and **Firefox Desktop** that customizes YouTube video subtitles (both auto-generated and manual captions) in real time.

---

## Features

- **Font Size**: Enter custom sizes with or without units (e.g., `24px`, `22`, `1.5rem`).
- **Font Color**: Enter color names or hex codes (e.g., `yellow`, `#ffffff`, `rgb(255,255,0)`). Includes a direct link to an open-source color picker.
- **Background**: Enter custom colors, opacity, or rgba strings (e.g., `rgba(0, 0, 0, 0.75)`, `black`).
- **Text Stroke**: Toggle outline on or off (`Yes` / `No`).
- **Text Shadow**: Toggle drop shadow on or off (`Yes` / `No`).
- **Live Preview**: Real-time preview card updates with every keystroke.
- **Dark Gray Theme**: Antigravity / VS Code style dark gray (`#1e1e1e` / `#252526` / `#3c3c3c`) designed for low eye strain in darkness and high legibility in sunlight.
- **Zero Framework Overhead**: Built with pure modular JavaScript (ES Modules). Fast startup, 0ms input lag, and minimal memory usage.

---

## Directory Structure

```
subtitle-css/
├── src/
│   ├── manifest.json       # WebExtension Manifest V3
│   ├── core/
│   │   ├── constants.js    # Default values, style IDs
│   │   ├── store.js        # Reactive Store for state management
│   │   ├── css-builder.js  # Pure CSS generation function
│   │   └── storage.js      # browser.storage.local wrapper
│   ├── content/
│   │   └── content.js      # Content script injecting styles into YouTube
│   ├── popup/
│   │   ├── popup.html      # UI structure
│   │   ├── popup.css       # VS Code dark gray responsive styling
│   │   ├── preview.js      # Live preview DOM renderer
│   │   └── popup.js        # UI controller
│   └── icons/
│       ├── icon-48.png
│       ├── icon-96.png
│       └── icon-128.png
├── package.json            # Scripts & development dependencies
└── README.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Firefox Desktop](https://www.mozilla.org/firefox/)
- [Firefox for Android](https://play.google.com/store/apps/details?id=org.mozilla.firefox) (for mobile testing)

---

## Installation

Install development tools (`web-ext` and `addons-linter`):

```bash
npm install
```

---

## Testing on Desktop

### Option A: Automatic Dev Server (Recommended)
Launch a clean Firefox instance with the extension pre-loaded:

```bash
npm run start
```

This starts `web-ext run`. Any file changes reload automatically.

### Option B: Manual Loading via `about:debugging`
1. Open Firefox Desktop.
2. In the URL bar, go to:
   ```
   about:debugging#/runtime/this-firefox
   ```
3. Click **Load Temporary Add-on...**
4. Select `src/manifest.json`.
5. Open [YouTube](https://www.youtube.com) and play any video with subtitles enabled (CC).
6. Click the extension icon in the Firefox toolbar to adjust subtitle styles.

---

## Testing on Android (Firefox for Android)

### Step 1: Enable USB Debugging on Your Phone
1. Open your Android device **Settings** -> **About Phone**.
2. Tap **Build Number** 7 times to enable Developer Options.
3. Go to **Settings** -> **Developer Options** and turn on **USB Debugging**.
4. Connect your phone to your computer with a USB cable.

### Step 2: Enable Remote Debugging in Firefox for Android
1. Open **Firefox** on your Android phone.
2. Tap the three-dot menu (`⋮`) -> **Settings** -> **About Firefox**.
3. Tap the **Firefox logo** 5 times to unlock Developer settings.
4. Go back to **Settings** and enable **Remote USB Debugging**.

### Step 3: Connect and Load Extension
1. In desktop Firefox, navigate to:
   ```
   about:debugging
   ```
2. Click **Connect to Android Device** in the left sidebar.
3. Select your phone from the list.
4. Under your device, find **Temporary Extensions** and click **Load Temporary Add-on...**
5. Select `src/manifest.json` from your computer.
6. On your phone:
   - Open `m.youtube.com` and start a video with subtitles.
   - Tap the three-dot menu (`⋮`) -> **Add-ons** -> **YouTube Subtitle Styler**.
   - Change your subtitle settings and view the immediate updates.

---

## Building and Packaging

### Linting (Mozilla AMO Compatibility Check)
Run the Mozilla Add-ons linter to check for syntax and policy errors:

```bash
npm run lint
```

### Packaging for Release
Build the distribution `.zip` archive:

```bash
npm run build
```

The output file is generated in `web-ext-artifacts/`:
```
web-ext-artifacts/youtube_subtitle_styler-1.0.0.zip
```

---

## Publishing to Mozilla Add-ons (AMO)

1. Go to the [Mozilla Add-ons Developer Hub](https://addons.mozilla.org/developers/).
2. Log in with your Firefox Account.
3. Click **Submit a New Add-on**.
4. Choose **On this site (Listed)** to publish publicly.
5. Upload the `.zip` file from `web-ext-artifacts/`.
6. Fill in the listing metadata (description, categories, screenshots).
7. Submit the add-on. Mozilla will review and sign it automatically for both Android and Desktop distribution.
