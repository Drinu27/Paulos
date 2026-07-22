import BookingFlow from "@/components/BookingFlow";

export const metadata = { title: "Reserve — Paulos" };

export default function BookingPage() {
  return (
    <>
      <section className="page-head" style={{ paddingBottom: "clamp(32px, 4vw, 48px)" }}>
        <div className="container">
          <h1 className="display display--lg">Reserve</h1>
          <p className="lede mt-24">
            Three quick steps, then send it straight to us on WhatsApp.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container container--wide">
          <BookingFlow />
        </div>
      </section>
    </>
  );
}
