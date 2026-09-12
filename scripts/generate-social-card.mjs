import { mkdir } from "node:fs/promises";
import sharp from "sharp";
import { logoMarkPaths } from "../lib/logo-mark.ts";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f8f4ed"/>
  <g transform="translate(72 62) scale(2)" fill="#2f6f6a" fill-rule="evenodd">${logoMarkPaths.map(d => `<path d="${d}"/>`).join("")}</g>
  <g font-family="Arial, Helvetica, sans-serif" fill="#242321">
    <text x="194" y="103" font-size="34" font-weight="600" letter-spacing="5">ESHANA</text>
    <text x="195" y="133" font-size="16" letter-spacing="3" fill="#5e5d56">SOFTWARE SOLUTIONS</text>
    <path d="M80 202H1120" stroke="#dcd6cb" stroke-width="1"/>
    <text x="80" y="306" font-size="72" font-weight="700">Build fast.</text>
    <text x="80" y="395" font-size="72" font-weight="700">Ship with confidence.</text>
    <text x="80" y="510" font-size="25" fill="#2f6f6a">Quality Engineering &#183; Test Automation &#183; AI-Assisted Quality</text>
  </g>
</svg>`;

await mkdir(new URL("../public/brand/", import.meta.url), { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(new URL("../public/brand/eshana-social-card.png", import.meta.url).pathname);
console.log("Generated 1200 x 630 Eshana brand social card.");
