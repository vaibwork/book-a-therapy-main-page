import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

export const PortalCard = ({ portal, index, url }) => {
  const Icon = portal.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`portal-card ${portal.themeClass}`}
    >
      <div className="portal-card__bar" />
      <div className="portal-card__body transition-colors duration-300">
        <div className="portal-card__header">
          <div className="portal-card__icon">
            <Icon className="w-5 h-5" />
          </div>
          <span className="portal-card__eyebrow">{portal.badge}</span>
        </div>

        <h3 className="portal-card__title">{portal.title}</h3>
        <p className="portal-card__subtitle">{portal.subtitle}</p>
        <p className="portal-card__desc">{portal.description}</p>

        <div className="portal-card__benefits">
          <p className="portal-card__benefits-label">What's Included</p>
          <ul className="portal-card__list">
            {portal.benefits.map((b) => (
              <li key={b} className="portal-card__list-item">
                <Check className="portal-card__check w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <a href={url} className="portal-card__cta">
          Open Portal
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

export const PortalHubCard = ({ portal, index, theme, url }) => {
  const Icon = portal.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
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
          href={url}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
        >
          Open Platform
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
};
