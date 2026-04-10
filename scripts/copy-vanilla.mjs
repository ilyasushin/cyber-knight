/**
 * Копирует vanilla/ → public/vanilla/ чтобы Vite отдавал полную игру по /vanilla/index.html
 */
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const src = join(root, "vanilla");
const publicDir = join(root, "public");
const dest = join(publicDir, "vanilla");

if (!existsSync(src)) {
  console.warn("[copy-vanilla] Пропуск: нет папки vanilla/");
  process.exit(0);
}

if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

cpSync(src, dest, { recursive: true });
console.log("[copy-vanilla] OK:", dest);
