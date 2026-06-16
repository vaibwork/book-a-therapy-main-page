import { Heart, UserCheck, Building2, ArrowRight } from "lucide-react";

// Minimal "Who are you?" entry. Each card links to /patient, /practitioner or
// /clinic — the inline script in index.html instantly redirects those paths to
// the real portal URLs (from the VITE_* env), so there is no extra page.
const ROLES = [
  {
    label: "I'm a Patient",
    desc: "Find therapists, book sessions and manage your care.",
    href: "/patient",
    Icon: Heart,
    accent: "#16a34a",
  },
  {
    label: "I'm a Practitioner",
    desc: "Manage appointments, clinical notes and your profile.",
    href: "/practitioner",
    Icon: UserCheck,
    accent: "#2563eb",
  },
  {
    label: "I'm a Clinic",
    desc: "Run your clinic, your team and all bookings.",
    href: "/clinic",
    Icon: Building2,
    accent: "#0891b2",
  },
];

export default function WhoAreYou() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "'Manrope', sans-serif",
        background: "#f7f8fb",
        color: "#252F4F",
        textAlign: "center",
      }}
    >
      <style>{`
        .wru-card { transition: transform .15s ease, box-shadow .15s ease; }
        .wru-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(37,47,79,.16); }
        .wru-card:active { transform: translateY(-1px); }
      `}</style>

      <div style={{ fontWeight: 800, letterSpacing: ".02em", fontSize: "1.05rem", marginBottom: "6px" }}>
        BookaTherapy
      </div>
      <h1 style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 800, margin: "0 0 6px" }}>
        Who are you?
      </h1>
      <p style={{ margin: "0 0 28px", color: "#5b6478", fontSize: "1rem" }}>
        Choose your portal to continue.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          width: "100%",
          maxWidth: "880px",
          justifyContent: "center",
        }}
      >
        {ROLES.map(({ label, desc, href, Icon, accent }) => (
          <a
            key={href}
            href={href}
            className="wru-card"
            style={{
              flex: "1 1 240px",
              maxWidth: "280px",
              minWidth: "220px",
              background: "#fff",
              borderRadius: "18px",
              padding: "22px",
              textDecoration: "none",
              color: "inherit",
              border: "1px solid #eceef3",
              boxShadow: "0 6px 20px rgba(37,47,79,.06)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              textAlign: "left",
            }}
          >
            <span
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `${accent}1a`,
                color: accent,
              }}
            >
              <Icon size={26} />
            </span>
            <span style={{ fontSize: "1.15rem", fontWeight: 700 }}>{label}</span>
            <span style={{ color: "#5b6478", fontSize: ".92rem", lineHeight: 1.45, flex: 1 }}>
              {desc}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: accent, fontWeight: 700, fontSize: ".9rem" }}>
              Continue <ArrowRight size={16} />
            </span>
          </a>
        ))}
      </div>
    </main>
  );
}
