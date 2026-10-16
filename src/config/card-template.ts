/**
 * Fixed text of the bilingual (Arabic + English) UPD card, in the A4 layout of
 * the client's reference PDF. The card is issued in the client's own name: the
 * reference's certification statement and the regulator's contact details are
 * deliberately left out (see `issuedBy*` and the footer, which use COMPANY).
 *
 * This is a regulatory document format. It must NOT be translated or read from
 * the app's i18n dictionaries — the Arabic/Urdu UI toggle never affects the card.
 */
export const CARD_TEXT = {
  title_en: ["Unique Under-run Protection Device (UPD)", "Card"],
  title_ar: "بطاقة الرقم المميز للحاجز",
  card_number: { en: "Card Number:", ar: "رقم البطاقة" },
  card_issue_date: { en: "Card Issue Date:", ar: "تاريخ إصدار البطاقة" },
  issuedBy_en: (company: string) => `This Unique Under-run Protection Device (UPD) Card is issued by ${company} for the device detailed below.`,
  issuedBy_ar: (company: string) => `أصدرت ${company} بطاقة الرقم المميز للحاجز للجهاز الموضحة بياناته أدناه.`,
  vin: { en: "Vehicle Chassis Number (VIN)", ar: "رقم هيكل المركبة (VIN)" },
  fields: {
    manufacturer_name: { en: "Manufacturer's Name", ar: "اسم المصنع/الوكيل" },
    manufacturer_code: { en: "Manufacturer Assigned Code", ar: "رمز المصنع" },
    country_of_origin: { en: "Country of Origin", ar: "بلد المنشأ" },
    date_of_manufacture: { en: "Date of Manufacture", ar: "تاريخ الصنع" },
    vehicle_model_name: { en: "Vehicle Model Name", ar: "اسم طراز المركبة" },
    vehicle_brand: { en: "Vehicle Brand", ar: "ماركة المركبة" },
    vehicle_model_year: { en: "Vehicle Model Year", ar: "سنة موديل المركبة" },
    upd_type: { en: "UPD Type (Front, Side, Rear)", ar: "نوع الحاجز (أمامي، جانبي، خلفي)" },
    under_run_number: { en: "Distinguished Under-Run\nNumber", ar: "الرقم المميز للحاجز" },
    technical_references: { en: "Technical References", ar: "المتطلبات الفنية" },
  },
  /** One line per barrier in the "UPD Type" cell, keyed by the letter in `upd_type`. */
  upd_types: {
    F: "Front Barrier / حاجز أمامي",
    S: "Side Barrier / حاجز جانبي",
    R: "Rear Barrier / حاجز خلفي",
  } as Record<string, string>,
  validity_en: "Any changes or modification on this card will affect its validity.",
  validity_ar: "أي كشط أو تغيير في هذه البطاقة يلغيها.",
  verify_en: [
    "This card was issued electronically and does not require a stamp",
    "or signature. To verify the card and its details, you can scan the QR code.",
  ],
  verify_ar: ["هذه البطاقة صدرت إلكترونياً ولا تحتاج إلى ختم وتوقيع،", "وللتحقق من صحة البطاقة وتفاصيلها يمكنكم مسح الـ QR Code"],
  issuer_label: { en: "Issued by", ar: "صادرة عن" },
  country_line: { en: "Kingdom of Saudi Arabia", ar: "المملكة العربية السعودية" },
} as const;

/** Default value of the "Technical References" field (stored on each card in Arabic). */
export const DEFAULT_TECHNICAL_REFERENCES =
  "اللائحة الفنية للحواجز الأمامية والخلفية والجانبية للشاحنات والمقطورات";

/** How the default technical reference is printed on the card: English / Arabic. */
export const DEFAULT_TECHNICAL_REFERENCES_PRINTED =
  `Technical Regulation for Front, Rear, and Side Barriers for Trucks and Trailers / ${DEFAULT_TECHNICAL_REFERENCES}`;
