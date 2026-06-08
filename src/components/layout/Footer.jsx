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
    <footer className="footer bg-[var(--navy)] text-white/70">
      <div className="footer__inner max-w-[1160px] mx-auto px-6 pt-16 pb-8">
        {/* Top Section Grid */}
        <div className="footer__grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="footer__brand lg:col-span-2">
            <div className="footer__logo flex items-center gap-2.5 mb-3.5">
              <span className="footer__logo-name font-['Manrope',sans-serif] text-[1.05rem] font-bold text-white">BookATherapy</span>
            </div>

            <p className="footer__brand-desc text-[0.85rem] leading-[1.65] text-white/55 mb-5 max-w-[340px]">
              Canada's premier massage therapy platform, connecting clients with
              certified practitioners and clinics instantly.
            </p>

            <ul className="footer__contact-list list-none flex flex-col gap-3">
              <li className="footer__contact-item flex items-start gap-2.5 text-white/40">
                <Mail size={16} className="shrink-0 mt-0.5" />
                <a
                  href="mailto:support@bookatherapy.com"
                  className="footer__col-link text-[0.85rem] text-white/55 hover:text-white transition-colors"
                >
                  support@bookatherapy.com
                </a>
              </li>
              <li className="footer__contact-item flex items-start gap-2.5 text-white/40">
                <Phone size={16} className="shrink-0 mt-0.5" />
                <a href="tel:1-800-THERAPY1" className="footer__col-link text-[0.85rem] text-white/55 hover:text-white transition-colors">
                  1-800-THERAPY1
                </a>
              </li>
              <li className="footer__contact-item flex items-start gap-2.5 text-white/40">
                <MapPin size={16} className="shrink-0 mt-0.5" />
                <span className="footer__col-link text-[0.85rem] text-white/55">Toronto, Canada</span>
              </li>
            </ul>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="footer__col-heading text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[var(--accent)] mb-[18px]">{category}</h4>
              <ul className="footer__col-list list-none flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer__col-link text-[0.85rem] text-white/55 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Middle Divider Section with Socials & Newsletter */}
        <div className="flex justify-between items-center flex-wrap gap-6 py-7 border-t border-white/10">
          {/* Social Links */}
          <div className="footer__socials flex gap-2.5">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className="footer__social-link w-[34px] h-[34px] rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>

          {/* Newsletter Signup (Right-aligned) */}
          <div className="footer__newsletter w-full sm:w-auto">
            <div className="flex gap-2 w-full max-w-[380px]">
              <input
                type="email"
                placeholder="Join our newsletter"
                className="flex-1 px-[18px] py-[9px] bg-white/5 border border-white/10 rounded-full text-white text-[0.85rem] outline-none focus:border-[var(--accent)] transition-colors"
              />
              <button
                className="btn-lime-sm !rounded-full border-none cursor-pointer px-5 py-[9px]"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar Section */}
        <div className="footer__bottom flex items-center justify-between gap-4 pt-7 border-t border-white/10 text-[0.8rem] text-white/35 flex-wrap">
          <p>© {currentYear} BookATherapy Inc. All rights reserved.</p>
          <div className="footer__bottom-links flex gap-5">
            <a href="#" className="text-white/35 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/35 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-white/35 hover:text-white transition-colors">Cookie settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
