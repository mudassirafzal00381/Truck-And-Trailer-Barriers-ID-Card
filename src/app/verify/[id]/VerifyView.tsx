import { formatDisplayDate, type PublicCard } from "@/lib/cards";
import { formatUnderRunNumberForDisplay } from "@/lib/under-run-number";
import { CheckIcon, EyeIcon, Item, RECORD_TEXT, RecordShell, type RecordLang } from "./RecordShell";
import s from "./RecordPage.module.css";

/**
 * Public record page for a genuine card: a summary panel (card number, company,
 * issue date, Valid badge) and a "Card Data" panel with the vehicle and barrier details.
 */
export function VerifyView({ card, lang }: { card: PublicCard; lang: RecordLang }) {
  const t = RECORD_TEXT[lang];
  const barrierNo = formatUnderRunNumberForDisplay(card.under_run_number_prefix, card.upd_type, card.under_run_number_suffix);
  const deviceTypes = card.upd_type
    .split("/")
    .map((letter) => t.deviceTypes[letter])
    .filter(Boolean)
    .join(t.listJoin);
  const photos: { label: string; url: string }[] = [];
  if (card.side_photo_url) photos.push({ label: t.sidePhoto, url: card.side_photo_url });
  if (card.rear_photo_url) photos.push({ label: t.rearPhoto, url: card.rear_photo_url });

  return (
    <RecordShell lang={lang}>
      <section className={s.panel}>
        <h1 className={s.cardNumber}>{card.card_number}</h1>
        <p className={s.cardTitle}>{t.cardTitle}</p>
        <div className={s.summaryGrid}>
          <Item label={t.company}>{card.manufacturer_name}</Item>
          <Item label={t.manufacturerCode}>{card.manufacturer_code}</Item>
          <Item label={t.country}>{card.country_of_origin}</Item>
          <Item label={t.issueDate} ltr>
            {formatDisplayDate(card.card_issue_date)}
          </Item>
          <Item label={t.status}>
            <span className={`${s.badge} ${s.badgeValid}`}>{t.valid}</span>
          </Item>
        </div>
      </section>

      <section className={s.panel}>
        <h2 className={s.panelTitle}>{t.cardData}</h2>
        <div className={s.dataGrid}>
          <Item label={t.brand}>{card.vehicle_brand}</Item>
          <Item label={t.deviceType}>{deviceTypes || card.upd_type}</Item>
          <Item label={t.modelYear}>{card.vehicle_model_year}</Item>
          <Item label={t.vin} ltr>
            {card.vehicle_chassis_number}
          </Item>
          <Item label={t.vehicleType}>{card.vehicle_type}</Item>
          <Item label={t.modelName}>{card.vehicle_model_name}</Item>
          <Item label={t.madeOn} ltr>
            {formatDisplayDate(card.date_of_manufacture)}
          </Item>
          {/* The 9-character suffix reads letters + 2-digit year + 4-digit serial, e.g. "MMM264396" → 4396. */}
          <Item label={t.serial} ltr>
            {card.under_run_number_suffix.slice(-4)}
          </Item>
          <Item label={t.uniqueNo} ltr>
            {barrierNo}
          </Item>
        </div>

        {photos.map(({ label, url }) => (
          <div key={label} className={s.photo}>
            <span className={s.photoLabel}>{label}</span>
            <a className={s.photoRow} href={url} target="_blank" rel="noopener noreferrer">
              <span className={s.photoCheck}>
                <CheckIcon />
              </span>
              <span className={s.photoName} dir="ltr">
                {fileName(url)}
              </span>
              <span className={s.photoView} title={t.viewPhoto}>
                <EyeIcon />
                <span className={s.srOnly}>{t.viewPhoto}</span>
              </span>
            </a>
          </div>
        ))}
      </section>
    </RecordShell>
  );
}

/** Last path segment of a picture URL, e.g. ".../side-1a2b.jpg" → "side-1a2b.jpg". */
function fileName(url: string): string {
  return decodeURIComponent(new URL(url, "http://x").pathname.split("/").pop() || url);
}
