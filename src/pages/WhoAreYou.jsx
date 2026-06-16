import { motion } from "framer-motion";
import { Heart, UserCheck, Building2, ArrowRight } from "lucide-react";
import logo from "../assets/logo.jpg";

// Each card links to /patient, /practitioner or /clinic — the inline script in
// index.html instantly redirects those paths to the live portals.
const ROLES = [
  {
    id: "patient",
    label: "I'm a Patient",
    desc: "Find therapists, book sessions and manage your care.",
    href: "/patient",
    Icon: Heart,
    accent: "var(--accent)",
    glow: "rgba(152, 196, 84, 0.35)",
    tint: "rgba(152, 196, 84, 0.12)",
  },
  {
    id: "practitioner",
    label: "I'm a Practitioner",
    desc: "Manage appointments, clinical notes and your profile.",
    href: "/practitioner",
    Icon: UserCheck,
    accent: "var(--navy)",
    glow: "rgba(37, 47, 79, 0.28)",
    tint: "rgba(37, 47, 79, 0.10)",
  },
  {
    id: "clinic",
    label: "I'm a Clinic",
    desc: "Run your clinic, your team and all your bookings.",
    href: "/clinic",
    Icon: Building2,
    accent: "var(--teal)",
    glow: "rgba(67, 130, 158, 0.3)",
    tint: "rgba(67, 130, 158, 0.12)",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 110, damping: 16 },
  },
};

export default function WhoAreYou() {
  return (
    <main className="wru-root">
      <style>{CSS}</style>

      {/* Animated brand-coloured background blobs */}
      <motion.div
        className="wru-blob wru-blob--green"
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.12, 0.95, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="wru-blob wru-blob--navy"
        animate={{ x: [0, -50, 25, 0], y: [0, 30, -25, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="wru-blob wru-blob--teal"
        animate={{ x: [0, 30, -30, 0], y: [0, -20, 25, 0], scale: [1, 1.08, 0.92, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="wru-content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Logo */}
        <motion.div
          variants={fadeUp}
          className="wru-logo-chip"
          whileHover={{ y: -3 }}
        >
          <img
            src={logo}
            alt="BookaTherapy — Match. Relax. Thrive."
            className="wru-logo"
          />
        </motion.div>

        <motion.h1 variants={fadeUp} className="wru-title">
          Who are you?
        </motion.h1>
        <motion.p variants={fadeUp} className="wru-sub">
          Choose your portal to continue.
        </motion.p>

        <motion.div className="wru-grid" variants={container}>
          {ROLES.map(({ id, label, desc, href, Icon, accent, glow, tint }) => (
            <motion.a
              key={id}
              href={href}
              className="wru-card"
              variants={fadeUp}
              whileHover={{ y: -8, boxShadow: `0 26px 52px ${glow}` }}
              whileTap={{ scale: 0.985 }}
              style={{ "--card-accent": accent, "--card-tint": tint }}
            >
              <span className="wru-card-bar" />
              <span className="wru-card-icon">
                <Icon size={26} strokeWidth={2.2} />
              </span>
              <span className="wru-card-title">{label}</span>
              <span className="wru-card-desc">{desc}</span>
              <span className="wru-card-cta">
                Continue <ArrowRight size={17} />
              </span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="wru-foot">
          Secure portal access · BookaTherapy
        </motion.div>
      </motion.div>
    </main>
  );
}

const CSS = `
  .wru-root {
    position: relative;
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 28px 20px;
    overflow: hidden;
    font-family: 'Manrope', sans-serif;
    background:
      radial-gradient(1100px 600px at 50% -10%, var(--accent-light), transparent 60%),
      var(--bg-primary);
  }
  .wru-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(70px);
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
  }
  .wru-blob--green { width: 420px; height: 420px; background: var(--accent); top: -80px; left: -60px; }
  .wru-blob--navy  { width: 380px; height: 380px; background: var(--navy);  bottom: -90px; right: -40px; opacity: 0.28; }
  .wru-blob--teal  { width: 300px; height: 300px; background: var(--teal);  bottom: 10%; left: 8%; opacity: 0.3; }

  .wru-content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 920px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .wru-logo-chip {
    background: #ffffff;
    padding: 16px 30px;
    border-radius: 20px;
    box-shadow: var(--shadow-md);
    display: inline-flex;
  }
  .wru-logo {
    width: clamp(210px, 42vw, 320px);
    height: auto;
    display: block;
    user-select: none;
    -webkit-user-drag: none;
  }

  .wru-title {
    margin-top: 34px;
    font-size: clamp(1.9rem, 5.5vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--text-primary);
  }
  .wru-sub {
    margin-top: 10px;
    font-size: 1.05rem;
    color: var(--text-muted);
  }

  .wru-grid {
    margin-top: 38px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }
  @media (max-width: 720px) { .wru-grid { grid-template-columns: 1fr; max-width: 380px; margin-inline: auto; } }

  .wru-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 26px 22px 22px;
    border-radius: 20px;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-card);
    text-decoration: none;
    text-align: left;
    overflow: hidden;
    transition: border-color 0.2s ease;
  }
  .wru-card:hover { border-color: var(--card-accent); }
  .wru-card-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: var(--card-accent);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s ease;
  }
  .wru-card:hover .wru-card-bar { transform: scaleX(1); }

  .wru-card-icon {
    width: 52px; height: 52px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    background: var(--card-tint); color: var(--card-accent);
    transition: transform 0.25s ease;
  }
  .wru-card:hover .wru-card-icon { transform: scale(1.08) rotate(-4deg); }

  .wru-card-title { font-size: 1.18rem; font-weight: 700; color: var(--text-primary); }
  .wru-card-desc { font-size: 0.92rem; line-height: 1.5; color: var(--text-muted); flex: 1; }
  .wru-card-cta {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 0.9rem; font-weight: 700; color: var(--card-accent);
  }
  .wru-card-cta svg { transition: transform 0.25s ease; }
  .wru-card:hover .wru-card-cta svg { transform: translateX(5px); }

  .wru-foot {
    margin-top: 34px;
    font-size: 0.8rem;
    letter-spacing: 0.04em;
    color: var(--text-muted);
  }

  @media (prefers-reduced-motion: reduce) {
    .wru-blob { animation: none !important; }
  }
`;
