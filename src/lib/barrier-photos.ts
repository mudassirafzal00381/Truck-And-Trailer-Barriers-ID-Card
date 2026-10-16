/**
 * Barrier pictures (front / side / rear). Shared by client and server: which pictures a
 * card can have, the accepted formats, and which URL to show (uploaded or default).
 */
import { COMPANY } from "@/config/company";
import type { PublicCard } from "./cards";

export const PHOTO_KINDS = ["front", "side", "rear"] as const;
export type PhotoKind = (typeof PHOTO_KINDS)[number];

/** Upload limit per picture (the browser shrinks photos well below this first). */
export const MAX_PHOTO_BYTES = 3 * 1024 * 1024;
export const PHOTO_EXTENSIONS: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

/** UPD type letter for each picture: a side picture only makes sense with a side barrier (S), etc. */
const LETTER: Record<PhotoKind, string> = { front: "F", side: "S", rear: "R" };

export function photoKindsFor(updType: string): PhotoKind[] {
  const parts = updType.split("/");
  return PHOTO_KINDS.filter((kind) => parts.includes(LETTER[kind]));
}

/** Default picture per kind; front has none (shown only when one was uploaded). */
export function defaultBarrierPhoto(kind: PhotoKind): string | null {
  const defaults: Partial<Record<PhotoKind, string>> = COMPANY.default_barrier_photos;
  return defaults[kind] ?? null;
}

type PhotoFields = Pick<PublicCard, "front_photo_url" | "side_photo_url" | "rear_photo_url">;

/** The picture to display: the card's uploaded one, the configured default, or null (nothing to show). */
export function barrierPhoto(card: PhotoFields, kind: PhotoKind): { url: string; isDefault: boolean } | null {
  const uploaded = card[`${kind}_photo_url`];
  if (uploaded) return { url: uploaded, isDefault: false };
  const fallback = defaultBarrierPhoto(kind);
  return fallback ? { url: fallback, isDefault: true } : null;
}
