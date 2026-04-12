import fs from "fs";
import path from "path";
import type { ExpoConfig } from "expo/config";

const root = __dirname;
const assets = {
  icon: "./assets/icon.png",
  adaptiveIcon: "./assets/adaptive-icon.png",
  splash: "./assets/splash.png",
  favicon: "./assets/favicon.png",
  googleServices: "./google-services.json"
};

function fileExists(relativePath: string) {
  return fs.existsSync(path.join(root, relativePath));
}

const config: ExpoConfig = {
  name: "Baitun Najat",
  slug: "baitun-najat-mobile",
  scheme: "baitunnajat",
  orientation: "portrait",
  userInterfaceStyle: "light",
  plugins: [
    "expo-router",
    [
      "expo-notifications",
      {
        icon: "./assets/icon.png",
        color: "#07152F",
        sounds: []
      }
    ]
  ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    eas: {
      projectId: "d6fe9a58-88b2-4fd0-a726-e8d43418c9a5"
    }
  },
  splash: {
    backgroundColor: "#07152F",
    resizeMode: "contain",
    ...(fileExists(assets.splash) ? { image: assets.splash } : {})
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.baitunnajat.mobile"
  },
  android: {
    package: "com.baitunnajat.mobile",
    ...(fileExists(assets.googleServices) ? { googleServicesFile: assets.googleServices } : {}),
    adaptiveIcon: {
      backgroundColor: "#091937",
      ...(fileExists(assets.adaptiveIcon) ? { foregroundImage: assets.adaptiveIcon } : {})
    }
  },
  web: {
    bundler: "metro",
    output: "single",
    ...(fileExists(assets.favicon) ? { favicon: assets.favicon } : {})
  },
  ...(fileExists(assets.icon) ? { icon: assets.icon } : {})
};

export default config;
