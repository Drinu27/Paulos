"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

/**
 * A one-off popup ("no bookings next week, a change is coming") shown once
 * when a visitor arrives.
 * Keep this in sync with CLOSED_DATES in BookingFlow.tsx.
 *
 * SHOW_UNTIL is the last moment the notice appears — once it's passed, the popup
 * never shows again, so the message can't go stale after the closure is over.
 * To retire it sooner, just delete <ClosureNotice /> from app/layout.tsx.
 */
const STORAGE_KEY = "paulos-closure-2026-11-change";
const SHOW_UNTIL = new Date(2026, 10, 8, 23, 59, 59); // Sun 8 Nov 2026 — last day without bookings (month is 0-based)

export default function ClosureNotice() {
  const [open, setOpen] = useState(false);

  // Decide whether to show it, after mount so we can read the visitor's clock.
  useEffect(() => {
    if (new Date() > SHOW_UNTIL) return; // closure is over — never show
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return; // already dismissed this visit
    } catch {
      /* private mode can block storage — showing it is harmless */
    }
    const t = window.setTimeout(() => setOpen(true), 450); // let the page settle first
    return () => window.clearTimeout(t);
  }, []);

  // While open: lock background scroll and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  function close() {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore — see note above */
    }
  }

  if (!open) return null;

  return (
    <div
      className="notice-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notice-title"
      onClick={close}
    >
      {/* stopPropagation so clicks inside the card don't close it */}
      <div className="notice-card" onClick={(e) => e.stopPropagation()}>
        <button className="notice-close" aria-label="Close" onClick={close}>
          <X />
        </button>

        <div className="eyebrow eyebrow--gold" style={{ marginBottom: 20 }}>
          A quick note
        </div>

        <h3 id="notice-title" className="notice-title">
          No bookings
          <br />
          next week
        </h3>

        <p className="notice-body" style={{ marginBottom: 14 }}>
          A change is coming, so we&rsquo;re not taking table bookings next week, Wednesday 4
          to Sunday 8 November. You can still book for today. Thank you.
        </p>

        <p className="notice-body" style={{ color: "var(--gold)", fontStyle: "italic" }}>
          Watch this space.
        </p>

        <button
          className="btn btn--gold btn--lg"
          onClick={close}
          style={{ alignSelf: "flex-start" }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
