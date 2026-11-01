import { useMemo } from "react";

// Deep, restrained hue pairs [light, dark]
const PALETTES = [
  ["#7c3aed", "#3b1a8a"], // violet
  ["#6366f1", "#27256b"], // indigo
  ["#0ea5e9", "#0b3b57"], // sky
  ["#14b8a6", "#0f3d39"], // teal
  ["#d946ef", "#5b1a66"], // fuchsia
  ["#f43f5e", "#6b1230"], // rose
] as const;

// Bar-height influence: tallest in the middle
const ENVELOPE = [0.55, 0.8, 1, 0.8, 0.55];

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function createVoiceAvatarDataUri(seed: string) {
  const base = hash(seed);
  const [from, to] = PALETTES[base % PALETTES.length];

  let s = base || 1;
  const next = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 0xffffffff;
  };

  const bars = ENVELOPE.map((e, i) => {
    const h = Math.round(12 + next() * 28 * e);
    const x = 32 + (i - 2) * 9 - 2.5;
    const y = 32 - h / 2;
    return `<rect x="${x}" y="${y}" width="5" height="${h}" rx="2.5" fill="#fff" fill-opacity=".92"/>`;
  }).join("");

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>` +
    `</linearGradient></defs>` +
    `<rect width="64" height="64" fill="url(#g)"/>${bars}</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function useVoiceAvatar(seed: string) {
  return useMemo(() => createVoiceAvatarDataUri(seed), [seed]);
};