import { motion } from "framer-motion";
import { Heart, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { PortalHubCard } from "../components/ui/PortalCard";
import { PORTALS_DATA } from "../constants/portals";

const PortalHub = ({ onBack, customUrls }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "dark" : ""}`}>
      {/* NAV */}
      <nav className="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <video
              src="/WhatsApp Video 2026-06-05 at 10.09.25 PM (1).mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-[70px] w-[200px] object-contain block mix-blend-screen"
            />
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
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold transition-colors"
            >
              {theme === "light" ? (
                <>
                  <Moon className="h-4 w-4" /> <span className="hidden sm:inline">Night</span>
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4" /> <span className="hidden sm:inline">Day</span>
                </>
              )}
            </button>

            <button
              onClick={onBack}
              className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
            >
              <span className="hidden sm:inline">← Back to Landing</span>
              <span className="sm:hidden">← Back</span>
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
          {PORTALS_DATA.map((portal, i) => (
            <PortalHubCard
              key={portal.id}
              portal={portal}
              index={i}
              theme={theme}
              url={customUrls[portal.id]}
            />
          ))}
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
};

export default PortalHub;
