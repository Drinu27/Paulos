/**
 * lucide-react v1 dropped third-party brand marks, so the two social icons
 * are inlined here. Same 24x24 grid and stroke treatment as the lucide set.
 */

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function InstagramIcon() {
  return (
    <svg {...base}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon() {
  return (
    <svg {...base}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg {...base}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
      <path d="M9.2 9c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.6 1.4c.1.2 0 .4-.1.5l-.4.5c-.1.2-.2.3-.1.5a5 5 0 0 0 2.4 2.1c.2.1.4 0 .5-.1l.5-.6c.2-.2.3-.2.5-.1l1.4.7c.2.1.4.2.4.4a1.7 1.7 0 0 1-1.2 1.5 3 3 0 0 1-2-.2 8.6 8.6 0 0 1-4.3-4 2.9 2.9 0 0 1-.6-1.8A1.9 1.9 0 0 1 9.2 9z" />
    </svg>
  );
}
