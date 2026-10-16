"use client";

/* eslint-disable @next/next/no-img-element -- uploaded pictures come from storage URLs; no next/image config needed */
import { useRef } from "react";
import s from "./RecordPage.module.css";

/**
 * One barrier picture on the record page, shown as a file field (check mark, file
 * name, eye icon). Clicking it opens the picture in a pop-up; Esc, the close button
 * or a click outside the picture closes it.
 */
export function PhotoField({
  label,
  fileName,
  url,
  viewLabel,
  closeLabel,
}: {
  label: string;
  fileName: string;
  url: string;
  viewLabel: string;
  closeLabel: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <div className={s.photo}>
      <span className={s.photoLabel}>{label}</span>
      <button type="button" className={s.photoField} onClick={() => dialog.current?.showModal()} aria-label={`${viewLabel}: ${label}`}>
        <CheckIcon />
        <bdi className={s.photoFileName} dir="ltr">
          {fileName}
        </bdi>
        <EyeIcon />
      </button>

      <dialog
        ref={dialog}
        className={s.photoDialog}
        aria-label={label}
        // A click on the backdrop lands on the <dialog> itself, not on its content.
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      >
        <div className={s.photoDialogBody}>
          <div className={s.photoDialogHeader}>
            <strong>{label}</strong>
            <button type="button" className={s.photoDialogClose} onClick={() => dialog.current?.close()} aria-label={closeLabel}>
              <CloseIcon />
            </button>
          </div>
          <img className={s.photoDialogImage} src={url} alt={label} loading="lazy" />
        </div>
      </dialog>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className={s.photoCheck} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path d="m7 12.5 3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className={s.photoEye} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
