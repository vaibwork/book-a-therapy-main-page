import { useEffect, useMemo, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Heart, UserCheck, Building2, ArrowRight, ArrowLeft, Check, X } from "lucide-react";
import logo from "../assets/logo.jpg";

// Real portal destinations (baked in at build from .env.production). The /patient
// style paths stay as the <a href> fallback so right-click / new-tab still work;
// the actual navigation after the launch animation uses these direct URLs.
// Land each role straight on its action page. Clinic stays on its root for now because
// its /login and /clinic-signups pages currently 504 (time out) in production.
const DEST = {
  patient: `${import.meta.env.VITE_CUSTOMER_URL || ""}/book`,
  practitioner: `${import.meta.env.VITE_PRACTITIONER_URL || ""}/login`,
  clinic: import.meta.env.VITE_CLINIC_URL || "/clinic",
};

const ROLES = [
  {
    id: "patient",
    name: "Patient",
    label: "I'm a Patient",
    desc: "Find therapists, book sessions and manage your care.",
    Icon: Heart,
    accent: "var(--accent)",
    solid: "#98c454",
    glow: "rgba(152, 196, 84, 0.35)",
    tint: "rgba(152, 196, 84, 0.12)",
    onSolid: "#16270a",
    learn: {
      tag: "Find the right massage therapist, fast.",
      points: [
        "Browse trusted, licensed therapists near you",
        "See real availability and book in a few taps",
        "Pay securely online",
        "Manage or reschedule anytime",
      ],
      cta: "Start booking",
    },
  },
  {
    id: "practitioner",
    name: "Practitioner",
    label: "I'm a Practitioner",
    desc: "Manage appointments, clinical notes and your profile.",
    Icon: UserCheck,
    accent: "var(--navy)",
    solid: "#252f4f",
    glow: "rgba(37, 47, 79, 0.28)",
    tint: "rgba(37, 47, 79, 0.10)",
    onSolid: "#ffffff",
    learn: {
      tag: "Grow your practice, less admin.",
      points: [
        "Get discovered by new clients nearby",
        "Manage appointments, schedule and notes in one place",
        "Let clients book you online 24/7",
        "Keep everything organised as you grow",
      ],
      cta: "Practitioner login",
    },
  },
  {
    id: "clinic",
    name: "Clinic",
    label: "I'm a Clinic",
    desc: "Run your clinic, your team and all your bookings.",
    Icon: Building2,
    accent: "var(--teal)",
    solid: "#43829e",
    glow: "rgba(67, 130, 158, 0.3)",
    tint: "rgba(67, 130, 158, 0.12)",
    onSolid: "#ffffff",
    learn: {
      tag: "Run your whole clinic in one place.",
      points: [
        "List your clinic and your team",
        "Manage all bookings and therapists together",
        "Track check-ins and daily schedules",
        "Reach more clients online",
      ],
      cta: "Clinic sign up / login",
    },
  },
];

const PARTICLE_COLORS = ["#98c454", "#252f4f", "#43829e", "#7ea63f"];
const COVER_BASE = 48; // px — base size of the erupting cover circle
const HOLD_MS = 4000; // how long the blast-off screen shows before redirecting
const PORTAL_KEY = "bt_portal"; // remembered role id (localStorage)
const SKIP_KEY = "bt_skip_auto"; // session flag: show the picker instead of auto-launching

const containerVar = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  hide: { transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110, damping: 16 } },
  hide: { opacity: 0, y: -14, transition: { duration: 0.28 } },
};
const cardVar = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110, damping: 16 } },
  // The clicked card implodes at the click point; the others quietly fade away.
  hide: (picked) =>
    picked
      ? { scale: [1, 1.12, 0.15], opacity: [1, 1, 0], transition: { duration: 0.4, ease: "easeIn" } }
      : { opacity: 0, scale: 0.92, y: 10, transition: { duration: 0.28 } },
};

export default function WhoAreYou() {
  const controls = useAnimationControls();
  const [pick, setPick] = useState(null); // { id, name, dest, x, y, solid, scale }
  const [phase, setPhase] = useState("idle"); // idle -> cover -> loading
  const [info, setInfo] = useState(null); // role whose "Learn more" popup is open

  // Remembered portal: if the user picked one before, jump straight to its launch
  // screen on open — unless they stepped back to the picker earlier this session.
  useEffect(() => {
    let saved = null;
    try {
      if (sessionStorage.getItem(SKIP_KEY) !== "1") saved = localStorage.getItem(PORTAL_KEY);
    } catch {
      /* storage blocked */
    }
    const role = saved ? ROLES.find((r) => r.id === saved) : null;
    if (role) {
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 2;
      const scale = (Math.hypot(x, y) * 2) / COVER_BASE + 1.3;
      setPick({ id: role.id, name: role.name, dest: DEST[role.id], x, y, solid: role.solid, scale });
      setPhase("loading");
      controls.set("hide");
    } else {
      controls.start("show");
    }
  }, [controls]);

  // After the cover circle fills the screen, hold the rocket screen briefly, then go.
  useEffect(() => {
    if (phase === "loading" && pick) {
      const t = setTimeout(() => {
        // Mark this session so coming back to the hub shows the picker (no redirect loop).
        try {
          sessionStorage.setItem(SKIP_KEY, "1");
        } catch {
          /* ignore */
        }
        window.location.href = pick.dest;
      }, HOLD_MS);
      return () => clearTimeout(t);
    }
  }, [phase, pick]);

  const launchPortal = (role, x, y) => {
    if (phase !== "idle") return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const px = x ?? vw / 2;
    const py = y ?? vh / 2;
    const far = Math.hypot(Math.max(px, vw - px), Math.max(py, vh - py));
    const scale = (far * 2) / COVER_BASE + 1.3;
    setInfo(null);
    setPick({ id: role.id, name: role.name, dest: DEST[role.id], x: px, y: py, solid: role.solid, scale });
    try {
      localStorage.setItem(PORTAL_KEY, role.id); // remember for next time
    } catch {
      /* ignore */
    }
    setPhase("cover");
    controls.start("hide");
  };

  const handlePick = (e, role) => {
    e.preventDefault();
    launchPortal(role, e.clientX, e.clientY);
  };

  // Close the Learn-more popup on Escape.
  useEffect(() => {
    if (!info) return;
    const onKey = (e) => {
      if (e.key === "Escape") setInfo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [info]);

  // "Back to portals": cancel the redirect, forget the saved choice, show the picker.
  const handleBack = () => {
    try {
      localStorage.removeItem(PORTAL_KEY);
      sessionStorage.setItem(SKIP_KEY, "1");
    } catch {
      /* ignore */
    }
    setPick(null);
    setPhase("idle");
    controls.start("show");
  };

  // Evenly distribute background particles on a jittered grid (no blank patches).
  const particles = useMemo(() => {
    const cols = 6;
    const rows = 6;
    const r = (min, max) => min + Math.random() * (max - min);
    const list = [];
    let i = 0;
    for (let cy = 0; cy < rows; cy++) {
      for (let cx = 0; cx < cols; cx++) {
        const cellW = 100 / cols;
        const cellH = 100 / rows;
        list.push({
          id: i,
          size: Math.round(r(14, 82)),
          left: +(cx * cellW + r(0.12, 0.88) * cellW).toFixed(2),
          top: +(cy * cellH + r(0.12, 0.88) * cellH).toFixed(2),
          color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
          ring: Math.random() > 0.45,
          blur: Math.random() > 0.82,
          opacity: +r(0.2, 0.5).toFixed(2),
          dur: +r(6, 13).toFixed(1),
          delay: +r(0, 4).toFixed(1),
          dx: Math.round(r(36, 100)),
          dy: Math.round(r(34, 90)),
        });
        i++;
      }
    }
    return list;
  }, []);

  // Rising spa bubbles that drift up the whole page.
  const bubbles = useMemo(() => {
    const r = (a, b) => a + Math.random() * (b - a);
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: +r(0, 100).toFixed(2),
      size: Math.round(r(8, 30)),
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      fill: Math.random() > 0.55,
      bo: +r(0.12, 0.34).toFixed(2),
      sway: Math.round(r(-34, 34)),
      dur: +r(9, 18).toFixed(1),
      delay: +(-r(0, 16)).toFixed(1),
    }));
  }, []);

  // Expanding "ripple" rings emanating from a few calm points.
  const ripples = useMemo(() => {
    const r = (a, b) => a + Math.random() * (b - a);
    const spots = [
      { left: 18, top: 28 },
      { left: 84, top: 22 },
      { left: 50, top: 80 },
    ];
    const list = [];
    spots.forEach((s, si) => {
      const color = PARTICLE_COLORS[si % PARTICLE_COLORS.length];
      const size = Math.round(r(240, 360));
      const dur = +r(5, 8).toFixed(1);
      for (let k = 0; k < 2; k++) {
        list.push({ id: `${si}-${k}`, left: s.left, top: s.top, size, color, dur, delay: +(-k * (dur / 2)).toFixed(1) });
      }
    });
    return list;
  }, []);

  // Two slow orbit systems with dots circling an invisible centre.
  const orbits = useMemo(() => {
    const r = (a, b) => a + Math.random() * (b - a);
    return [
      { id: 0, left: 22, top: 66, d: Math.round(r(180, 240)), dur: Math.round(r(26, 34)), rev: false },
      { id: 1, left: 80, top: 38, d: Math.round(r(150, 210)), dur: Math.round(r(30, 40)), rev: true },
    ].map((o) => ({
      ...o,
      dots: Array.from({ length: 4 }, (_, k) => ({
        k,
        angle: Math.round((k / 4) * 360 + r(-12, 12)),
        size: Math.round(r(7, 14)),
        color: PARTICLE_COLORS[k % PARTICLE_COLORS.length],
        op: +r(0.3, 0.6).toFixed(2),
      })),
    }));
  }, []);

  // --- Calm redirect-screen elements (after a portal is chosen) ---
  // Soft, slow-drifting motes for a soothing, spa-like feel.
  const motes = useMemo(() => {
    const r = (a, b) => a + Math.random() * (b - a);
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: +r(0, 100).toFixed(2),
      top: +r(0, 100).toFixed(2),
      size: Math.round(r(5, 16)),
      opacity: +r(0.1, 0.4).toFixed(2),
      dur: +r(8, 16).toFixed(1),
      delay: +(-r(0, 14)).toFixed(1),
      drift: Math.round(r(-22, 22)),
    }));
  }, []);

  // Soft bubbles rising slowly — fills the screen with a calm spa feel.
  const launchBubbles = useMemo(() => {
    const r = (a, b) => a + Math.random() * (b - a);
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: +r(0, 100).toFixed(2),
      size: Math.round(r(14, 72)),
      fill: Math.random() > 0.5,
      opacity: +r(0.08, 0.2).toFixed(2),
      sway: Math.round(r(-28, 28)),
      dur: +r(13, 26).toFixed(1),
      delay: +(-r(0, 24)).toFixed(1),
    }));
  }, []);

  // Large, very faint rings drifting in the background for depth.
  const launchRings = useMemo(() => {
    const r = (a, b) => a + Math.random() * (b - a);
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: +r(5, 92).toFixed(1),
      top: +r(8, 88).toFixed(1),
      size: Math.round(r(120, 280)),
      opacity: +r(0.08, 0.18).toFixed(2),
      dx: Math.round(r(-40, 40)),
      dy: Math.round(r(-30, 30)),
      dur: +r(16, 28).toFixed(1),
      delay: +(-r(0, 16)).toFixed(1),
    }));
  }, []);

  return (
    <main className="wru-root">
      <style>{CSS}</style>

      <div className="wru-bg" aria-hidden="true">
      {/* Ambient brand glow */}
      <motion.div
        className="wru-blob wru-blob--green"
        animate={{ x: [0, 70, -40, 0], y: [0, -50, 40, 0], scale: [1, 1.18, 0.9, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="wru-blob wru-blob--navy"
        animate={{ x: [0, -80, 40, 0], y: [0, 50, -40, 0], scale: [1, 0.85, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="wru-blob wru-blob--teal"
        animate={{ x: [0, 60, -50, 0], y: [0, -40, 45, 0], scale: [1, 1.12, 0.88, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particle circles (evenly distributed) */}
      <div className="wru-particles" aria-hidden="true">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="wru-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              filter: p.blur ? "blur(2px)" : "none",
              ...(p.ring
                ? { border: `${Math.max(1.5, p.size * 0.08)}px solid ${p.color}`, background: "transparent" }
                : { background: p.color }),
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              x: [0, p.dx, -p.dx * 0.7, p.dx * 0.5, 0],
              y: [0, -p.dy, p.dy * 0.6, -p.dy * 0.4, 0],
              scale: [1, 1.3, 0.8, 1.15, 1],
              opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.6, p.opacity * 1.3, p.opacity],
            }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          />
        ))}
      </div>

      {/* Rising spa bubbles */}
      <div className="wru-bubbles" aria-hidden="true">
        {bubbles.map((b) => (
          <span
            key={b.id}
            className="wru-bubble"
            style={{
              left: `${b.left}%`,
              width: b.size,
              height: b.size,
              "--bo": b.bo,
              "--sway": `${b.sway}px`,
              animationDuration: `${b.dur}s`,
              animationDelay: `${b.delay}s`,
              ...(b.fill
                ? { background: b.color }
                : { border: `1.5px solid ${b.color}`, background: "transparent" }),
            }}
          />
        ))}
      </div>

      {/* Expanding ripple rings */}
      <div className="wru-ripples" aria-hidden="true">
        {ripples.map((rp) => (
          <span
            key={rp.id}
            className="wru-ripple"
            style={{
              left: `${rp.left}%`,
              top: `${rp.top}%`,
              width: rp.size,
              height: rp.size,
              borderColor: rp.color,
              animationDuration: `${rp.dur}s`,
              animationDelay: `${rp.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Orbiting dot systems */}
      <div className="wru-orbits" aria-hidden="true">
        {orbits.map((o) => (
          <div
            key={o.id}
            className="wru-orbit"
            style={{
              left: `${o.left}%`,
              top: `${o.top}%`,
              width: o.d,
              height: o.d,
              animationName: o.rev ? "wru-orbit-rev" : "wru-orbit",
              animationDuration: `${o.dur}s`,
            }}
          >
            <span className="wru-orbit-path" />
            {o.dots.map((dt) => (
              <span
                key={dt.k}
                className="wru-orbit-dot"
                style={{
                  width: dt.size,
                  height: dt.size,
                  color: dt.color,
                  opacity: dt.op,
                  transform: `translate(-50%, -50%) rotate(${dt.angle}deg) translateY(-${o.d / 2}px)`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      </div>

      <motion.div
        className="wru-content"
        variants={containerVar}
        initial="hidden"
        animate={controls}
        style={{ pointerEvents: phase === "idle" ? "auto" : "none" }}
      >
        <motion.div variants={item} className="wru-logo-chip" whileHover={{ y: -3 }}>
          <img src={logo} alt="BookaTherapy — Match. Relax. Thrive." className="wru-logo" />
        </motion.div>

        <motion.h1 variants={item} className="wru-title">
          Who are you?
        </motion.h1>
        <motion.p variants={item} className="wru-sub">
          Choose your portal to continue.
        </motion.p>

        <motion.div className="wru-grid" variants={containerVar}>
          {ROLES.map((role) => {
            const { id, label, desc, Icon, accent, glow, tint } = role;
            return (
              <motion.div
                key={id}
                className="wru-card"
                variants={cardVar}
                custom={pick?.id === id}
                whileHover={{ y: -8, boxShadow: `0 26px 52px ${glow}` }}
                style={{ "--card-accent": accent, "--card-tint": tint }}
              >
                <span className="wru-card-bar" />
                <a
                  href={DEST[id]}
                  onClick={(e) => handlePick(e, role)}
                  className="wru-card-hit"
                  aria-label={label}
                >
                  <span className="wru-card-icon">
                    <Icon size={26} strokeWidth={2.2} />
                  </span>
                  <span className="wru-card-title">{label}</span>
                  <span className="wru-card-desc">{desc}</span>
                  <span className="wru-card-cta">
                    Continue <ArrowRight size={17} />
                  </span>
                </a>
                <button type="button" className="wru-learn" onClick={() => setInfo(role)}>
                  Learn more <ArrowRight size={14} />
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={item} className="wru-foot">
          Secure portal access · BookaTherapy
        </motion.div>
      </motion.div>

      {/* Cover circle that erupts from the click point */}
      {pick && phase !== "idle" && (
        <motion.div
          className="wru-cover"
          style={{ left: pick.x, top: pick.y, background: pick.solid }}
          initial={{ scale: 0 }}
          animate={{ scale: pick.scale }}
          transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1], delay: 0.26 }}
          onAnimationComplete={() => setPhase("loading")}
        />
      )}

      {/* Calm redirect screen (shown after a portal is chosen) */}
      {pick && phase === "loading" && (
        <motion.div
          className="wru-launch"
          style={{ "--portal": pick.solid }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button type="button" className="wru-back" onClick={handleBack} aria-label="Back to portals">
            <ArrowLeft size={18} /> Back to portals
          </button>

          {/* soft ambient glows */}
          <div className="wru-launch-glow wru-launch-glow--1" />
          <div className="wru-launch-glow wru-launch-glow--2" />

          {/* large faint drifting rings (depth) */}
          <div className="wru-layer">
            {launchRings.map((rg) => (
              <span
                key={rg.id}
                className="wru-lring"
                style={{
                  left: `${rg.left}%`,
                  top: `${rg.top}%`,
                  width: rg.size,
                  height: rg.size,
                  opacity: rg.opacity,
                  "--dx": `${rg.dx}px`,
                  "--dy": `${rg.dy}px`,
                  animationDuration: `${rg.dur}s`,
                  animationDelay: `${rg.delay}s`,
                }}
              />
            ))}
          </div>

          {/* soft rising bubbles */}
          <div className="wru-layer">
            {launchBubbles.map((b) => (
              <span
                key={b.id}
                className="wru-lbubble"
                style={{
                  left: `${b.left}%`,
                  width: b.size,
                  height: b.size,
                  "--sway": `${b.sway}px`,
                  animationDuration: `${b.dur}s`,
                  animationDelay: `${b.delay}s`,
                  ...(b.fill
                    ? { background: `rgba(255,255,255,${b.opacity})` }
                    : { border: `1.5px solid rgba(255,255,255,${(b.opacity + 0.1).toFixed(2)})`, background: "transparent" }),
                }}
              />
            ))}
          </div>

          {/* slow, soft drifting motes */}
          <div className="wru-layer">
            {motes.map((m) => (
              <span
                key={m.id}
                className="wru-mote"
                style={{
                  left: `${m.left}%`,
                  top: `${m.top}%`,
                  width: m.size,
                  height: m.size,
                  opacity: m.opacity,
                  "--drift": `${m.drift}px`,
                  animationDuration: `${m.dur}s`,
                  animationDelay: `${m.delay}s`,
                }}
              />
            ))}
          </div>

          <motion.div
            className="wru-launch-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {/* breathing logo with slow concentric ripples */}
            <div className="wru-breathe">
              <span className="wru-rippleo wru-rippleo--1" />
              <span className="wru-rippleo wru-rippleo--2" />
              <span className="wru-rippleo wru-rippleo--3" />
              <span className="wru-breathe-aura" />
              <div className="wru-launch-logo">
                <img src={logo} alt="BookaTherapy" />
              </div>
            </div>
            <div className="wru-launch-text">
              Taking you to the <strong>{pick.name}</strong> portal
            </div>
            <div className="wru-launch-hint">Take a breath — almost there</div>
            <div className="wru-progress">
              <motion.div
                className="wru-progress-fill"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: (HOLD_MS - 200) / 1000, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* "Learn more" popup */}
      {info && (
        <motion.div
          className="wru-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setInfo(null)}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="wru-info-card"
            style={{ "--card-accent": info.accent, "--card-tint": info.tint }}
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="wru-info-close" onClick={() => setInfo(null)} aria-label="Close">
              <X size={18} />
            </button>
            <span className="wru-info-icon">
              <info.Icon size={26} strokeWidth={2.2} />
            </span>
            <h2 className="wru-info-title">For {info.name}s</h2>
            <p className="wru-info-tag">{info.learn.tag}</p>
            <ul className="wru-info-list">
              {info.learn.points.map((p) => (
                <li key={p}>
                  <Check size={17} strokeWidth={2.6} /> {p}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="wru-info-cta"
              style={{ background: info.solid, color: info.onSolid }}
              onClick={() => launchPortal(info)}
            >
              {info.learn.cta} <ArrowRight size={17} />
            </button>
          </motion.div>
        </motion.div>
      )}
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
    padding: 40px 20px;
    overflow-x: hidden;
    font-family: 'Manrope', sans-serif;
    background:
      radial-gradient(1100px 600px at 50% -10%, var(--accent-light), transparent 60%),
      var(--bg-primary);
  }

  /* Clips the decorative blobs/particles without trapping the page scroll on mobile */
  .wru-bg { position: absolute; inset: 0; overflow: hidden; z-index: 0; pointer-events: none; }

  .wru-blob { position: absolute; border-radius: 50%; filter: blur(70px); opacity: 0.5; pointer-events: none; z-index: 0; }
  .wru-blob--green { width: 420px; height: 420px; background: var(--accent); top: -80px; left: -60px; }
  .wru-blob--navy  { width: 380px; height: 380px; background: var(--navy);  bottom: -90px; right: -40px; opacity: 0.3; }
  .wru-blob--teal  { width: 300px; height: 300px; background: var(--teal);  bottom: 10%; left: 8%; opacity: 0.32; }

  .wru-particles { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
  .wru-particle { position: absolute; border-radius: 50%; will-change: transform, opacity; }

  .wru-bubbles, .wru-ripples, .wru-orbits { position: absolute; inset: 0; z-index: 0; pointer-events: none; }

  @keyframes wru-rise {
    0% { transform: translate(0, 110vh) scale(0.6); opacity: 0; }
    12% { opacity: var(--bo); }
    50% { transform: translate(var(--sway), 50vh) scale(1); }
    88% { opacity: var(--bo); }
    100% { transform: translate(0, -15vh) scale(1.12); opacity: 0; }
  }
  .wru-bubble { position: absolute; bottom: 0; border-radius: 50%; animation: wru-rise linear infinite; will-change: transform, opacity; }

  @keyframes wru-ripple {
    0% { transform: translate(-50%, -50%) scale(0.15); opacity: 0.5; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
  }
  .wru-ripple { position: absolute; border-radius: 50%; border: 2px solid; transform: translate(-50%, -50%); animation: wru-ripple ease-out infinite; will-change: transform, opacity; }

  @keyframes wru-orbit { from { transform: translate(-50%, -50%) rotate(0); } to { transform: translate(-50%, -50%) rotate(360deg); } }
  @keyframes wru-orbit-rev { from { transform: translate(-50%, -50%) rotate(0); } to { transform: translate(-50%, -50%) rotate(-360deg); } }
  .wru-orbit { position: absolute; transform: translate(-50%, -50%); animation-timing-function: linear; animation-iteration-count: infinite; will-change: transform; }
  .wru-orbit-path { position: absolute; inset: 0; border-radius: 50%; border: 1px dashed rgba(120, 150, 170, 0.16); }
  .wru-orbit-dot { position: absolute; left: 50%; top: 50%; border-radius: 50%; background: currentColor; box-shadow: 0 0 8px currentColor; }

  .wru-content {
    position: relative; z-index: 1; width: 100%; max-width: 920px;
    display: flex; flex-direction: column; align-items: center; text-align: center;
  }

  .wru-logo-chip { background: #ffffff; padding: 16px 30px; border-radius: 20px; box-shadow: var(--shadow-md); display: inline-flex; }
  .wru-logo { width: clamp(180px, 44vw, 320px); height: auto; display: block; user-select: none; -webkit-user-drag: none; }

  .wru-title { margin-top: 34px; font-size: clamp(1.9rem, 5.5vw, 3rem); font-weight: 800; letter-spacing: -0.02em; color: var(--text-primary); }
  .wru-sub { margin-top: 10px; font-size: 1.05rem; color: var(--text-muted); }

  .wru-grid { margin-top: 38px; width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  @media (max-width: 720px) {
    .wru-grid { grid-template-columns: 1fr; max-width: 400px; margin-inline: auto; margin-top: 26px; gap: 14px; }
    .wru-title { margin-top: 24px; }
    .wru-sub { font-size: 1rem; }
    .wru-card { padding: 20px 18px; }
    .wru-foot { margin-top: 24px; }
  }

  .wru-card {
    position: relative; display: flex; flex-direction: column; gap: 12px;
    padding: 26px 22px 22px; border-radius: 20px; background: var(--bg-card);
    border: 1px solid var(--border-color); box-shadow: var(--shadow-card);
    text-decoration: none; text-align: left; overflow: hidden; transition: border-color 0.2s ease;
  }
  .wru-card:hover { border-color: var(--card-accent); }
  .wru-card-bar { position: absolute; top: 0; left: 0; right: 0; height: 4px; background: var(--card-accent); transform: scaleX(0); transform-origin: left; transition: transform 0.3s ease; }
  .wru-card:hover .wru-card-bar { transform: scaleX(1); }
  .wru-card-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; background: var(--card-tint); color: var(--card-accent); transition: transform 0.25s ease; }
  .wru-card:hover .wru-card-icon { transform: scale(1.08) rotate(-4deg); }
  .wru-card-title { font-size: 1.18rem; font-weight: 700; color: var(--text-primary); }
  .wru-card-desc { font-size: 0.92rem; line-height: 1.5; color: var(--text-muted); flex: 1; }
  .wru-card-cta { display: inline-flex; align-items: center; gap: 6px; font-size: 0.9rem; font-weight: 700; color: var(--card-accent); }
  .wru-card-cta svg { transition: transform 0.25s ease; }
  .wru-card:hover .wru-card-cta svg { transform: translateX(5px); }

  .wru-card-hit { display: flex; flex-direction: column; gap: 12px; flex: 1; text-decoration: none; color: inherit; }
  .wru-learn {
    align-self: flex-start; margin-top: 4px;
    display: inline-flex; align-items: center; gap: 4px;
    background: none; border: none; padding: 6px 0;
    font-family: 'Manrope', sans-serif; font-size: 0.85rem; font-weight: 700;
    color: var(--card-accent); cursor: pointer;
    border-bottom: 1.5px solid transparent; transition: border-color 0.2s ease;
  }
  .wru-learn:hover { border-bottom-color: var(--card-accent); }

  /* "Learn more" popup */
  .wru-info {
    position: fixed; inset: 0; z-index: 70; display: flex; align-items: center; justify-content: center;
    padding: 20px; background: rgba(20, 28, 46, 0.55); -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px);
  }
  .wru-info-card {
    position: relative; width: 100%; max-width: 440px; text-align: left;
    background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 22px;
    padding: 30px 26px 26px; box-shadow: 0 30px 70px rgba(0, 0, 0, 0.32);
  }
  .wru-info-close {
    position: absolute; top: 14px; right: 14px; width: 34px; height: 34px; border-radius: 50%;
    border: none; background: var(--bg-secondary); color: var(--text-muted); cursor: pointer;
    display: flex; align-items: center; justify-content: center; transition: color 0.2s ease;
  }
  .wru-info-close:hover { color: var(--text-primary); }
  .wru-info-icon {
    width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center;
    background: var(--card-tint); color: var(--card-accent); margin-bottom: 16px;
  }
  .wru-info-title { font-size: 1.35rem; font-weight: 800; color: var(--text-primary); }
  .wru-info-tag { margin-top: 4px; font-size: 1rem; font-weight: 600; color: var(--card-accent); }
  .wru-info-list { list-style: none; margin: 18px 0 22px; display: flex; flex-direction: column; gap: 11px; }
  .wru-info-list li { display: flex; align-items: flex-start; gap: 9px; font-size: 0.93rem; line-height: 1.45; color: var(--text-secondary); }
  .wru-info-list li svg { color: var(--card-accent); flex-shrink: 0; margin-top: 2px; }
  .wru-info-cta {
    width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px; border-radius: 12px; border: none; cursor: pointer;
    font-family: 'Manrope', sans-serif; font-size: 0.95rem; font-weight: 700;
    transition: transform 0.15s ease, filter 0.2s ease;
  }
  .wru-info-cta:hover { filter: brightness(1.05); transform: translateY(-1px); }

  .wru-foot { margin-top: 34px; font-size: 0.8rem; letter-spacing: 0.04em; color: var(--text-muted); }

  /* Cover circle erupting from the click */
  .wru-cover { position: fixed; width: 48px; height: 48px; border-radius: 50%; transform: translate(-50%, -50%); z-index: 50; pointer-events: none; }

  /* ---------- Calm redirect screen (after a portal is chosen) ---------- */
  .wru-launch {
    position: fixed; inset: 0; z-index: 60; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    background:
      radial-gradient(120% 110% at 50% 28%, rgba(255,255,255,0.28), transparent 55%),
      radial-gradient(120% 120% at 50% 120%, rgba(0,0,0,0.20), transparent 52%),
      var(--portal);
  }
  .wru-layer { position: absolute; inset: 0; pointer-events: none; }
  .wru-back {
    position: absolute; z-index: 6;
    top: max(16px, env(safe-area-inset-top)); left: max(16px, env(safe-area-inset-left));
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 15px 9px 11px; border-radius: 99px;
    border: 1.5px solid rgba(255,255,255,0.55); background: rgba(255,255,255,0.16);
    color: #fff; font-family: 'Manrope', sans-serif; font-size: 0.85rem; font-weight: 700;
    cursor: pointer; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
    transition: background 0.2s ease, transform 0.15s ease;
  }
  .wru-back:hover { background: rgba(255,255,255,0.28); }
  .wru-back:active { transform: scale(0.96); }

  @keyframes wru-soft-pulse { 0%, 100% { transform: scale(0.92); opacity: 0.3; } 50% { transform: scale(1.12); opacity: 0.55; } }
  @keyframes wru-breathe { 0%, 100% { transform: translate(-50%, -50%) scale(0.86); opacity: 0.5; } 50% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.85; } }
  @keyframes wru-rippleo { 0% { transform: translate(-50%, -50%) scale(0.45); opacity: 0; } 16% { opacity: 0.5; } 100% { transform: translate(-50%, -50%) scale(1.85); opacity: 0; } }
  @keyframes wru-mote { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(var(--drift), -22px); } }
  @keyframes wru-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }

  .wru-launch-glow { position: absolute; border-radius: 50%; filter: blur(72px); pointer-events: none; }
  .wru-launch-glow--1 { width: 60vmin; height: 60vmin; left: 8%; top: 12%; background: rgba(255,255,255,0.32); animation: wru-soft-pulse 7s ease-in-out infinite; }
  .wru-launch-glow--2 { width: 50vmin; height: 50vmin; right: 6%; bottom: 10%; background: rgba(255,255,255,0.22); animation: wru-soft-pulse 9s ease-in-out infinite 1.5s; }

  .wru-mote { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.85); box-shadow: 0 0 8px rgba(255,255,255,0.5); animation: wru-mote ease-in-out infinite; will-change: transform; }

  @keyframes wru-lrise {
    0% { transform: translate(0, 12vh) scale(0.9); opacity: 0; }
    14% { opacity: 1; }
    88% { opacity: 1; }
    100% { transform: translate(var(--sway), -108vh) scale(1.06); opacity: 0; }
  }
  .wru-lbubble { position: absolute; bottom: 0; border-radius: 50%; filter: blur(0.4px); animation: wru-lrise linear infinite; will-change: transform, opacity; }

  @keyframes wru-ldrift {
    0%, 100% { transform: translate(-50%, -50%) scale(1); }
    50% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1.12); }
  }
  .wru-lring { position: absolute; border-radius: 50%; border: 1.5px solid #fff; transform: translate(-50%, -50%); animation: wru-ldrift ease-in-out infinite; will-change: transform; }

  .wru-launch-center { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 24px; }
  .wru-breathe { position: relative; display: flex; align-items: center; justify-content: center; width: min(300px, 74vmin); height: min(300px, 74vmin); }
  .wru-breathe-aura { position: absolute; left: 50%; top: 50%; width: min(300px, 74vmin); height: min(300px, 74vmin); border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.6), transparent 62%); filter: blur(8px); animation: wru-breathe 6s ease-in-out infinite both; }
  .wru-rippleo { position: absolute; left: 50%; top: 50%; width: min(300px, 74vmin); height: min(300px, 74vmin); border-radius: 50%; border: 1.5px solid rgba(255,255,255,0.5); animation-name: wru-rippleo; animation-duration: 6s; animation-timing-function: ease-out; animation-iteration-count: infinite; animation-fill-mode: backwards; }
  .wru-rippleo--2 { animation-delay: 2s; }
  .wru-rippleo--3 { animation-delay: 4s; }
  .wru-launch-logo { position: relative; z-index: 1; background: #fff; padding: 14px 24px; border-radius: 18px; box-shadow: 0 16px 50px rgba(0,0,0,0.22); animation: wru-bob 6s ease-in-out infinite; }
  .wru-launch-logo img { width: clamp(150px, 36vw, 220px); height: auto; display: block; }

  .wru-launch-text { margin-top: 26px; color: #fff; font-size: clamp(1.05rem, 3.5vw, 1.35rem); font-weight: 600; letter-spacing: 0.01em; text-shadow: 0 2px 16px rgba(0,0,0,0.2); }
  .wru-launch-text strong { font-weight: 800; }
  .wru-launch-hint { margin-top: 10px; color: rgba(255,255,255,0.9); font-size: 0.92rem; letter-spacing: 0.04em; }
  .wru-progress { position: relative; margin-top: 24px; width: min(280px, 64vw); height: 5px; border-radius: 99px; background: rgba(255,255,255,0.28); overflow: hidden; }
  .wru-progress-fill { height: 100%; border-radius: 99px; background: rgba(255,255,255,0.92); }
`;
