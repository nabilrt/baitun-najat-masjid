import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const assetsDir = path.join(root, "assets");

const files = [
  {
    source: path.join(assetsDir, "brand-mark.svg"),
    output: path.join(assetsDir, "icon.png"),
    size: 1024
  },
  {
    source: path.join(assetsDir, "brand-mark.svg"),
    output: path.join(assetsDir, "adaptive-icon.png"),
    size: 1024
  },
  {
    source: path.join(assetsDir, "brand-mark.svg"),
    output: path.join(assetsDir, "favicon.png"),
    size: 256
  },
  {
    source: path.join(assetsDir, "splash-art.svg"),
    output: path.join(assetsDir, "splash.png"),
    size: 1600
  }
];

function commandExists(command) {
  try {
    execFileSync("which", [command], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function renderWithInkscape(source, output, size) {
  execFileSync(
    "inkscape",
    [source, "--export-type=png", `--export-filename=${output}`, `--export-width=${size}`, `--export-height=${size}`],
    { stdio: "inherit" }
  );
}

function renderWithRsvgConvert(source, output, size) {
  execFileSync("rsvg-convert", ["-w", String(size), "-h", String(size), source, "-o", output], {
    stdio: "inherit"
  });
}

function renderWithQlmanage(source, output, size) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "baitun-najat-assets-"));
  try {
    execFileSync("qlmanage", ["-t", "-s", String(size), "-o", tmpDir, source], { stdio: "inherit" });
    const generatedName = fs
      .readdirSync(tmpDir)
      .filter((name) => name.endsWith(".png"))
      .sort((a, b) => {
        const aTime = fs.statSync(path.join(tmpDir, a)).mtimeMs;
        const bTime = fs.statSync(path.join(tmpDir, b)).mtimeMs;
        return bTime - aTime;
      })[0];
    const generated = generatedName ? path.join(tmpDir, generatedName) : null;
    if (!generated || !fs.existsSync(generated)) {
      throw new Error(`qlmanage did not generate a PNG thumbnail for ${source}`);
    }
    fs.copyFileSync(generated, output);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

function ensureTool() {
  if (commandExists("inkscape")) return "inkscape";
  if (commandExists("rsvg-convert")) return "rsvg-convert";
  if (commandExists("qlmanage")) return "qlmanage";
  return null;
}

const tool = ensureTool();

if (!tool) {
  console.error("No SVG export tool found. Install one of: inkscape, librsvg (rsvg-convert), or use macOS qlmanage.");
  process.exit(1);
}

for (const file of files) {
  fs.mkdirSync(path.dirname(file.output), { recursive: true });
  if (tool === "inkscape") renderWithInkscape(file.source, file.output, file.size);
  if (tool === "rsvg-convert") renderWithRsvgConvert(file.source, file.output, file.size);
  if (tool === "qlmanage") renderWithQlmanage(file.source, file.output, file.size);
  console.log(`Generated ${path.relative(root, file.output)}`);
}
