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
    support: "التواصل والدعم",
    faq: "الأسئلة الشائعة",
    terms: "الشروط والأحكام",
    social: "وسائل التواصل الاجتماعي",
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
    support: "Contact & Support",
    faq: "Frequently Asked Questions",
    terms: "Terms & Conditions",
    social: "Social Media",
    switchLabel: "عربي",
    beta: "Beta",
    login: "Login / Register",
  },
} as const;

/** Page frame: the Saudi Standards header with the language switch, the given content, and the green footer. */
export function RecordShell({ lang, children }: { lang: RecordLang; children: React.ReactNode }) {
  const t = RECORD_TEXT[lang];
  const links = COMPANY.record_page;

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
          <div className={s.footerCol}>
            <h2>{t.support}</h2>
            <FooterLink href={links.faq_url}>{t.faq}</FooterLink>
          </div>
          <div className={s.footerCol}>
            <h2>{t.terms}</h2>
            <FooterLink href={links.terms_url}>{t.terms}</FooterLink>
          </div>
          <div className={s.footerCol}>
            <h2>{t.social}</h2>
            <ul className={s.socials}>
              {SOCIALS.map(({ key, label, Icon }) => (
                <li key={key}>
                  <FooterLink href={links.social[key]} className={s.socialButton} label={label}>
                    <Icon />
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

/** A footer link; without an address (not filled in yet in COMPANY.record_page) it is plain text. */
function FooterLink({
  href,
  className,
  label,
  children,
}: {
  href: string;
  className?: string;
  label?: string;
  children: React.ReactNode;
}) {
  if (!href) {
    return (
      <span className={className} aria-label={label} role={label ? "img" : undefined}>
        {children}
      </span>
    );
  }
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </a>
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

const filledIcon = { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;

/** Footer social buttons, in the order shown; each key is a COMPANY.record_page.social address. */
const SOCIALS = [
  {
    key: "x",
    label: "X",
    Icon: () => (
      <svg {...filledIcon}>
        <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.18h1.7L7.4 4.73H5.57l11.1 14.45Z" />
      </svg>
    ),
  },
  {
    key: "facebook",
    label: "Facebook",
    Icon: () => (
      <svg {...filledIcon}>
        <path d="M13.5 22v-8.2h2.75l.41-3.2H13.5V8.56c0-.93.26-1.56 1.59-1.56h1.7V4.14A22.8 22.8 0 0 0 14.32 4C11.87 4 10.2 5.49 10.2 8.23v2.37H7.44v3.2h2.76V22h3.3Z" />
      </svg>
    ),
  },
  {
    key: "youtube",
    label: "YouTube",
    Icon: () => (
      <svg {...filledIcon}>
        <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42a2.5 2.5 0 0 0-1.76 1.77C2 8.76 2 12 2 12s0 3.24.42 4.81a2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77C22 15.24 22 12 22 12s0-3.24-.42-4.81ZM10 15V9l5.2 3-5.2 3Z" />
      </svg>
    ),
  },
  {
    key: "snapchat",
    label: "Snapchat",
    Icon: () => (
      <svg {...filledIcon}>
        <path d="M12.06 2.5c2.9 0 5.07 2.2 5.07 5.13 0 .62-.04 1.32-.1 2.02.32.17.76.1 1.12-.06.5-.22 1.2.06 1.2.6 0 .45-.42.73-1.27 1.06-.47.18-1.1.4-1.04.9.17 1.33 1.92 3.48 3.84 3.86.33.07.5.34.4.63-.2.6-1.38.96-2.68 1.18-.12.28-.16.8-.38.96-.3.2-.95-.06-1.9.08-1.13.17-1.98 1.64-4.26 1.64s-3.07-1.47-4.2-1.64c-.96-.14-1.62.12-1.92-.08-.22-.16-.26-.68-.38-.96-1.3-.22-2.47-.58-2.68-1.18-.1-.29.08-.56.4-.63 1.93-.38 3.68-2.53 3.84-3.86.07-.5-.56-.72-1.03-.9-.86-.33-1.28-.61-1.28-1.06 0-.54.7-.82 1.2-.6.36.16.8.23 1.12.06-.06-.7-.1-1.4-.1-2.02C6.99 4.7 9.16 2.5 12.06 2.5Z" />
      </svg>
    ),
  },
  {
    key: "instagram",
    label: "Instagram",
    Icon: () => (
      <svg {...iconProps} strokeWidth={2}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
] as const;
