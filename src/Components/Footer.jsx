import { Share2, Heart, Mail, Briefcase, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About Us", href: "#about" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#blogs" },
      { label: "Press", href: "#" },
    ],
    services: [
      { label: "For Clients", href: "#" },
      { label: "For Therapists", href: "#" },
      { label: "For Clinics", href: "#" },
      { label: "Pricing", href: "#" },
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#contact" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
    legal: [
      { label: "Cookie Policy", href: "#" },
      { label: "Accessibility", href: "#" },
      { label: "Refund Policy", href: "#" },
      { label: "Insurance Info", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Share2, href: "#", label: "Share" },
    { icon: Heart, href: "#", label: "Like" },
    { icon: Mail, href: "#", label: "Email" },
    { icon: Briefcase, href: "#", label: "Work" },
  ];

  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Top Section Grid */}
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <Heart className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="footer__logo-name">BookATherapy</span>
            </div>

            <p className="footer__brand-desc">
              Canada's premier massage therapy platform, connecting clients with
              certified practitioners and clinics instantly.
            </p>

            <ul className="footer__contact-list">
              <li className="footer__contact-item">
                <Mail size={16} />
                <a
                  href="mailto:support@bookatherapy.com"
                  className="footer__col-link"
                >
                  support@bookatherapy.com
                </a>
              </li>
              <li className="footer__contact-item">
                <Phone size={16} />
                <a href="tel:1-800-THERAPY1" className="footer__col-link">
                  1-800-THERAPY1
                </a>
              </li>
              <li className="footer__contact-item">
                <MapPin size={16} />
                <span className="footer__col-link">Toronto, Canada</span>
              </li>
            </ul>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="footer__col-heading">{category}</h4>
              <ul className="footer__col-list">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer__col-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Middle Divider Section with Socials & Newsletter */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "28px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          {/* Social Links */}
          <div className="footer__socials">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className="footer__social-link"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>

          {/* Newsletter Signup (Right-aligned) */}
          <div
            style={{
              flex: "1",
              display: "flex",
              justifyContent: "flex-end",
              minWidth: "280px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "8px",
                width: "100%",
                maxWidth: "380px",
              }}
            >
              <input
                type="email"
                placeholder="Join our newsletter"
                style={{
                  flex: "1",
                  padding: "9px 18px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "999px",
                  color: "#fff",
                  fontSize: "0.85rem",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")
                }
              />
              <button
                className="btn-lime-sm"
                style={{
                  border: "none",
                  cursor: "pointer",
                  padding: "9px 20px",
                  borderRadius: "999px"
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar Section */}
        <div className="footer__bottom">
          <p>© {currentYear} BookATherapy Inc. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
