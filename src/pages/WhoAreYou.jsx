import { useEffect, useMemo, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Heart, UserCheck, Building2, ArrowRight } from "lucide-react";
import logo from "../assets/logo.jpg";

// Real portal destinations (baked in at build from .env.production). The /patient
// style paths stay as the <a href> fallback so right-click / new-tab still work;
// the actual navigation after the launch animation uses these direct URLs.
const DEST = {
  patient: import.meta.env.VITE_CUSTOMER_URL || "/patient",
  practitioner: import.meta.env.VITE_PRACTITIONER_URL || "/practitioner",
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
  },
];

const PARTICLE_COLORS = ["#98c454", "#252f4f", "#43829e", "#7ea63f"];
const SPARK_COLORS = ["#ffffff", "#98c454", "#43829e", "#ffd76a", "#7ea63f"];
const ROCKET_TRAILS = ["#ffffff", "#ffd76a", "#98c454", "#bfe0ee"];
const COVER_BASE = 48; // px — base size of the erupting cover circle
const HOLD_MS = 2450; // how long the blast-off screen shows before redirecting

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
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    controls.start("show");
  }, [controls]);

  // After the cover circle fills the screen, hold the rocket screen briefly, then go.
  useEffect(() => {
    if (phase === "loading" && pick) {
      const t = setTimeout(() => {
        window.location.href = pick.dest;
      }, HOLD_MS);
      return () => clearTimeout(t);
    }
  }, [phase, pick]);

  // Live percentage counter, animated with requestAnimationFrame.
  useEffect(() => {
    if (phase !== "loading") return;
    let raf;
    let start = null;
    const D = HOLD_MS - 250;
    const tick = (t) => {
      if (start === null) start = t;
      const p = Math.min(100, Math.round(((t - start) / D) * 100));
      setPercent(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const handlePick = (e, role) => {
    e.preventDefault();
    if (phase !== "idle") return;
    const x = e.clientX || window.innerWidth / 2;
    const y = e.clientY || window.innerHeight / 2;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const far = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y));
    const scale = (far * 2) / COVER_BASE + 1.3;
    setPick({ id: role.id, name: role.name, dest: DEST[role.id], x, y, solid: role.solid, scale });
    setPhase("cover");
    controls.start("hide");
  };

  // Evenly distribute background particles on a jittered grid (no blank patches).
  const particles = useMemo(() => {
    const cols = 6;
    const rows = 5;
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

  // --- Blast-off screen elements ---
  const rockets = useMemo(() => {
    const r = (a, b) => a + Math.random() * (b - a);
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: +r(3, 93).toFixed(1),
      size: Math.round(r(20, 48)),
      dur: +r(1.4, 2.8).toFixed(2),
      delay: +r(0, 1.6).toFixed(2),
      drift: Math.round(r(-50, 70)),
      trail: ROCKET_TRAILS[i % ROCKET_TRAILS.length],
    }));
  }, []);

  const stars = useMemo(() => {
    const r = (a, b) => a + Math.random() * (b - a);
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: +r(0, 100).toFixed(2),
      top: +r(0, 100).toFixed(2),
      size: +r(2, 5).toFixed(1),
      color: Math.random() > 0.5 ? "#ffffff" : SPARK_COLORS[i % SPARK_COLORS.length],
      dur: +r(1.4, 3.2).toFixed(2),
      delay: +r(0, 3).toFixed(2),
    }));
  }, []);

  const confetti = useMemo(() => {
    const r = (a, b) => a + Math.random() * (b - a);
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: +r(0, 100).toFixed(2),
      w: Math.round(r(6, 11)),
      h: Math.round(r(8, 16)),
      color: SPARK_COLORS[i % SPARK_COLORS.length],
      spin: Math.round(r(360, 900)),
      dur: +r(2.4, 4.6).toFixed(2),
      delay: +r(0, 3).toFixed(2),
      round: Math.random() > 0.6,
    }));
  }, []);

  const fireworks = useMemo(() => {
    const r = (a, b) => a + Math.random() * (b - a);
    return Array.from({ length: 3 }, (_, b) => ({
      id: b,
      left: +r(15, 85).toFixed(1),
      top: +r(16, 64).toFixed(1),
      delay: +r(0, 1.4).toFixed(2),
      sparks: Array.from({ length: 11 }, (_, k) => {
        const a = (k / 11) * Math.PI * 2 + r(-0.15, 0.15);
        const rad = r(66, 116);
        return {
          k,
          fx: Math.round(Math.cos(a) * rad),
          fy: Math.round(Math.sin(a) * rad),
          color: SPARK_COLORS[k % SPARK_COLORS.length],
          d: +(Math.random() * 0.18).toFixed(2),
        };
      }),
    }));
  }, []);

  return (
    <main className="wru-root">
      <style>{CSS}</style>

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
              <motion.a
                key={id}
                href={DEST[id]}
                onClick={(e) => handlePick(e, role)}
                className="wru-card"
                variants={cardVar}
                custom={pick?.id === id}
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

      {/* Blast-off redirect screen */}
      {pick && phase === "loading" && (
        <motion.div
          className="wru-launch"
          style={{ background: pick.solid }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop motion */}
          <div className="wru-aurora" />
          <div className="wru-launch-glow wru-launch-glow--1" />
          <div className="wru-launch-glow wru-launch-glow--2" />

          {/* Twinkling starfield */}
          <div className="wru-layer">
            {stars.map((s) => (
              <span
                key={s.id}
                className="wru-star"
                style={{
                  left: `${s.left}%`,
                  top: `${s.top}%`,
                  width: s.size,
                  height: s.size,
                  background: s.color,
                  animationDuration: `${s.dur}s`,
                  animationDelay: `${s.delay}s`,
                }}
              />
            ))}
          </div>

          {/* Repeating firework bursts */}
          <div className="wru-layer">
            {fireworks.map((fw) => (
              <div key={fw.id} className="wru-fw" style={{ left: `${fw.left}%`, top: `${fw.top}%` }}>
                {fw.sparks.map((sp) => (
                  <span
                    key={sp.k}
                    className="wru-fw-spark"
                    style={{
                      background: sp.color,
                      boxShadow: `0 0 8px ${sp.color}`,
                      "--fx": `${sp.fx}px`,
                      "--fy": `${sp.fy}px`,
                      animationDelay: `${(fw.delay + sp.d).toFixed(2)}s`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Falling confetti */}
          <div className="wru-layer">
            {confetti.map((c) => (
              <span
                key={c.id}
                className="wru-confetti"
                style={{
                  left: `${c.left}%`,
                  width: c.w,
                  height: c.h,
                  background: c.color,
                  borderRadius: c.round ? "50%" : "2px",
                  "--spin": `${c.spin}deg`,
                  animationDuration: `${c.dur}s`,
                  animationDelay: `${c.delay}s`,
                }}
              />
            ))}
          </div>

          {/* Shooting stars */}
          <span className="wru-shoot" style={{ top: "12%", left: "8%", animationDelay: "0.2s" }} />
          <span className="wru-shoot" style={{ top: "26%", left: "52%", animationDelay: "1.1s" }} />
          <span className="wru-shoot" style={{ top: "6%", left: "70%", animationDelay: "1.8s" }} />

          {/* Rocket fleet */}
          <div className="wru-layer">
            {rockets.map((rk) => (
              <motion.div
                key={rk.id}
                className="wru-rocket"
                style={{ left: `${rk.left}%`, fontSize: rk.size }}
                initial={{ y: "112vh", x: 0, opacity: 0 }}
                animate={{ y: "-22vh", x: rk.drift, opacity: [0, 1, 1, 0.9, 0] }}
                transition={{
                  duration: rk.dur,
                  delay: rk.delay,
                  repeat: Infinity,
                  ease: "easeIn",
                  times: [0, 0.08, 0.6, 0.85, 1],
                }}
              >
                <span
                  className="wru-rocket-trail"
                  style={{ background: `linear-gradient(to bottom, ${rk.trail}, ${rk.trail}55 35%, transparent)` }}
                />
                <span className="wru-rocket-em">🚀</span>
              </motion.div>
            ))}
          </div>

          {/* Centerpiece */}
          <motion.div
            className="wru-launch-center"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.12, type: "spring", stiffness: 120, damping: 15 }}
          >
            <div className="wru-logo-stage">
              <span className="wru-center-aura" />
              <span className="wru-ring wru-ring--1" />
              <span className="wru-ring wru-ring--2" />
              <div className="wru-launch-logo">
                <img src={logo} alt="BookaTherapy" />
              </div>
            </div>
            <div className="wru-launch-text">
              Taking you to the <strong>{pick.name}</strong> portal…
            </div>
            <div className="wru-progress">
              <motion.div
                className="wru-progress-fill"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: (HOLD_MS - 250) / 1000, ease: "easeInOut" }}
              />
              <span className="wru-progress-shine" />
            </div>
            <div className="wru-percent">{percent}%</div>
            <div className="wru-launch-hint">Hold tight — almost there 🚀</div>
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
    padding: 28px 20px;
    overflow: hidden;
    font-family: 'Manrope', sans-serif;
    background:
      radial-gradient(1100px 600px at 50% -10%, var(--accent-light), transparent 60%),
      var(--bg-primary);
  }

  .wru-blob { position: absolute; border-radius: 50%; filter: blur(70px); opacity: 0.5; pointer-events: none; z-index: 0; }
  .wru-blob--green { width: 420px; height: 420px; background: var(--accent); top: -80px; left: -60px; }
  .wru-blob--navy  { width: 380px; height: 380px; background: var(--navy);  bottom: -90px; right: -40px; opacity: 0.3; }
  .wru-blob--teal  { width: 300px; height: 300px; background: var(--teal);  bottom: 10%; left: 8%; opacity: 0.32; }

  .wru-particles { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
  .wru-particle { position: absolute; border-radius: 50%; will-change: transform, opacity; }

  .wru-content {
    position: relative; z-index: 1; width: 100%; max-width: 920px;
    display: flex; flex-direction: column; align-items: center; text-align: center;
  }

  .wru-logo-chip { background: #ffffff; padding: 16px 30px; border-radius: 20px; box-shadow: var(--shadow-md); display: inline-flex; }
  .wru-logo { width: clamp(210px, 42vw, 320px); height: auto; display: block; user-select: none; -webkit-user-drag: none; }

  .wru-title { margin-top: 34px; font-size: clamp(1.9rem, 5.5vw, 3rem); font-weight: 800; letter-spacing: -0.02em; color: var(--text-primary); }
  .wru-sub { margin-top: 10px; font-size: 1.05rem; color: var(--text-muted); }

  .wru-grid { margin-top: 38px; width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  @media (max-width: 720px) { .wru-grid { grid-template-columns: 1fr; max-width: 380px; margin-inline: auto; } }

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

  .wru-foot { margin-top: 34px; font-size: 0.8rem; letter-spacing: 0.04em; color: var(--text-muted); }

  /* Cover circle erupting from the click */
  .wru-cover { position: fixed; width: 48px; height: 48px; border-radius: 50%; transform: translate(-50%, -50%); z-index: 50; pointer-events: none; }

  /* ---------- Blast-off redirect screen ---------- */
  .wru-launch { position: fixed; inset: 0; z-index: 60; overflow: hidden; display: flex; align-items: center; justify-content: center; }
  .wru-layer { position: absolute; inset: 0; pointer-events: none; }

  @keyframes wru-spin { from { transform: translate(-50%, -50%) rotate(0); } to { transform: translate(-50%, -50%) rotate(360deg); } }
  @keyframes wru-spin-rev { from { transform: translate(-50%, -50%) rotate(0); } to { transform: translate(-50%, -50%) rotate(-360deg); } }
  @keyframes wru-aura { 0%, 100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.45; } 50% { transform: translate(-50%, -50%) scale(1.18); opacity: 0.85; } }
  @keyframes wru-pulse { 0%, 100% { transform: scale(0.9); opacity: 0.35; } 50% { transform: scale(1.2); opacity: 0.7; } }
  @keyframes wru-twinkle { 0%, 100% { opacity: 0.15; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1.25); } }
  @keyframes wru-fall { from { transform: translateY(-14vh) rotate(0); } to { transform: translateY(116vh) rotate(var(--spin)); } }
  @keyframes wru-firework { 0% { transform: translate(0, 0) scale(0.3); opacity: 0; } 12% { opacity: 1; } 100% { transform: translate(var(--fx), var(--fy)) scale(1); opacity: 0; } }
  @keyframes wru-shine { 0% { transform: translateX(-130%); } 100% { transform: translateX(360%); } }
  @keyframes wru-shoot { 0% { opacity: 0; transform: translate(-12vw, -12vh) rotate(35deg); } 12% { opacity: 1; } 55% { opacity: 1; } 100% { opacity: 0; transform: translate(62vw, 62vh) rotate(35deg); } }
  @keyframes wru-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

  .wru-aurora {
    position: absolute; left: 50%; top: 50%; width: 170vmax; height: 170vmax;
    background: conic-gradient(from 0deg, rgba(255,255,255,0), rgba(255,255,255,0.16), rgba(255,255,255,0) 28%, rgba(255,255,255,0.12) 52%, rgba(255,255,255,0) 78%, rgba(255,255,255,0.14) 92%, rgba(255,255,255,0));
    mix-blend-mode: screen; animation: wru-spin 16s linear infinite; pointer-events: none;
  }
  .wru-launch-glow { position: absolute; border-radius: 50%; filter: blur(60px); pointer-events: none; }
  .wru-launch-glow--1 { width: 50vmin; height: 50vmin; left: 12%; top: 18%; background: rgba(255,255,255,0.4); animation: wru-pulse 3.2s ease-in-out infinite; }
  .wru-launch-glow--2 { width: 42vmin; height: 42vmin; right: 10%; bottom: 14%; background: rgba(255,255,255,0.3); animation: wru-pulse 4s ease-in-out infinite 0.6s; }

  .wru-star { position: absolute; border-radius: 50%; box-shadow: 0 0 6px rgba(255,255,255,0.7); animation: wru-twinkle linear infinite; }
  .wru-confetti { position: absolute; top: 0; animation: wru-fall linear infinite; }
  .wru-fw { position: absolute; width: 0; height: 0; }
  .wru-fw-spark { position: absolute; left: 0; top: 0; width: 7px; height: 7px; border-radius: 50%; animation: wru-firework 1.35s ease-out infinite; }
  .wru-shoot { position: absolute; width: 150px; height: 2px; border-radius: 2px; background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.95)); filter: drop-shadow(0 0 6px rgba(255,255,255,0.8)); animation: wru-shoot 2.6s ease-in infinite; }

  .wru-rocket { position: absolute; bottom: 0; will-change: transform; line-height: 1; }
  .wru-rocket-em { display: block; transform: rotate(-45deg); filter: drop-shadow(0 0 8px rgba(255,255,255,0.7)); }
  .wru-rocket-trail { position: absolute; left: 50%; top: 55%; transform: translateX(-50%); width: 6px; height: 92px; border-radius: 6px; filter: blur(2px); }

  .wru-launch-center { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 24px; }
  .wru-logo-stage { position: relative; display: flex; align-items: center; justify-content: center; width: 300px; height: 300px; }
  .wru-center-aura { position: absolute; left: 50%; top: 50%; width: 320px; height: 320px; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.7), transparent 65%); filter: blur(6px); animation: wru-aura 2.4s ease-in-out infinite; }
  .wru-ring { position: absolute; left: 50%; top: 50%; border-radius: 50%; pointer-events: none; }
  .wru-ring--1 { width: 250px; height: 250px; border: 2px dashed rgba(255,255,255,0.55); animation: wru-spin 9s linear infinite; }
  .wru-ring--2 { width: 300px; height: 300px; border: 2px dotted rgba(255,255,255,0.35); animation: wru-spin-rev 14s linear infinite; }
  .wru-launch-logo { position: relative; z-index: 1; background: #fff; padding: 14px 24px; border-radius: 18px; box-shadow: 0 16px 50px rgba(0,0,0,0.28); animation: wru-bob 2.8s ease-in-out infinite; }
  .wru-launch-logo img { width: clamp(160px, 38vw, 230px); height: auto; display: block; }

  .wru-launch-text { margin-top: 22px; color: #fff; font-size: clamp(1.05rem, 3.5vw, 1.4rem); font-weight: 600; text-shadow: 0 2px 14px rgba(0,0,0,0.25); }
  .wru-launch-text strong { font-weight: 800; }
  .wru-progress { position: relative; margin-top: 20px; width: min(320px, 70vw); height: 8px; border-radius: 99px; background: rgba(255,255,255,0.3); overflow: hidden; }
  .wru-progress-fill { height: 100%; border-radius: 99px; background: #fff; box-shadow: 0 0 12px rgba(255,255,255,0.85); }
  .wru-progress-shine { position: absolute; top: 0; left: 0; height: 100%; width: 38%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent); animation: wru-shine 1.1s ease-in-out infinite; }
  .wru-percent { margin-top: 12px; color: #fff; font-size: 1.6rem; font-weight: 800; letter-spacing: 0.02em; text-shadow: 0 2px 14px rgba(0,0,0,0.25); }
  .wru-launch-hint { margin-top: 8px; color: rgba(255,255,255,0.92); font-size: 0.9rem; letter-spacing: 0.02em; }
`;
