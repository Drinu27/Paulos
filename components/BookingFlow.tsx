"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/BrandIcons";

const STEP_LABELS = ["Party", "Date & Time", "Details", "Send"];
const OCCASIONS = ["Dinner", "Birthday", "Anniversary", "Date night", "Business"];
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const PHONE = "+356 2156 9191";
const PHONE_HREF = "tel:+35621569191";

/** Reservations are sent here as a WhatsApp message. Digits only, no plus. */
const WHATSAPP_NUMBER = "35679558773";

/**
 * Real opening hours, by weekday. Closed Monday and Tuesday.
 * Each window is [firstSitting, lastSitting] in 24h minutes.
 */
const SERVICE_WINDOWS: Record<number, [string, string][]> = {
  0: [["09:00", "12:30"], ["17:30", "21:30"]], // Sunday — lunch and dinner
  3: [["18:30", "21:30"]], // Wednesday
  4: [["18:30", "21:30"]], // Thursday
  5: [["17:30", "21:30"]], // Friday
  6: [["17:30", "21:30"]], // Saturday
};

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function toLabel(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Every half-hour sitting the kitchen actually serves on that weekday. */
function sittingsFor(weekday: number) {
  const windows = SERVICE_WINDOWS[weekday] ?? [];
  const out: string[] = [];
  for (const [open, last] of windows) {
    for (let t = toMinutes(open); t <= toMinutes(last); t += 30) out.push(toLabel(t));
  }
  return out;
}

type BookingDate = {
  dow: string;
  dnum: number;
  mon: string;
  full: string;
  key: string;
  weekday: number;
  year: number;
};

/** The next 18 days the restaurant is open. */
function generateDates(): BookingDate[] {
  const out: BookingDate[] = [];
  const cursor = new Date();
  while (out.length < 18) {
    cursor.setDate(cursor.getDate() + 1);
    const weekday = cursor.getDay();
    if (!SERVICE_WINDOWS[weekday]) continue; // closed Mon & Tue
    out.push({
      dow: DOW[weekday],
      dnum: cursor.getDate(),
      mon: MON[cursor.getMonth()],
      full: `${DOW[weekday]} ${cursor.getDate()} ${MON[cursor.getMonth()]}`,
      key: `${cursor.getFullYear()}-${cursor.getMonth()}-${cursor.getDate()}`,
      weekday,
      year: cursor.getFullYear(),
    });
  }
  return out;
}

function Steps({ step }: { step: number }) {
  return (
    <div className="steps">
      {STEP_LABELS.map((label, i) => (
        <div key={label} style={{ display: "contents" }}>
          {i > 0 && <div className={`step-bar${i <= step ? " done" : ""}`} />}
          <div className={`step${i === step ? " active" : i < step ? " done" : ""}`}>
            <span className="dot">{i < step ? "✓" : i + 1}</span>
            <span className="lab">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BookingFlow() {
  const [step, setStep] = useState(0);
  const [party, setParty] = useState<number | null>(null);
  // Built after mount — "tomorrow" on the server need not match the visitor's clock
  const [dates, setDates] = useState<BookingDate[]>([]);
  const [dateIdx, setDateIdx] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    occasion: "Dinner",
    notes: "",
  });
  const [errors, setErrors] = useState<{ name?: string }>({});

  // Braces matter: an arrow shorthand would return whatever the call returns,
  // and React treats an effect's return value as a cleanup function.
  useEffect(() => {
    setDates(generateDates());
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const set = <K extends keyof typeof details>(key: K, value: (typeof details)[K]) =>
    setDetails((prev) => ({ ...prev, [key]: value }));

  const chosenDate = dateIdx != null ? dates[dateIdx] : null;
  const sittings = chosenDate ? sittingsFor(chosenDate.weekday) : [];

  const partyLabel = party ? (party === 9 ? "9+ guests" : `${party} guest${party === 1 ? "" : "s"}`) : null;

  function validateDetails() {
    const next: typeof errors = {};
    if (!details.name.trim()) next.name = "Tell us who the table is for.";
    // Phone stays optional — WhatsApp already shows the restaurant who is writing
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function next() {
    if (step === 2 && !validateDetails()) return;
    setStep((s) => Math.min(s + 1, 3));
  }

  /**
   * The reservation as a WhatsApp message. Plain lines, no column padding —
   * WhatsApp renders in a proportional font, so padded columns would not line up.
   */
  function whatsappHref() {
    const lines = [
      "Hi Paulos, I'd like to book a table.",
      "",
      `Name: ${details.name.trim()}`,
      `Party: ${partyLabel}`,
      `Date: ${chosenDate?.full} ${chosenDate?.year}`,
      `Time: ${time}`,
      `Occasion: ${details.occasion}`,
    ];
    if (details.notes.trim()) lines.push(`Notes: ${details.notes.trim()}`);
    if (details.phone.trim()) lines.push(`Phone: ${details.phone.trim()}`);
    lines.push("", "Sent from the Paulos website");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  return (
    <div className="booking-shell">
      {/* ---- Running summary ---- */}
      <aside className="booking-aside">
        <Image
          src="/images/logo.png"
          alt="Paulos"
          width={480}
          height={251}
          className="brand-logo"
        />
        <div>
          <div className="eyebrow eyebrow--gold" style={{ marginBottom: 18 }}>
            Your reservation
          </div>
          <div className="res-ticket">
            <div className="res-line">
              <span className="k">Party</span>
              <span className={`v${partyLabel ? " set" : ""}`}>{partyLabel ?? "—"}</span>
            </div>
            <div className="res-line">
              <span className="k">Date</span>
              <span className={`v${chosenDate ? " set" : ""}`}>{chosenDate?.full ?? "—"}</span>
            </div>
            <div className="res-line">
              <span className="k">Time</span>
              <span className={`v${time ? " set" : ""}`}>{time ?? "—"}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ---- Steps ---- */}
      <div className="booking-main">
        <Steps step={step} />

        {step === 0 && (
          <div className="step-body">
            <div className="eyebrow eyebrow--gold" style={{ marginBottom: 14 }}>
              Step one
            </div>
            <h2>
              How many
              <br />
              in your party?
            </h2>
            <p className="sub">
              Choose your group size. Tables seat up to eight — for larger groups, give us a
              call on {PHONE}.
            </p>
            <div className="choice-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <button
                  key={n}
                  className={`choice${party === n ? " sel" : ""}`}
                  onClick={() => setParty(n)}
                  aria-pressed={party === n}
                >
                  {n === 9 ? "9+" : n}
                </button>
              ))}
            </div>
            <div className="step-actions">
              <Link className="text-link" href="/" style={{ borderColor: "transparent", color: "var(--text-muted)" }}>
                Cancel
              </Link>
              <button className="btn btn--gold btn--lg" disabled={!party} onClick={next}>
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="step-body">
            <div className="eyebrow eyebrow--gold" style={{ marginBottom: 14 }}>
              Step two
            </div>
            <h2>Pick a night</h2>
            <p className="sub">
              We open Wednesday through Sunday. Closed Monday and Tuesday.
            </p>

            <div className="date-row">
              {dates.map((d, i) => (
                <button
                  key={d.key}
                  className={`date-chip${dateIdx === i ? " sel" : ""}`}
                  onClick={() => {
                    setDateIdx(i);
                    setTime(null);
                  }}
                  aria-pressed={dateIdx === i}
                >
                  <span className="dow">{d.dow}</span>
                  <span className="dnum">{d.dnum}</span>
                  <span className="mon">{d.mon}</span>
                </button>
              ))}
            </div>

            <div style={{ marginTop: 36 }}>
              <div className="micro" style={{ color: "var(--white)", marginBottom: 16 }}>
                {chosenDate ? `Sittings · ${chosenDate.full}` : "Select a date to see sittings"}
              </div>
              <div className="choice-grid choice-grid--time">
                {(sittings.length ? sittings : ["—"]).map((t, i) => (
                  <button
                    key={`${t}-${i}`}
                    className={`choice time${time === t ? " sel" : ""}`}
                    disabled={!chosenDate}
                    onClick={() => setTime(t)}
                    aria-pressed={time === t}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="step-actions">
              <button className="btn btn--ghost btn--lg" onClick={() => setStep(0)}>
                Back
              </button>
              <button
                className="btn btn--gold btn--lg"
                disabled={!chosenDate || !time}
                onClick={next}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-body">
            <div className="eyebrow eyebrow--gold" style={{ marginBottom: 14 }}>
              Step three
            </div>
            <h2>Your details</h2>
            <p className="sub">So we know who to expect.</p>

            <div className="stack gap-24">
              <div className="field-grid">
                <div>
                  <div className="field">
                    <label htmlFor="bk-name">Full name</label>
                    <input
                      id="bk-name"
                      value={details.name}
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      onChange={(e) => set("name", e.target.value)}
                    />
                  </div>
                  {errors.name && <div className="seg-error">{errors.name}</div>}
                </div>
                <div>
                  <div className="field">
                    <label htmlFor="bk-phone">Phone (optional)</label>
                    <input
                      id="bk-phone"
                      type="tel"
                      value={details.phone}
                      placeholder="+356 0000 0000"
                      onChange={(e) => set("phone", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="micro" style={{ color: "var(--text-muted)", marginBottom: 12 }}>
                  Occasion
                </div>
                <div className="row gap-8">
                  {OCCASIONS.map((o) => (
                    <button
                      key={o}
                      className={`pds-tag${details.occasion === o ? " selected" : ""}`}
                      onClick={() => set("occasion", o)}
                      aria-pressed={details.occasion === o}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <label htmlFor="bk-notes">Anything we should know? (optional)</label>
                <input
                  id="bk-notes"
                  value={details.notes}
                  placeholder="Allergies, high chair, a quiet corner…"
                  onChange={(e) => set("notes", e.target.value)}
                />
              </div>

            </div>

            <div className="step-actions">
              <button className="btn btn--ghost btn--lg" onClick={() => setStep(1)}>
                Back
              </button>
              <button className="btn btn--gold btn--lg" onClick={next}>
                Review and send
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-body">
            <div className="eyebrow eyebrow--gold" style={{ marginBottom: 14 }}>
              Last step
            </div>
            <h2>
              Send it
              <br />
              to Paulos
            </h2>
            <p className="sub">
              Everything below is already written out. Tap send in WhatsApp and we&rsquo;ll
              reply to confirm your table — usually the same day.
            </p>

            <a
              className="btn btn--gold btn--lg btn--icon"
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              style={{ alignSelf: "flex-start" }}
            >
              <WhatsAppIcon />
              Send on WhatsApp
            </a>

            <div style={{ width: "100%", maxWidth: 460, marginTop: 36 }}>
              <div className="res-ticket" style={{ borderTop: "1px solid var(--border-hairline)" }}>
                <div className="res-line">
                  <span className="k">Name</span>
                  <span className="v set">{details.name}</span>
                </div>
                <div className="res-line">
                  <span className="k">Party</span>
                  <span className="v set">{partyLabel}</span>
                </div>
                <div className="res-line">
                  <span className="k">Date</span>
                  <span className="v set">{chosenDate?.full}</span>
                </div>
                <div className="res-line">
                  <span className="k">Time</span>
                  <span className="v set">{time}</span>
                </div>
                <div className="res-line">
                  <span className="k">Occasion</span>
                  <span className="v set">{details.occasion}</span>
                </div>
                {details.notes && (
                  <div className="res-line">
                    <span className="k">Notes</span>
                    <span className="v set" style={{ textTransform: "none" }}>
                      {details.notes}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <p className="micro" style={{ color: "var(--text-muted)", marginTop: 28 }}>
              Nothing is held until we reply. Would rather talk to someone?
            </p>

            <div className="row gap-16" style={{ marginTop: 16 }}>
              <a className="btn btn--ghost btn--lg" href={PHONE_HREF}>
                Call {PHONE}
              </a>
              <button className="btn btn--ghost btn--lg" onClick={() => setStep(2)}>
                Change details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
