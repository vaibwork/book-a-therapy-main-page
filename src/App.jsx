import { useState, useEffect } from "react";
import {
  Heart,
  UserCheck,
  Building2,
  Sun,
  Moon,
  ArrowRight,
  Check,
  Settings2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import About from "./Components/About";
import Footer from "./Components/Footer";

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("bt_portal_theme") || "light",
  );
  const [showLanding, setShowLanding] = useState(true);

  // Portal URLs. In production set these via Vite env vars (see .env.example).
  // They fall back to the correct LOCAL dev ports otherwise.
  const DEFAULT_URLS = {
    customer: import.meta.env.VITE_CUSTOMER_URL || "http://localhost:3000",
    practitioner:
      import.meta.env.VITE_PRACTITIONER_URL || "http://localhost:3002",
    clinic: import.meta.env.VITE_CLINIC_URL || "http://localhost:3001",
  };

  const [customUrls, setCustomUrls] = useState(() => {
    const saved = localStorage.getItem("bt_custom_urls");
    if (saved) {
      try {
        return { ...DEFAULT_URLS, ...JSON.parse(saved) };
      } catch (e) {}
    }
    return DEFAULT_URLS;
  });

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.body.classList.remove("dark");
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
    localStorage.setItem("bt_portal_theme", theme);
  }, [theme]);

  const handleUrlChange = (portal, value) => {
    const updated = { ...customUrls, [portal]: value };
    setCustomUrls(updated);
    localStorage.setItem("bt_custom_urls", JSON.stringify(updated));
  };

  const portals = [
    {
      id: "customer",
      title: "Customer Portal",
      subtitle: "For Patients & Clients",
      description:
        "Search and book therapy sessions with certified practitioners. Access your personal dashboard, intake forms, wellness resources, and billing history in one secure place.",
      benefits: [
        "Browse & book certified therapists",
        "Secure online payments via Stripe",
        "Confidential intake & health forms",
        "Wellness blog & educational content",
      ],
      icon: Heart,
      badge: "Client Access",
      url: customUrls.customer,
      accentBorder: "border-t-4 border-t-green-500",
      iconBg: "bg-green-100 text-green-600",
      darkIconBg: "bg-green-900 text-green-300",
    },
    {
      id: "practitioner",
      title: "Practitioner Portal",
      subtitle: "For Licensed Therapists",
      description:
        "Manage your clinical practice from one dashboard. Handle appointments, patient EMR records, earnings reports, and customize your public practitioner profile listing.",
      benefits: [
        "Patient appointment scheduling",
        "EMR records & session notes",
        "Earnings reports & invoicing",
        "Profile & SEO management",
      ],
      icon: UserCheck,
      badge: "Practitioner Access",
      url: customUrls.practitioner,
      accentBorder: "border-t-4 border-t-blue-500",
      iconBg: "bg-blue-100 text-blue-600",
      darkIconBg: "bg-blue-900 text-blue-300",
    },
    {
      id: "clinic",
      title: "Clinic Portal",
      subtitle: "For Clinics & Institutions",
      description:
        "A powerful management console for healthcare institutions. Onboard multiple practitioners, coordinate bookings, run analytics reports, and manage staff access roles.",
      benefits: [
        "Multi-practitioner onboarding",
        "Clinic-wide booking management",
        "Analytics & performance reports",
        "Staff roles & access control",
      ],
      icon: Building2,
      badge: "Enterprise Access",
      url: customUrls.clinic,
      accentBorder: "border-t-4 border-t-cyan-500",
      iconBg: "bg-cyan-100 text-cyan-600",
      darkIconBg: "bg-cyan-900 text-cyan-300",
    },
  ];

  // Landing Page View
  if (showLanding) {
    return (
      <div className="transition-colors duration-300 min-h-screen flex flex-col">
        <Navbar theme={theme} setTheme={setTheme} />
        <HeroSection />
        <About />

        {/* Portal Selection Section */}
        <section
          id="portals"
          className="section portals transition-colors duration-300"
        >
          <div className="section__inner">
            <div className="text-center" style={{ marginBottom: "56px" }}>
              <span className="section__label">Match. Relax. Thrive.</span>
              <h2 className="section__heading">Access Your Dedicated Portal</h2>
              <p className="section__sub" style={{ margin: "0 auto" }}>
                Select your role below to access your tailored workspace in the
                Book a Therapy platform.
              </p>
              <button
                onClick={() => setShowLanding(false)}
                className="btn-lime-sm"
                style={{ marginTop: "24px", cursor: "pointer" }}
              >
                Open Portal Hub View →
              </button>
            </div>

            <div className="portals__grid">
              {portals.map((portal, i) => {
                const Icon = portal.icon;
                const cardThemeClass =
                  portal.id === "customer"
                    ? "portal-card--green"
                    : portal.id === "practitioner"
                      ? "portal-card--navy"
                      : "portal-card--teal";

                return (
                  <motion.div
                    key={portal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className={`portal-card ${cardThemeClass}`}
                  >
                    <div className="portal-card__bar" />
                    <div className="portal-card__body transition-colors duration-300">
                      <div className="portal-card__header">
                        <div className="portal-card__icon">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="portal-card__eyebrow">
                          {portal.badge}
                        </span>
                      </div>

                      <h3 className="portal-card__title">
                        {portal.title}
                      </h3>
                      <p className="portal-card__subtitle">{portal.subtitle}</p>
                      <p className="portal-card__desc">
                        {portal.description}
                      </p>

                      <div className="portal-card__benefits">
                        <p className="portal-card__benefits-label">
                          What's Included
                        </p>
                        <ul className="portal-card__list">
                          {portal.benefits.map((b) => (
                            <li
                              key={b}
                              className="portal-card__list-item"
                            >
                              <Check className="portal-card__check w-4 h-4 flex-shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <a href={portal.url} className="portal-card__cta">
                        Open Portal
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // Portal Hub View (Original)
  return (
    <div
      className={`min-h-screen flex flex-col ${theme === "dark" ? "dark" : ""}`}
    >
      {/* NAV */}
      <nav className="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-green-500">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base tracking-tight text-gray-900 dark:text-white">
                Book a Therapy
              </span>
              <span className="hidden sm:inline text-xs ml-2 font-normal text-gray-500 dark:text-gray-400">
                — Portal Hub
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setTheme((t) => (t === "light" ? "dark" : "light"))
              }
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold transition-colors"
            >
              {theme === "light" ? (
                <>
                  <Moon className="h-4 w-4" />{" "}
                  <span className="hidden sm:inline">Night</span>
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4" />{" "}
                  <span className="hidden sm:inline">Day</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowLanding(true)}
              className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
            >
              ← Back to Landing
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="w-full pt-14 pb-10 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-green-100 text-green-700 border border-green-300">
              Welcome
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-gray-900 dark:text-white"
          >
            Who are you accessing
            <br />
            <span className="text-green-600">the platform as?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-400"
          >
            Select your role below to access your dedicated workspace. Each
            portal is optimized for your specific needs within the Book a
            Therapy ecosystem.
          </motion.p>
        </div>
      </section>

      {/* CARDS */}
      <section className="w-full flex-grow px-4 sm:px-6 lg:px-8 pb-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {portals.map((portal, i) => {
            const Icon = portal.icon;
            return (
              <motion.div
                key={portal.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`${portal.accentBorder} rounded-xl bg-white dark:bg-slate-800 overflow-hidden shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="p-6 flex flex-col h-full">
                  <div
                    className={`${theme === "dark" ? portal.darkIconBg : portal.iconBg} w-11 h-11 rounded-xl flex items-center justify-center mb-4`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold mb-1 text-gray-900 dark:text-white">
                    {portal.title}
                  </h2>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-green-600">
                    {portal.subtitle}
                  </p>

                  <p className="text-sm leading-relaxed mb-5 text-gray-600 dark:text-gray-400 flex-grow">
                    {portal.description}
                  </p>

                  <div className="mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2.5 text-gray-500 dark:text-gray-400">
                      What's included
                    </p>
                    <ul className="space-y-1.5">
                      {portal.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300"
                        >
                          <Check className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-green-500" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={portal.url}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Open Platform
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Book a Therapy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
