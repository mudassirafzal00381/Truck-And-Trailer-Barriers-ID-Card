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
    beta: "تجريبي",
    login: "تسجيل الدخول / التسجيل",
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
    beta: "Beta",
    login: "Login / Register",
  },
} as const;

/** Page frame: the Saudi Standards header with the language switch, the given content, and the footer. */
export function RecordShell({ lang, children }: { lang: RecordLang; children: React.ReactNode }) {
  const t = RECORD_TEXT[lang];
  const contacts = COMPANY.record_page;

  return (
    <div className={s.page} dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
      <header className={s.header}>
        <div className={s.headerInner}>
          <div className={s.brand}>
            <span className={s.menuIcon} aria-hidden="true">
              <MenuIcon />
            </span>
            <img className={s.logo} src={COMPANY.logo_path} alt="Saudi Standards — SASO" />
          </div>
          <nav className={s.headerActions}>
            <span className={s.beta}>{t.beta}</span>
            <a className={s.headerLink} href={`?lang=${lang === "ar" ? "en" : "ar"}`} lang={lang === "ar" ? "en" : "ar"}>
              <TranslateIcon />
              <span className={s.headerLinkText}>{t.switchLabel}</span>
            </a>
            <a className={s.headerLink} href="/login">
              <UserIcon />
              <span className={s.headerLinkText}>{t.login}</span>
            </a>
          </nav>
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

function MenuIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

/** The "translate" glyph next to the language switch: an "文" box and an "A" box overlapping. */
function TranslateIcon() {
  return (
    <svg {...iconProps}>
      <rect x="2.5" y="2.5" width="11" height="11" rx="2" />
      <rect x="10.5" y="10.5" width="11" height="11" rx="2" fill="#fff" />
      <path d="M5 6h6M8 5v1M10 6c-.5 2-2 3.5-4 4.5M6.5 7.5c.8 1.3 2 2.3 3.5 3" />
      <path d="M13.5 19l2.5-6 2.5 6M14.4 17h3.2" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-3.9 3.6-6.5 8-6.5s8 2.6 8 6.5Z" />
    </svg>
  );
}
