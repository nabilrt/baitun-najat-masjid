import fs from "fs";
import path from "path";
import type { ExpoConfig } from "expo/config";

const root = __dirname;
const assets = {
  icon: "./assets/icon.png",
  adaptiveIcon: "./assets/adaptive-icon.png",
  splash: "./assets/splash.png",
  favicon: "./assets/favicon.png"
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
  plugins: ["expo-router"],
  experiments: {
    typedRoutes: true
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
