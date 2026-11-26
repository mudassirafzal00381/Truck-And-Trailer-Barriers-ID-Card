"use client";

import { useEffect, useRef, useState } from "react";
import s from "./RecordPage.module.css";

type Props = {
  menuLabel: string;
  homeLabel: string;
  homeUrl: string;
  aseLoginLabel: string;
  aseLoginUrl: string;
};

/**
 * Hamburger menu button in the public record header. Clicking it toggles a
 * dropdown containing the Home and Login as ASE external links; clicking
 * outside or pressing Escape closes it.
 */
export function HeaderMenu({ menuLabel, homeLabel, homeUrl, aseLoginLabel, aseLoginUrl }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className={s.menuWrap}>
      <button
        type="button"
        className={s.menuButton}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={menuLabel}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <nav className={s.menuDropdown} role="menu" aria-label={menuLabel}>
          <a
            role="menuitem"
            className={s.menuItem}
            href={homeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            {homeLabel}
          </a>
          <a
            role="menuitem"
            className={s.menuItem}
            href={aseLoginUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            {aseLoginLabel}
          </a>
        </nav>
      )}
    </div>
  );
}
