import webext from "web-ext";

process.loadEnvFile();

await webext.cmd.run(
  {
    sourceDir: "src",
    target: ["firefox-android"],
    adbDevice: process.env.ANDROID_DEVICE_ID,
    firefoxApk: "org.mozilla.fenix",
  },
  { shouldExitProgram: true }
);
