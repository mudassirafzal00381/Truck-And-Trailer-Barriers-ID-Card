"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { RECORD_TEXT, RecordShell, recordLang } from "./RecordShell";
import s from "./RecordPage.module.css";

/**
 * Shown when the lookup itself fails (e.g. database unreachable). Deliberately
 * neutral — an outage must never make a genuine card look fake.
 */
export default function VerifyError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const lang = recordLang(useSearchParams().get("lang"));
  const t = RECORD_TEXT[lang];

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <RecordShell lang={lang}>
      <section role="alert" className={s.panel}>
        <span className={`${s.badge} ${s.badgeWarning}`}>{t.unavailable}</span>
        <h1 className={s.alertTitle}>{t.errorTitle}</h1>
        <p className={s.alertText}>{t.errorDesc}</p>
        <button type="button" onClick={reset} className={s.button}>
          {t.retry}
        </button>
      </section>
    </RecordShell>
  );
}
