import { useState, useEffect } from 'react';
import { Heart, UserCheck, Building2, Sun, Moon, ArrowRight, Check, Settings2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('bt_portal_theme') || 'light');
  // Portal URLs. In production set these via Vite env vars (see .env.example).
  // They fall back to the correct LOCAL dev ports otherwise.
  const DEFAULT_URLS = {
    customer: import.meta.env.VITE_CUSTOMER_URL || 'http://localhost:3000',
    practitioner: import.meta.env.VITE_PRACTITIONER_URL || 'http://localhost:3002',
    clinic: import.meta.env.VITE_CLINIC_URL || 'http://localhost:3001',
  };
  const [showSettings, setShowSettings] = useState(false);
  const [customUrls, setCustomUrls] = useState(() => {
    const saved = localStorage.getItem('bt_custom_urls');
    if (saved) { try { return { ...DEFAULT_URLS, ...JSON.parse(saved) }; } catch (e) {} }
    return DEFAULT_URLS;
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('bt_portal_theme', theme);
  }, [theme]);

  const handleUrlChange = (portal, value) => {
    const updated = { ...customUrls, [portal]: value };
    setCustomUrls(updated);
    localStorage.setItem('bt_custom_urls', JSON.stringify(updated));
  };

  const portals = [
    {
      id: 'customer',
      title: 'Customer Portal',
      subtitle: 'For Patients & Clients',
      description: 'Search and book therapy sessions with certified practitioners. Access your personal dashboard, intake forms, wellness resources, and billing history in one secure place.',
      benefits: [
        'Browse & book certified therapists',
        'Secure online payments via Stripe',
        'Confidential intake & health forms',
        'Wellness blog & educational content'
      ],
      icon: Heart,
      badge: 'Client Access',
      url: customUrls.customer,
      accentBorder: 'border-t-4 border-t-[var(--accent)]',
      iconBg: 'bg-[hsl(83.57,48.7%,92%)] text-[hsl(83.57,48.7%,30%)]',
      darkIconBg: 'bg-[hsl(83.57,48.7%,15%)] text-[hsl(83.57,48.7%,65%)]',
    },
    {
      id: 'practitioner',
      title: 'Practitioner Portal',
      subtitle: 'For Licensed Therapists',
      description: 'Manage your clinical practice from one dashboard. Handle appointments, patient EMR records, earnings reports, and customize your public practitioner profile listing.',
      benefits: [
        'Patient appointment scheduling',
        'EMR records & session notes',
        'Earnings reports & invoicing',
        'Profile & SEO management'
      ],
      icon: UserCheck,
      badge: 'Practitioner Access',
      url: customUrls.practitioner,
      accentBorder: 'border-t-4 border-t-[hsl(225.71,36.21%,35%)]',
      iconBg: 'bg-[hsl(225.71,36.21%,92%)] text-[hsl(225.71,36.21%,22%)]',
      darkIconBg: 'bg-[hsl(225.71,36.21%,20%)] text-[hsl(225.71,36.21%,75%)]',
    },
    {
      id: 'clinic',
      title: 'Clinic Portal',
      subtitle: 'For Clinics & Institutions',
      description: 'A powerful management console for healthcare institutions. Onboard multiple practitioners, coordinate bookings, run analytics reports, and manage staff access roles.',
      benefits: [
        'Multi-practitioner onboarding',
        'Clinic-wide booking management',
        'Analytics & performance reports',
        'Staff roles & access control'
      ],
      icon: Building2,
      badge: 'Enterprise Access',
      url: customUrls.clinic,
      accentBorder: 'border-t-4 border-t-[hsl(200,60%,45%)]',
      iconBg: 'bg-[hsl(200,60%,92%)] text-[hsl(200,60%,28%)]',
      darkIconBg: 'bg-[hsl(200,60%,18%)] text-[hsl(200,60%,65%)]',
    }
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-secondary)', transition: 'background 0.35s, color 0.35s' }}
    >
      {/* ── NAV ── */}
      <nav className="w-full border-b" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-primary)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <Heart className="h-4 w-4" style={{ color: 'hsl(240,9.09%,12.94%)' }} />
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Book a Therapy
              </span>
              <span className="hidden sm:inline text-xs ml-2 font-normal" style={{ color: 'var(--text-muted)' }}>
                — Portal Hub
              </span>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            className="theme-toggle"
            aria-label="Toggle day/night mode"
          >
            {theme === 'light'
              ? <><Moon className="h-4 w-4" /> <span className="hidden sm:inline">Night</span></>
              : <><Sun className="h-4 w-4" /> <span className="hidden sm:inline">Day</span></>
            }
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="w-full pt-14 pb-10 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
              style={{ background: 'hsl(83.57,48.7%,92%)', color: 'hsl(83.57,48.7%,28%)', border: '1px solid hsl(83.57,48.7%,78%)' }}
            >
              Welcome
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Who are you accessing
            <br />
            <span style={{ color: 'var(--accent)' }}>the platform as?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm sm:text-base leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            Select your role below to access your dedicated workspace. Each portal is optimized for your specific needs within the Book a Therapy ecosystem.
          </motion.p>
        </div>
      </section>

      {/* ── CARDS ── */}
      <section className="w-full flex-grow px-4 sm:px-6 lg:px-8 pb-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {portals.map((portal, i) => {
            const Icon = portal.icon;
            return (
              <motion.div
                key={portal.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`brand-card flex flex-col ${portal.accentBorder} overflow-hidden`}
              >
                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                  {/* Icon + Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? portal.darkIconBg : portal.iconBg}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="accent-pill ml-2 mt-1 text-right leading-tight">
                      {portal.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg sm:text-xl font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                    {portal.title}
                  </h2>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>
                    {portal.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
                    {portal.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6 flex-grow">
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest mb-2.5"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      What's included
                    </p>
                    <ul className="space-y-1.5">
                      {portal.benefits.map(b => (
                        <li key={b} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                          <Check
                            className="h-3.5 w-3.5 flex-shrink-0 mt-0.5"
                            style={{ color: 'var(--accent)' }}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <a
                    href={portal.url}
                    className="btn-lime flex items-center justify-center gap-2 w-full py-2.5 px-4"
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

      {/* ── FOOTER ── */}
      <footer
        className="w-full border-t"
        style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-center sm:text-left" style={{ color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} Book a Therapy. All rights reserved.
            </p>

            {import.meta.env.DEV && (
              <button
                onClick={() => setShowSettings(s => !s)}
                className="flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: 'var(--text-muted)' }}
              >
                <Settings2 className="h-3.5 w-3.5" />
                Configure URLs
                {showSettings ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>
            )}
          </div>

          {/* Settings Drawer */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div
                  className="mt-4 p-4 sm:p-5 rounded-xl border"
                  style={{ borderColor: 'var(--border-color)', background: 'var(--bg-card)' }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-primary)' }}>
                    Local Development Ports
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { key: 'customer', label: 'Customer Portal' },
                      { key: 'practitioner', label: 'Practitioner Portal' },
                      { key: 'clinic', label: 'Clinic Portal' }
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <label
                          className="block text-[10px] font-bold uppercase tracking-wider mb-1"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {label}
                        </label>
                        <input
                          type="text"
                          className="settings-input"
                          value={customUrls[key]}
                          onChange={e => handleUrlChange(key, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </footer>
    </div>
  );
}

export default App;
