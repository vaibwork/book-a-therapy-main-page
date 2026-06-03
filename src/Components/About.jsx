import {
  Users, Zap, Shield, CheckCircle,
  MapPin, Search, Smile, ArrowRight,
} from "lucide-react";

export default function About() {
  const howItWorksSteps = [
    {
      step: "01",
      icon: MapPin,
      title: "Specify Location & Portal",
      description:
        "Enter your location, pick whether you want a customer, practitioner, or clinic portal, and open your workspace.",
    },
    {
      step: "02",
      icon: Search,
      title: "Match and Customize",
      description:
        "Filter certified massage practitioners by ratings, location, availability, and therapy type to find your perfect fit.",
    },
    {
      step: "03",
      icon: Smile,
      title: "Relax & Thrive",
      description:
        "Confirm your booking instantly with secure Stripe payments, and enjoy a professional therapy experience.",
    },
  ];

  const features = [
    {
      icon: Users,
      title: "Verified Therapists",
      description:
        "All therapists are certified, insured, and thoroughly vetted to ensure your complete safety and comfort.",
    },
    {
      icon: Zap,
      title: "Instant Booking",
      description:
        "Secure your massage session in minutes. Choose your preferred time, location, and practitioner with ease.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your personal records and health information are fully encrypted and kept completely confidential.",
    },
    {
      icon: CheckCircle,
      title: "Transparent Pricing",
      description:
        "No hidden fees or unexpected charges. See the exact pricing upfront before booking your session.",
    },
  ];

  const stats = [
    { number: "5,000+", label: "Happy Clients" },
    { number: "500+",   label: "Certified Therapists" },
    { number: "50+",    label: "Cities Covered" },
    { number: "10K+",   label: "Sessions Completed" },
  ];

  return (
    <div style={{ background: "var(--bg-primary)", transition: "background 0.3s, color 0.3s" }}>

      {/* ─── HOW IT WORKS ─── */}
      <section id="services" className="section hiw">
        <div className="section__inner">
          <div className="text-center" style={{ marginBottom: "56px" }}>
            <span className="section__label">Simple Steps</span>
            <h2 className="section__heading">How It Works</h2>
            <p className="section__sub" style={{ margin: "0 auto" }}>
              We've streamlined the entire process to connect you with top-tier
              wellness practitioners in a matter of clicks.
            </p>
          </div>

          <div className="hiw__grid">
            {howItWorksSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="hiw__card"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}
                >
                  <span className="hiw__step-num">Step {step.step}</span>
                  <div className="hiw__icon-wrap">
                    <Icon size={24} />
                  </div>
                  <h3 className="hiw__title" style={{ color: "var(--text-primary)" }}>
                    {step.title}
                  </h3>
                  <p className="hiw__desc" style={{ color: "var(--text-muted)" }}>
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section
        id="about"
        className="section benefits"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="section__inner">
          <div className="text-center" style={{ marginBottom: "56px" }}>
            <span className="section__label">Why Choose Us</span>
            <h2 className="section__heading">BookATherapy Core Benefits</h2>
            <p className="section__sub" style={{ margin: "0 auto" }}>
              We are dedicated to making professional massage therapy
              accessible, transparent, and completely hassle-free.
            </p>
          </div>

          <div className="benefits__grid" style={{ marginBottom: "64px" }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="benefit-card"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div className="benefit-card__icon">
                    <Icon size={22} />
                  </div>
                  <h3 className="benefit-card__title" style={{ color: "var(--text-primary)" }}>
                    {feature.title}
                  </h3>
                  <p className="benefit-card__desc" style={{ color: "var(--text-muted)" }}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Stats Bar */}
          <div className="about-stats">
            <div className="about-stats__grid">
              {stats.map((stat, index) => (
                <div key={index} className="about-stats__item">
                  <div className="about-stats__number">{stat.number}</div>
                  <div className="about-stats__label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="section cta-banner">
        <div className="cta-banner__inner">
          <div className="cta-banner__circle cta-banner__circle--1" />
          <div className="cta-banner__circle cta-banner__circle--2" />
          <div className="cta-banner__content">
            <h3 className="cta-banner__heading">
              Ready to Experience Professional Wellness?
            </h3>
            <p className="cta-banner__sub">
              Join thousands of wellness enthusiasts who have unlocked premium
              in-home, mobile, or clinic-based massage therapy sessions.
            </p>
            <a
              href="#portals"
              className="cta-banner__btn"
            >
              Choose Your Portal
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
