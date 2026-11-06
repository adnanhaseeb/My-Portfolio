/**
 * Generates every binary asset the site ships: the optimized profile and
 * project images, the "AH" monogram icons, and the Open Graph card.
 *
 * Usage: node scripts/generate-assets.mjs
 *
 * Source photos are read from SOURCE_DIR (override with ASSET_SOURCE_DIR).
 * Text on the Open Graph card comes from src/content, which Node 22 loads
 * directly by stripping the TypeScript types. Fonts are downloaded from
 * Google Fonts on each run, so the script needs network access.
 * Safe to re-run: every output file is overwritten.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { createElement as h } from "react";
import sharp from "sharp";
import { ImageResponse } from "next/dist/compiled/@vercel/og/index.node.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = process.env.ASSET_SOURCE_DIR ?? "D:/my projects/Portfolio/3d_dev_portfolio/public/images";

const { site } = await import("../src/content/site.ts");
const { hero } = await import("../src/content/profile.ts");

const brand = {
  blue: "#2563eb",
  violet: "#7c3aed",
  ink: "#0b0b12",
  paper: "#fafafb",
  muted: "#52525b",
};

const out = (...parts) => join(root, ...parts);

async function save(path, buffer) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, buffer);
  console.log(`${path.replace(root, ".")}  ${(buffer.length / 1024).toFixed(1)} KB`);
}

async function googleFont(family, weight) {
  const query = `family=${family.replaceAll(" ", "+")}:wght@${weight}`;
  const css = await fetch(`https://fonts.googleapis.com/css2?${query}`, {
    headers: { "User-Agent": "Mozilla/4.0" },
  }).then((response) => response.text());
  const url = css.match(/src:\s*url\(([^)]+)\)\s*format\('truetype'\)/)?.[1];
  if (!url) throw new Error(`No TrueType source found for ${family} ${weight}`);
  const data = await fetch(url).then((response) => response.arrayBuffer());
  return { name: family, data, weight, style: "normal" };
}

async function render(element, width, height, fonts) {
  const response = new ImageResponse(element, { width, height, fonts });
  return Buffer.from(await response.arrayBuffer());
}

async function profileImage() {
  const size = 256;
  const source = sharp(join(sourceDir, "adnan.jpeg"));
  const { width, height } = await source.metadata();
  const side = Math.min(width, height);
  const square = await source
    .extract({
      left: Math.floor((width - side) / 2),
      top: Math.floor((height - side) / 2),
      width: side,
      height: side,
    })
    .resize(size, size)
    .toBuffer();
  const radius = size / 2 - 1;
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="#fff"/></svg>`,
  );
  const webp = await sharp(square)
    .composite([{ input: mask, blend: "dest-in" }])
    .webp({ quality: 80, alphaQuality: 90, effort: 6 })
    .toBuffer();
  await save(out("public", "images", "profile", "adnan.webp"), webp);
}

async function projectImage() {
  const webp = await sharp(join(sourceDir, "project2.png"))
    .resize(1600, 730, { fit: "cover", position: "top" })
    .webp({ quality: 78, effort: 6 })
    .toBuffer();
  await save(out("public", "images", "projects", "supercrypt.webp"), webp);
}

function monogram(size) {
  return h(
    "div",
    {
      style: {
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: Math.round(size * 0.24),
        backgroundImage: `linear-gradient(135deg, ${brand.blue} 0%, ${brand.violet} 100%)`,
        color: "#ffffff",
        fontFamily: "Instrument Sans",
        fontWeight: 700,
        fontSize: Math.round(size * 0.46),
        letterSpacing: `${-0.02 * size * 0.46}px`,
        lineHeight: 1,
        paddingBottom: Math.round(size * 0.02),
      },
    },
    site.initials,
  );
}

function icoFromPngs(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = 6 + pngs.length * 16;
  const entries = pngs.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...pngs.map(({ data }) => data)]);
}

async function icons(fonts) {
  const compress = (buffer) => sharp(buffer).png({ compressionLevel: 9 }).toBuffer();

  const icon = await compress(await render(monogram(512), 512, 512, fonts));
  await save(out("src", "app", "icon.png"), icon);

  const appleSize = 180;
  const apple = await render(
    h(
      "div",
      {
        style: {
          width: appleSize,
          height: appleSize,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `linear-gradient(135deg, ${brand.blue} 0%, ${brand.violet} 100%)`,
          color: "#ffffff",
          fontFamily: "Instrument Sans",
          fontWeight: 700,
          fontSize: 82,
          letterSpacing: "-1.6px",
          paddingBottom: 4,
        },
      },
      site.initials,
    ),
    appleSize,
    appleSize,
    fonts,
  );
  await save(out("src", "app", "apple-icon.png"), await sharp(apple).flatten({ background: brand.violet }).png({ compressionLevel: 9 }).toBuffer());

  const favicons = [];
  const rendered = await render(monogram(256), 256, 256, fonts);
  for (const size of [16, 32, 48]) {
    const data = await sharp(rendered).resize(size, size, { kernel: "lanczos3" }).png({ compressionLevel: 9 }).toBuffer();
    favicons.push({ size, data });
  }
  await save(out("src", "app", "favicon.ico"), icoFromPngs(favicons));
}

async function openGraph(fonts) {
  const width = 1200;
  const height = 630;
  const card = h(
    "div",
    {
      style: {
        width,
        height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        backgroundColor: brand.paper,
        backgroundImage: [
          "radial-gradient(circle at 8% 0%, rgba(37, 99, 235, 0.20) 0%, rgba(37, 99, 235, 0) 45%)",
          "radial-gradient(circle at 96% 18%, rgba(124, 58, 237, 0.20) 0%, rgba(124, 58, 237, 0) 42%)",
          "radial-gradient(circle at 70% 120%, rgba(124, 58, 237, 0.10) 0%, rgba(124, 58, 237, 0) 40%)",
        ].join(", "),
        color: brand.ink,
        fontFamily: "Instrument Sans",
      },
    },
    h(
      "div",
      { style: { display: "flex", alignItems: "center", gap: 24 } },
      monogram(76),
      h(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: 6 } },
        h("div", { style: { fontSize: 34, fontWeight: 600, letterSpacing: "-0.5px" } }, site.name),
        h(
          "div",
          { style: { fontFamily: "JetBrains Mono", fontSize: 20, fontWeight: 500, color: brand.muted } },
          site.title,
        ),
      ),
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          columnGap: 22,
          fontSize: 84,
          fontWeight: 600,
          lineHeight: 1.08,
          letterSpacing: "-2.5px",
          maxWidth: 1000,
        },
      },
      ...hero.headlineStart.split(" ").map((word) => h("span", { key: word }, word)),
      h(
        "span",
        { style: { display: "flex", flexDirection: "column", position: "relative" } },
        h("span", { style: { color: brand.violet } }, hero.headlineHighlight),
        h("span", {
          style: {
            position: "absolute",
            left: 2,
            right: 2,
            bottom: -4,
            height: 8,
            borderRadius: 8,
            backgroundImage: `linear-gradient(90deg, ${brand.blue}, ${brand.violet})`,
          },
        }),
      ),
      ...hero.headlineEnd.split(" ").map((word) => h("span", { key: `end-${word}` }, word)),
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontFamily: "JetBrains Mono",
          fontSize: 22,
          fontWeight: 500,
          color: brand.muted,
        },
      },
      h("div", { style: { width: 12, height: 12, borderRadius: 12, backgroundColor: "#16a34a" } }),
      h("div", {}, site.availability),
      h("div", { style: { color: "#a1a1aa" } }, "/"),
      h("div", {}, site.location),
    ),
  );
  const png = await render(card, width, height, fonts);
  await save(out("src", "app", "opengraph-image.png"), await sharp(png).flatten({ background: brand.paper }).png({ compressionLevel: 9 }).toBuffer());
  const alt = `${site.name}, ${site.title}: ${hero.headlineStart} ${hero.headlineHighlight} ${hero.headlineEnd}`;
  await save(out("src", "app", "opengraph-image.alt.txt"), Buffer.from(alt.replaceAll(" · ", ", ")));
}

const fonts = await Promise.all([
  googleFont("Instrument Sans", 500),
  googleFont("Instrument Sans", 600),
  googleFont("Instrument Sans", 700),
  googleFont("JetBrains Mono", 500),
]);

await profileImage();
await projectImage();
await icons(fonts);
await openGraph(fonts);
