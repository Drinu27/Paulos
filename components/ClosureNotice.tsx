"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

/**
 * A one-off "we're closed on this date" popup shown once when a visitor arrives.
 * Keep this in sync with CLOSED_DATES in BookingFlow.tsx.
 *
 * SHOW_UNTIL is the last moment the notice appears — once it's passed, the popup
 * never shows again, so the message can't go stale after the closure is over.
 * To retire it sooner, just delete <ClosureNotice /> from app/layout.tsx.
 */
const STORAGE_KEY = "paulos-closure-2026-09-feast";
const SHOW_UNTIL = new Date(2026, 8, 15, 23, 59, 59); // Tue 15 Sep 2026 — last day closed (month is 0-based)

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
          Closed this week
          <br />
          for the village feast
        </h3>

        <p className="notice-body">
          It&rsquo;s the village feast of Saint Paul, so we&rsquo;re closed this week. We&rsquo;ll
          resume our usual hours, Wednesday through Sunday, from Wednesday 16 September. Thank you.
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
