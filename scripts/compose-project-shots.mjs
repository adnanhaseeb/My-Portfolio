/**
 * Composes raw product screenshots into framed showcase images for the portfolio.
 * Each screenshot is placed in a browser window on a branded gradient backdrop, with no text.
 * Source folders can be overridden with TRAFFIQCO_RAW_DIR and SUPERCRYPT_SOURCE.
 * Usage: node scripts/compose-project-shots.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const traffiqcoRaw = process.env.TRAFFIQCO_RAW_DIR ?? "D:/my projects/Portfolio/my details/traffiqco details/images/raw";
const supercryptSource = process.env.SUPERCRYPT_SOURCE ?? "D:/my projects/Portfolio/3d_dev_portfolio/public/images/project2.png";

const frame = { canvasWidth: 1600, marginX: 120, marginY: 55, chrome: 40, radius: 18 };
const windowWidth = frame.canvasWidth - frame.marginX * 2;

const palettes = {
  traffiqco: { deep: "#06302b", mid: "#0b4f46", bright: "#14836f", glow: "#5eead4", chrome: "#eef4f2", pill: "#dfe8e5" },
  supercrypt: { deep: "#1e0b3a", mid: "#3b1670", bright: "#6d28d9", glow: "#c4b5fd", chrome: "#f3f0f9", pill: "#e4def0" },
};

const appArea = { left: 395, top: 0, width: 1765, height: 1103 };

const projects = [
  {
    outDir: "public/images/projects/traffiqco",
    palette: palettes.traffiqco,
    thumbs: true,
    slides: [
      { source: path.join(traffiqcoRaw, "12_editor_fullscreen.png"), name: "01-diagram-editor", crop: null },
      { source: path.join(traffiqcoRaw, "10_step1_site_and_work.png"), name: "02-site-and-work", crop: appArea },
      { source: path.join(traffiqcoRaw, "11_step2_stages.png"), name: "03-stages", crop: appArea },
      { source: path.join(traffiqcoRaw, "12_editor_fullscreen_tmd02.png"), name: "04-diagram-stage-2", crop: null },
      { source: path.join(traffiqcoRaw, "13_step4_stage_briefings.png"), name: "05-stage-briefings", crop: appArea },
      { source: path.join(traffiqcoRaw, "14_step5_plan_review.png"), name: "06-plan-review", crop: appArea },
      { source: path.join(traffiqcoRaw, "15_step6_download.png"), name: "07-download", crop: appArea },
    ],
  },
  {
    outDir: "public/images/projects",
    palette: palettes.supercrypt,
    thumbs: false,
    slides: [{ source: supercryptSource, name: "supercrypt", crop: null }],
  },
];

function backdropSvg(width, height, palette) {
  const gridLines = [];
  for (let x = 0; x <= width; x += 48) gridLines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${height}" />`);
  for (let y = 0; y <= height; y += 48) gridLines.push(`<line x1="0" y1="${y}" x2="${width}" y2="${y}" />`);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="base" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${palette.deep}" />
        <stop offset="0.55" stop-color="${palette.mid}" />
        <stop offset="1" stop-color="${palette.bright}" />
      </linearGradient>
      <radialGradient id="glow" cx="0.82" cy="0.1" r="0.6">
        <stop offset="0" stop-color="${palette.glow}" stop-opacity="0.35" />
        <stop offset="1" stop-color="${palette.glow}" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="fade" cx="0.5" cy="0.35" r="0.75">
        <stop offset="0" stop-color="#000" stop-opacity="0" />
        <stop offset="1" stop-color="#000" stop-opacity="0.35" />
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#base)" />
    <g stroke="#ffffff" stroke-opacity="0.05" stroke-width="1">${gridLines.join("")}</g>
    <rect width="100%" height="100%" fill="url(#glow)" />
    <rect width="100%" height="100%" fill="url(#fade)" />
  </svg>`;
}

function shadowSvg(width, height, windowHeight) {
  const { marginX, marginY, radius } = frame;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs><filter id="blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="28" /></filter></defs>
    <rect x="${marginX + 20}" y="${marginY + 36}" width="${windowWidth - 40}" height="${windowHeight - 20}" rx="${radius}" fill="#000" fill-opacity="0.45" filter="url(#blur)" />
  </svg>`;
}

function windowSvg(width, height, windowHeight, palette) {
  const { marginX: x, marginY: y, chrome, radius } = frame;
  const dotY = y + chrome / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect x="${x}" y="${y}" width="${windowWidth}" height="${windowHeight}" rx="${radius}" fill="${palette.chrome}" />
    <rect x="${x}" y="${y}" width="${windowWidth}" height="${windowHeight}" rx="${radius}" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1.5" />
    <circle cx="${x + 24}" cy="${dotY}" r="6.5" fill="#ff5f57" />
    <circle cx="${x + 46}" cy="${dotY}" r="6.5" fill="#febc2e" />
    <circle cx="${x + 68}" cy="${dotY}" r="6.5" fill="#28c840" />
    <rect x="${x + 100}" y="${dotY - 11}" width="${Math.round(windowWidth * 0.42)}" height="22" rx="11" fill="${palette.pill}" />
  </svg>`;
}

function bottomRoundedMaskSvg(width, height) {
  const r = frame.radius;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <path d="M0 0 H${width} V${height - r} Q${width} ${height} ${width - r} ${height} H${r} Q0 ${height} 0 ${height - r} Z" fill="#fff" />
  </svg>`;
}

async function composeSlide({ source, name, crop }, { outDir, palette, thumbs }) {
  let shot = sharp(source);
  const meta = crop ?? (await shot.metadata());
  if (crop) shot = shot.extract(crop);

  const shotHeight = Math.round((windowWidth * meta.height) / meta.width);
  const windowHeight = frame.chrome + shotHeight;
  const width = frame.canvasWidth;
  const height = windowHeight + frame.marginY * 2;

  const fitted = await shot
    .resize(windowWidth, shotHeight, { fit: "cover", position: "top" })
    .composite([{ input: Buffer.from(bottomRoundedMaskSvg(windowWidth, shotHeight)), blend: "dest-in" }])
    .png()
    .toBuffer();

  const flattened = await sharp(Buffer.from(backdropSvg(width, height, palette)))
    .composite([
      { input: Buffer.from(shadowSvg(width, height, windowHeight)), left: 0, top: 0 },
      { input: Buffer.from(windowSvg(width, height, windowHeight, palette)), left: 0, top: 0 },
      { input: fitted, left: frame.marginX, top: frame.marginY + frame.chrome },
    ])
    .png()
    .toBuffer();

  const full = await sharp(flattened).webp({ quality: 74, effort: 6 }).toFile(path.join(outDir, `${name}.webp`));
  const summary = `${name.padEnd(22)} ${full.width}x${full.height}  ${(full.size / 1024).toFixed(1)} KB`;

  if (!thumbs) return summary;

  const thumb = await sharp(flattened).resize(320, Math.round((320 * height) / width)).webp({ quality: 72 }).toFile(path.join(outDir, "thumbs", `${name}.webp`));
  return `${summary}  thumb ${(thumb.size / 1024).toFixed(1)} KB`;
}

for (const project of projects) {
  fs.mkdirSync(path.join(project.outDir, project.thumbs ? "thumbs" : ""), { recursive: true });
  for (const slide of project.slides) {
    console.log(await composeSlide(slide, project));
  }
}
