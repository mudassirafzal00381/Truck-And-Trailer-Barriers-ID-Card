import { createHash } from "node:crypto";
import { COMPANY } from "@/config/company";
import { barrierPhoto, photoKindsFor } from "@/lib/barrier-photos";
import { formatDisplayDate, type PublicCard } from "@/lib/cards";
import { formatUnderRunNumberForDisplay } from "@/lib/under-run-number";
import { PhotoField } from "./PhotoField";
import { Item, RECORD_TEXT, RecordShell, type RecordLang } from "./RecordShell";
import s from "./RecordPage.module.css";

/**
 * File name shown for a picture, e.g. "f16ad42a739c4dd08023.jpg": stored files are all
 * called front/side/rear, so the name is a short hash of the URL (stable per picture).
 */
function photoFileName(url: string): string {
  const ext = url.startsWith("data:")
    ? (url.match(/^data:image\/(\w+)/)?.[1] ?? "jpg").replace("jpeg", "jpg")
    : (url.split(/[?#]/)[0].match(/\.(\w+)$/)?.[1] ?? "jpg");
  return `${createHash("sha1").update(url).digest("hex").slice(0, 20)}.${ext}`;
}

/**
 * Public record page for a genuine card: a summary panel (card number, company,
 * issue date, Valid badge) and a "Card Data" panel with the vehicle and barrier details.
 */
export function VerifyView({ card, lang }: { card: PublicCard; lang: RecordLang }) {
  const t = RECORD_TEXT[lang];
  const address = lang === "ar" ? COMPANY.record_page.address_ar : COMPANY.record_page.address_en;
  const barrierNo = formatUnderRunNumberForDisplay(card.under_run_number_prefix, card.upd_type, card.under_run_number_suffix);
  const deviceTypes = card.upd_type
    .split("/")
    .map((letter) => t.deviceTypes[letter])
    .filter(Boolean)
    .join(t.listJoin);
  // One picture per selected barrier: the uploaded one, else the default (front has none).
  const photos = photoKindsFor(card.upd_type).flatMap((kind) => {
    const photo = barrierPhoto(card, kind);
    return photo ? [{ kind, label: t.photos[kind], url: photo.url }] : [];
  });

  return (
    <RecordShell lang={lang}>
      <section className={s.panel}>
        <h1 className={s.cardNumber}>{card.card_number}</h1>
        <p className={s.cardTitle}>{t.cardTitle}</p>
        <div className={s.summaryGrid}>
          <Item label={t.company}>{card.manufacturer_name}</Item>
          <Item label={t.manufacturerCode}>{card.manufacturer_code}</Item>
          {address && <Item label={t.address}>{address}</Item>}
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

        {photos.map(({ kind, label, url }) => (
          <PhotoField key={kind} label={label} fileName={photoFileName(url)} url={url} viewLabel={t.viewPhoto} closeLabel={t.close} />
        ))}
      </section>
    </RecordShell>
  );
}

