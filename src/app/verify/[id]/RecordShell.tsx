/* eslint-disable @next/next/no-img-element -- small fixed logo; no need for next/image here */
import { COMPANY } from "@/config/company";
import s from "./RecordPage.module.css";

export type RecordLang = "ar" | "en";

/** `?lang=en` shows the page in English; anything else is Arabic (the default). */
export function recordLang(value: unknown): RecordLang {
  return value === "en" ? "en" : "ar";
}

/**
 * Fixed text of the public record page, in both languages. Deliberately separate
 * from the app's i18n dictionaries: this page has its own Arabic/English switch.
 */
export const RECORD_TEXT = {
  ar: {
    cardTitle: "بطاقة الرقم المميز للحاجز",
    company: "اسم المصنع",
    manufacturerCode: "رمز المصنع",
    country: "بلد المنشأ",
    issueDate: "تاريخ الإصدار",
    status: "الحالة",
    valid: "سارية",
    cardData: "بيانات البطاقة",
    brand: "ماركة المركبة",
    deviceType: "نوع الحاجز",
    modelYear: "سنة الموديل",
    modelName: "اسم طراز المركبة",
    vehicleType: "نوع المركبة",
    vin: "رقم هيكل المركبة (VIN)",
    madeOn: "تاريخ صنع الحاجز",
    serial: "الرقم التسلسلي للحاجز",
    uniqueNo: "الرقم المميز للحاجز",
    photos: { front: "صورة الحاجز الأمامي", side: "صورة الحاجز الجانبي", rear: "صورة الحاجز الخلفي" },
    viewPhoto: "عرض الصورة",
    deviceTypes: { F: "حاجز أمامي", S: "حاجز جانبي", R: "حاجز خلفي" } as Record<string, string>,
    listJoin: "، ",
    notVerified: "غير موثّقة",
    notVerifiedTitle: "تعذّر التحقق من هذه البطاقة",
    notVerifiedDesc: "لم يتم العثور على بطاقة بهذا الرمز. قد تكون البطاقة مزوّرة أو الرابط غير صحيح، فلا تعتمد عليها.",
    unavailable: "غير متاح",
    errorTitle: "تعذّر الاتصال بالخادم",
    errorDesc: "لم نتمكن من التحقق من البطاقة حالياً. هذا لا يعني أن البطاقة غير صالحة، يرجى المحاولة مرة أخرى بعد قليل.",
    retry: "إعادة المحاولة",
    contact: "تواصل معنا",
    rights: "جميع الحقوق محفوظة.",
    switchLabel: "English",
  },
  en: {
    cardTitle: "Barrier Unique ID Card",
    company: "Company Name",
    manufacturerCode: "Manufacturer Code",
    country: "Country of Origin",
    issueDate: "Issuance Date",
    status: "Status",
    valid: "Valid",
    cardData: "Card Data",
    brand: "Brand Name",
    deviceType: "Protective Device Type",
    modelYear: "Model Year",
    modelName: "Vehicle Model Name",
    vehicleType: "Vehicle Type",
    vin: "Vehicle Identification Number (VIN)",
    madeOn: "Date of UPD Manufacture",
    serial: "UPD Serial Number",
    uniqueNo: "UPD Unique Number",
    photos: { front: "Front Barrier Picture", side: "Side Barrier Picture", rear: "Rear Barrier Picture" },
    viewPhoto: "View picture",
    deviceTypes: { F: "Front Barrier", S: "Side Barrier", R: "Rear Barrier" } as Record<string, string>,
    listJoin: ", ",
    notVerified: "Not verified",
    notVerifiedTitle: "This card could not be verified",
    notVerifiedDesc: "No card exists with this code. The card may be forged or the link is wrong — do not rely on it.",
    unavailable: "Unavailable",
    errorTitle: "Could not reach the server",
    errorDesc: "We couldn't check the card right now. This does not mean the card is invalid — please try again shortly.",
    retry: "Try again",
    contact: "Contact Us",
    rights: "All rights reserved.",
    switchLabel: "عربي",
  },
} as const;

/** Page frame: the company header with the language switch, the given content, and the footer. */
export function RecordShell({ lang, children }: { lang: RecordLang; children: React.ReactNode }) {
  const t = RECORD_TEXT[lang];
  const contacts = COMPANY.record_page;

  return (
    <div className={s.page} dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
      <header className={s.header}>
        <div className={s.headerInner}>
          <div className={s.brand}>
            <img className={s.logo} src={COMPANY.card_logo_path} alt="" />
            <div className={s.brandNames}>
              <strong lang="ar">{COMPANY.name_ar}</strong>
              <span lang="en">{COMPANY.name_en}</span>
            </div>
          </div>
          <a className={s.langSwitch} href={`?lang=${lang === "ar" ? "en" : "ar"}`} lang={lang === "ar" ? "en" : "ar"}>
            <GlobeIcon />
            {t.switchLabel}
          </a>
        </div>
      </header>

      <main className={s.main}>{children}</main>

      <footer className={s.footer}>
        <div className={s.footerInner}>
          {(contacts.phone || contacts.email) && (
            <div className={s.footerCol}>
              <h2>{t.contact}</h2>
              <ul>
                {contacts.phone && (
                  <li>
                    <a href={`tel:${contacts.phone.replace(/\s/g, "")}`}>
                      <bdi dir="ltr">{contacts.phone}</bdi>
                    </a>
                  </li>
                )}
                {contacts.email && (
                  <li>
                    <a href={`mailto:${contacts.email}`}>
                      <bdi dir="ltr">{contacts.email}</bdi>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
          <p className={s.copyright}>
            © {new Date().getFullYear()} <strong>{lang === "ar" ? COMPANY.name_ar : COMPANY.name_en}</strong>. {t.rights}
          </p>
        </div>
      </footer>
    </div>
  );
}

/** One "label above a bold value" item, as used in both panels. */
export function Item({ label, children, ltr }: { label: string; children: React.ReactNode; ltr?: boolean }) {
  return (
    <div className={s.item}>
      <span className={s.label}>{label}</span>
      <span className={s.value} dir={ltr ? "ltr" : undefined}>
        {children}
      </span>
    </div>
  );
}

const iconProps = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, "aria-hidden": true } as const;

function GlobeIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
    </svg>
  );
}
