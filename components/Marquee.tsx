type Props = {
  items: string[];
  /** Scrolls right-to-left by default; reverse sends it the other way. */
  reverse?: boolean;
  muted?: boolean;
};

/** The strip is rendered twice so the loop has no visible seam. */
export default function Marquee({ items, reverse, muted }: Props) {
  const strip = (
    <span className={`marquee-item${muted ? " muted" : ""}`}>
      {items.map((item) => (
        <span key={item}>
          {item} <span className="dot">✦</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className={`marquee${reverse ? " marquee--rev" : ""}`} aria-hidden="true">
      <div className="marquee-track">
        {strip}
        {strip}
      </div>
    </div>
  );
}
