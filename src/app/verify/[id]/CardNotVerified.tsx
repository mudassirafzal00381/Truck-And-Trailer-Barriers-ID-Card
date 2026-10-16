import { RECORD_TEXT, RecordShell, type RecordLang } from "./RecordShell";
import s from "./RecordPage.module.css";

/** Unknown card id: the same page frame with a red "Not verified" summary panel. */
export function CardNotVerified({ lang }: { lang: RecordLang }) {
  const t = RECORD_TEXT[lang];
  return (
    <RecordShell lang={lang}>
      <section role="alert" className={s.panel}>
        <span className={`${s.badge} ${s.badgeDanger}`}>{t.notVerified}</span>
        <h1 className={s.alertTitle}>{t.notVerifiedTitle}</h1>
        <p className={s.alertText}>{t.notVerifiedDesc}</p>
      </section>
    </RecordShell>
  );
}
