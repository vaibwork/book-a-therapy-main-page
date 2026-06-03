import { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar({ theme, setTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Services',   href: '#services' },
    { label: 'About Us',   href: '#about' },
    { label: 'Blogs',      href: '#blogs' },
    { label: 'Gift Cards', href: '#gift-cards' },
    { label: 'Contact',    href: '#contact' },
  ];

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          width: '100%',
          borderBottom: '1px solid var(--nav-border)',
          backgroundColor: 'var(--nav-bg)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        {/* ── Desktop bar — TRUE 3-column layout ── */}
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 32px',
          }}
        >
          {/* ── COL 1: Logo — flex-1, left-aligned ── */}
          <div
            style={{
              flex: '1',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              paddingLeft: '8px',      /* nudge logo slightly right from edge */
            }}
          >
            {/* Original BookaTherapy text logo with butterfly */}
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  userSelect: 'none',
                }}
              >
                Book
                {/* Green italic "a" with butterfly above */}
                <span
                  style={{
                    color: '#98c454',
                    fontStyle: 'italic',
                    fontFamily: "'Fraunces', serif",
                    position: 'relative',
                    padding: '0 3px',
                    userSelect: 'none',
                  }}
                >
                  a
                  {/* Blue Butterfly SVG */}
                  <svg
                    style={{
                      width: '18px',
                      height: '18px',
                      position: 'absolute',
                      top: '-10px',
                      right: '-5px',
                      pointerEvents: 'none',
                    }}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 12C10.2 10.2 8.2 10.5 7.2 11.9C6.2 13.3 6.9 15.4 8.7 15.4C9.8 15.4 11.2 14 12 12Z" fill="#3b82f6" opacity="0.85" />
                    <path d="M12 12C11 11 9.2 11 8.5 12C7.8 13.1 8.5 14.5 9.5 14.5C10.2 14.5 11.2 13.1 12 12Z" fill="#1e3a8a" />
                    <path d="M12 12C13.8 10.2 15.8 10.5 16.8 11.9C17.8 13.3 17.1 15.4 15.3 15.4C14.2 15.4 12.8 14 12 12Z" fill="#3b82f6" opacity="0.85" />
                    <path d="M12 12C13 11 14.8 11 15.5 12C16.2 13.1 15.5 14.5 14.5 14.5C13.8 14.5 12.8 13.1 12 12Z" fill="#1e3a8a" />
                    <path d="M12 12C11.8 10.2 11.1 9.2 10.5 8.8" stroke="#1e3a8a" strokeWidth="0.8" strokeLinecap="round" />
                    <path d="M12 12C12.2 10.2 12.9 9.2 13.5 8.8" stroke="#1e3a8a" strokeWidth="0.8" strokeLinecap="round" />
                  </svg>
                </span>
                Therapy
              </span>
              {/* Tagline */}
              <span
                style={{
                  fontSize: '0.58rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginTop: '5px',
                  paddingLeft: '2px',
                  userSelect: 'none',
                }}
              >
                Match. Relax. Thrive
              </span>
            </div>
          </div>

          {/* ── COL 2: Nav Links — NO flex, centered by the 3-col structure ── */}
          <div
            className="nav-center-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              flexShrink: 0,
            }}
          >
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-pill">
                {item.label}
              </a>
            ))}
          </div>

          {/* ── COL 3: Action Buttons — flex-1, right-aligned ── */}
          <div
            className="nav-right-actions"
            style={{
              flex: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '10px',
            }}
          >
            {/* Login — ghost outline pill */}
            <a href="http://localhost:3000/auth" className="nav-btn-login">
              Login
            </a>

            {/* Book a Therapy — lime filled pill */}
            <a href="#portals" className="nav-btn-book">
              Book a Therapy
            </a>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
              className="nav-theme-pill"
              title="Toggle theme"
            >
              {theme === 'light'
                ? <Moon size={15} />
                : <Sun size={15} style={{ color: '#fbbf24' }} />
              }
            </button>
          </div>

          {/* ── Mobile burger (hidden on md+) ── */}
          <button
            className="nav-mobile-burger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ── Mobile Drawer ── */}
        {isOpen && (
          <div
            style={{
              backgroundColor: 'var(--nav-bg)',
              borderTop: '1px solid var(--nav-border)',
              padding: '16px 24px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-mobile-link"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}

            <div
              style={{
                display: 'flex',
                gap: '10px',
                paddingTop: '16px',
                marginTop: '8px',
                borderTop: '1px solid var(--nav-border)',
              }}
            >
              <a
                href="http://localhost:3000/auth"
                className="nav-btn-login"
                style={{ flex: 1, textAlign: 'center', justifyContent: 'center', display: 'flex' }}
              >
                Login
              </a>
              <a
                href="#portals"
                className="nav-btn-book"
                style={{ flex: 1, textAlign: 'center', justifyContent: 'center', display: 'flex' }}
                onClick={() => setIsOpen(false)}
              >
                Book a Therapy
              </a>
            </div>

            <button
              onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                background: 'transparent',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: '4px',
              }}
            >
              {theme === 'light'
                ? <><Moon size={15} /> Switch to Dark Mode</>
                : <><Sun size={15} style={{ color: '#fbbf24' }} /> Switch to Light Mode</>
              }
            </button>
          </div>
        )}
      </nav>

      {/* Floating theme FAB */}
      <button
        onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        title="Toggle dark/light mode"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 50,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: '1.5px solid var(--nav-border)',
          backgroundColor: 'var(--bg-card)',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        {theme === 'light' ? <Moon size={16} /> : <Sun size={16} style={{ color: '#fbbf24' }} />}
      </button>
    </>
  );
}
