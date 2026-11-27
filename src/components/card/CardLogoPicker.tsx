"use client";

/* eslint-disable @next/next/no-img-element -- small static logo thumbnails */
import { COMPANY, type CardSmallLogoKey } from "@/config/company";
import { useLanguage, type TranslationKey } from "@/i18n/LanguageProvider";

const OPTIONS: { key: CardSmallLogoKey; labelKey: TranslationKey }[] = [
  { key: "saso", labelKey: "preview.logoOld" },
  { key: "workshop", labelKey: "preview.logoNew" },
];

/** Visual toggle for choosing which small logo appears above the VIN box in the PDF card. */
export function CardLogoPicker({
  value,
  onChange,
  compact = false,
}: {
  value: CardSmallLogoKey;
  onChange: (value: CardSmallLogoKey) => void;
  compact?: boolean;
}) {
  const { t } = useLanguage();

  return (
    <div className={compact ? "flex flex-wrap items-center gap-2" : "space-y-1.5"} role="radiogroup" aria-label={t("preview.pdfLogo")}>
      <span className={compact ? "text-xs font-semibold text-slate-600" : "block text-sm font-semibold text-slate-700"}>
        {t("preview.pdfLogo")}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {OPTIONS.map(({ key, labelKey }) => {
          const selected = value === key;
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(key)}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                selected
                  ? "border-brand bg-brand/5 text-brand ring-2 ring-brand/20"
                  : "border-slate-300 bg-white text-slate-700 hover:border-brand/60"
              }`}
            >
              <img
                src={COMPANY.card_small_logos[key]}
                alt=""
                aria-hidden="true"
                className="h-6 w-6 shrink-0 object-contain"
              />
              <span>{t(labelKey)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
