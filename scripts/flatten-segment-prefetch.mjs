/**
 * Next 16 static export writes segment prefetch payloads as nested folders,
 * for example out/projects/__next.projects/__PAGE__.txt, while the client router
 * requests the dot-joined name out/projects/__next.projects.__PAGE__.txt.
 * This copies every nested payload to its dot-joined name so prefetching works on any static host.
 * Usage: node scripts/flatten-segment-prefetch.mjs (runs automatically after next build)
 */
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");
const segmentPrefix = "__next.";

function flattenSegmentFolder(parentDir, folderName) {
  const folderPath = path.join(parentDir, folderName);
  let copied = 0;

  for (const entry of fs.readdirSync(folderPath, { withFileTypes: true })) {
    const entryPath = path.join(folderPath, entry.name);
    const dottedName = `${folderName}.${entry.name}`;

    if (entry.isDirectory()) {
      fs.cpSync(entryPath, path.join(parentDir, dottedName), { recursive: true });
      copied += flattenSegmentFolder(parentDir, dottedName);
    } else {
      fs.copyFileSync(entryPath, path.join(parentDir, dottedName));
      copied += 1;
    }
  }

  return copied;
}

function walk(dir) {
  let copied = 0;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === "_next") continue;

    if (entry.name.startsWith(segmentPrefix)) {
      copied += flattenSegmentFolder(dir, entry.name);
    } else {
      copied += walk(path.join(dir, entry.name));
    }
  }

  return copied;
}

if (!fs.existsSync(outDir)) {
  console.error("No out directory found. Run next build first.");
  process.exit(1);
}

console.log(`Flattened ${walk(outDir)} segment prefetch files.`);
