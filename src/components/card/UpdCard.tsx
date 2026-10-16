/* eslint-disable @next/next/no-img-element -- plain <img> elements keep the logos exportable to PDF */
import { CARD_TEXT, DEFAULT_TECHNICAL_REFERENCES, DEFAULT_TECHNICAL_REFERENCES_PRINTED } from "@/config/card-template";
import { COMPANY } from "@/config/company";
import { formatDisplayDate, type UpdCard as UpdCardRecord } from "@/lib/cards";
import s from "./UpdCard.module.css";

/**
 * The UPD card — A4 portrait, in the layout of the client's reference PDF, issued
 * in the client's own name (COMPANY): their name and logo in the header, their
 * contact details in the footer.
 *
 * Its text is FIXED bilingual Arabic + English from `CARD_TEXT`. It deliberately
 * does not use the app's Arabic/Urdu `t()` system: the UI language toggle must
 * never change this document.
 */
export type UpdCardData = Pick<
  UpdCardRecord,
  | "card_number"
  | "manufacturer_name"
  | "manufacturer_code"
  | "country_of_origin"
  | "date_of_manufacture"
  | "technical_references"
  | "vehicle_model_name"
  | "vehicle_brand"
  | "vehicle_model_year"
  | "upd_type"
  | "vehicle_chassis_number"
  | "under_run_number_full"
  | "card_issue_date"
>;

type Props = {
  card: UpdCardData;
  /** Inline SVG markup of the QR code (generated server-side from the verification URL). */
  qrSvg: string;
  ref?: React.Ref<HTMLDivElement>;
};

type FieldKey = keyof typeof CARD_TEXT.fields;

/** Grid geometry from the reference PDF (pt): three columns, four rows (outline paths). */
const COLUMN_LEFT = [16, 206.3, 396.7];
const ROWS = [
  { top: 247.5, height: 30.5 },
  { top: 284, height: 30.5 },
  { top: 320.5, height: 41.7 },
  { top: 368.2, height: 64.2 },
];
const VIN_BOXES = 17;
/** Distance between the first and last VIN box lines (17 boxes × 27.2pt). */
const VIN_ROW_WIDTH = 462.4;

function Field({ field, col, row, children }: { field: FieldKey; col: number; row: number; children: React.ReactNode }) {
  const label = CARD_TEXT.fields[field];
  const { top, height } = ROWS[row];
  return (
    // The reference strokes each box's outline centred on these coordinates; the
    // CSS border sits inside the box, so the box is 0.5pt larger on every side.
    <div className={s.field} style={{ left: `${COLUMN_LEFT[col] - 0.5}pt`, top: `${top - 0.5}pt`, height: `${height + 1}pt` }}>
      <div className={s.value}>{children}</div>
      <div className={s.label}>
        <span lang="ar">{label.ar}</span>
        <span>{label.en}</span>
      </div>
    </div>
  );
}

/** "السعودية" (as stored) → "Saudi Arabia / المملكة العربية السعودية", as printed in the reference. */
function countryText(stored: string): string {
  return stored === COMPANY.country_of_origin_ar ? `${COMPANY.country_of_origin_en} / ${CARD_TEXT.country_line.ar}` : stored;
}

/** "S/R" → one line per barrier: "Side Barrier / حاجز جانبي", "Rear Barrier / حاجز خلفي". */
function updTypeLines(updType: string): string[] {
  return updType.split("/").map((letter) => CARD_TEXT.upd_types[letter] ?? letter);
}

export function UpdCard({ card, qrSvg, ref }: Props) {
  const vin = card.vehicle_chassis_number.split("");
  const vinBoxes = Math.max(VIN_BOXES, vin.length);
  const technicalReferences =
    card.technical_references === DEFAULT_TECHNICAL_REFERENCES ? DEFAULT_TECHNICAL_REFERENCES_PRINTED : card.technical_references;
  const footer = COMPANY.card_footer;

  return (
    <div ref={ref} className={s.card} data-upd-card>
      {/* ---------- header band: titles, card number/date, the client's name and logo ---------- */}
      <div className={s.header} aria-hidden>
        {/* soft decorative shapes, placed as in the reference */}
        <i /><i /><i /><i /><i /><i />
      </div>
      <div className={s.titleEn}>
        {CARD_TEXT.title_en.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
      <div lang="ar" className={s.titleAr}>
        {CARD_TEXT.title_ar}
      </div>
      <dl className={s.metaEn}>
        <dt>{CARD_TEXT.card_number.en}</dt>
        <dd>{card.card_number}</dd>
        <dt>{CARD_TEXT.card_issue_date.en}</dt>
        <dd>{formatDisplayDate(card.card_issue_date)}</dd>
      </dl>
      {/* Values in a right-aligned column, labels in a left-aligned one, as in the reference. */}
      <dl className={s.metaAr}>
        <dd>{card.card_number}</dd>
        <dt lang="ar" dir="rtl">
          {CARD_TEXT.card_number.ar}:
        </dt>
        <dd>{formatDisplayDate(card.card_issue_date)}</dd>
        <dt lang="ar" dir="rtl">
          {CARD_TEXT.card_issue_date.ar}:
        </dt>
      </dl>
      {/* The official SASO logo centred in the header band. */}
      <div className={s.brand}>
        <img className={s.brandLogo} src={COMPANY.logo_path} alt="المواصفات السعودية / Saudi Standards" />
      </div>

      {/* ---------- who issued the card ---------- */}
      <div className={s.statement}>
        <p>{CARD_TEXT.issuedBy_en(COMPANY.name_en)}</p>
        <p lang="ar" dir="rtl">
          {CARD_TEXT.issuedBy_ar(COMPANY.name_ar)}
        </p>
      </div>
      <img className={s.smallLogo} src={COMPANY.logo_mark_path} alt="SASO" />
      <img className={s.watermark} src={COMPANY.logo_mark_path} alt="" aria-hidden />

      {/* ---------- VIN, one character per box ---------- */}
      <div className={s.vin}>
        <div className={s.vinBoxes} style={{ "--vin-cell": `${(VIN_ROW_WIDTH / vinBoxes).toFixed(3)}pt` } as React.CSSProperties}>
          {Array.from({ length: vinBoxes }, (_, i) => (
            <div key={i}>{vin[i] ?? ""}</div>
          ))}
        </div>
        <div className={`${s.label} ${s.vinLabel}`}>
          <span lang="ar">{CARD_TEXT.vin.ar}</span>
          <span>{CARD_TEXT.vin.en}</span>
        </div>
      </div>

      {/* ---------- details grid ---------- */}
      <Field field="manufacturer_name" col={0} row={0}>
        {card.manufacturer_name}
      </Field>
      <Field field="manufacturer_code" col={1} row={0}>
        {card.manufacturer_code}
      </Field>
      <Field field="country_of_origin" col={2} row={0}>
        {countryText(card.country_of_origin)}
      </Field>
      <Field field="date_of_manufacture" col={0} row={1}>
        {formatDisplayDate(card.date_of_manufacture)}
      </Field>
      <Field field="vehicle_model_name" col={1} row={1}>
        {card.vehicle_model_name}
      </Field>
      <Field field="vehicle_brand" col={2} row={1}>
        {card.vehicle_brand}
      </Field>
      <Field field="vehicle_model_year" col={0} row={2}>
        {card.vehicle_model_year}
      </Field>
      <Field field="upd_type" col={1} row={2}>
        {updTypeLines(card.upd_type).map((line) => (
          <div key={line}>{line}</div>
        ))}
      </Field>
      <Field field="under_run_number" col={2} row={2}>
        <span dir="ltr">{card.under_run_number_full}</span>
      </Field>
      <Field field="technical_references" col={0} row={3}>
        {technicalReferences}
      </Field>

      <p className={s.validityEn}>{CARD_TEXT.validity_en}</p>
      <p lang="ar" dir="rtl" className={s.validityAr}>
        {CARD_TEXT.validity_ar}
      </p>

      {/* ---------- verification band with the QR code ---------- */}
      <div className={s.verifyBand}>
        <div className={s.verifyEn}>
          {CARD_TEXT.verify_en.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
        <div lang="ar" dir="rtl" className={s.verifyAr}>
          {CARD_TEXT.verify_ar.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      </div>
      <div className={s.qr} dangerouslySetInnerHTML={{ __html: qrSvg }} />

      {/* ---------- issuer line and the client's contact footer ---------- */}
      <div className={s.issuerBand}>
        <span lang="ar" dir="rtl">
          {CARD_TEXT.issuer_label.ar}: {COMPANY.name_ar}
        </span>
        <span>
          {CARD_TEXT.issuer_label.en}: {COMPANY.name_en}
        </span>
      </div>
      <div className={s.contacts}>
        <div>
          <span lang="ar">{CARD_TEXT.country_line.ar}</span>
          <span>{CARD_TEXT.country_line.en}</span>
        </div>
        {(footer.address_ar || footer.address_en) && (
          <div>
            {footer.address_ar && <span lang="ar">{footer.address_ar}</span>}
            {footer.address_en && <span>{footer.address_en}</span>}
          </div>
        )}
        {(footer.phone || footer.fax) && (
          <div dir="ltr">
            {footer.phone && <span>T {footer.phone}</span>}
            {footer.fax && <span>F {footer.fax}</span>}
          </div>
        )}
        {(footer.website || footer.email) && (
          <div className={s.links}>
            {footer.website && <span>{footer.website}</span>}
            {footer.email && <span>{footer.email}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
