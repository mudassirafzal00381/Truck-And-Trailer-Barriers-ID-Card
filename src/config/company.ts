/**
 * Company configuration — the single source of truth for company details.
 * Update values here and they propagate to the header, footer, new cards,
 * and the verification page. Existing cards keep the values stored with them.
 */
export const COMPANY = {
  name_en: "Warshat Bariq Al-Shahinat",
  name_ar: "ورشة بريق الشاحنات",
  manufacturer_code: "E30",
  country_code: "KSA",
  country_of_origin_ar: "السعودية",
  country_of_origin_en: "Saudi Arabia",
  logo_path: "/logo.png",
  // Square version (the SASO triangle mark only), used as the browser tab icon and card watermark.
  logo_mark_path: "/logo-mark.png",
  // The client's own logo, shown on the public record page.
  // ⚠ Currently the gear logo from the client's reference PDF — replace if it isn't theirs.
  card_logo_path: "/manufacturer-logo.png",
  // Not present in the reference PDF — fill in, e.g. ["+966 11 000 0000", "+966 50 000 0000"].
  contact_phones: [] as string[],
  // Contact footer printed at the bottom of the card. Empty value = left out.
  // ⚠ Placeholders — replace with the client's real address, phone, fax, website and email.
  card_footer: {
    address_ar: "",
    address_en: "",
    phone: "+966 00 000 0000",
    fax: "",
    website: "",
    email: "info@example.com",
  },
  // Public record page (what a scanned QR code opens): contacts in its footer.
  // Empty value = row hidden.
  // ⚠ Placeholders — replace them with real ones before handing cards to customers.
  record_page: {
    phone: "+966 00 000 0000",
    email: "info@example.com",
  },
  // Shown on the QR page when a card has no uploaded side / rear picture. Replace
  // these files (or point to your own photos in /public) to change them.
  // There is no default front picture: it is shown only when one was uploaded.
  default_barrier_photos: {
    side: "/barriers/side-default.webp",
    rear: "/barriers/rear-default.webp",
  },
} as const;

/** Switches for features that are built but turned off for now. */
export const FEATURES = {
  // Front/side/rear barrier picture uploads in the new-card form, shown on the
  // admin preview and the QR page. Needs supabase/migrations/003_front_photo.sql.
  barrierPhotos: true,
} as const;

export type CompanyConfig = typeof COMPANY;
