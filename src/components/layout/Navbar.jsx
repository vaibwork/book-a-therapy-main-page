import { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'About Us', href: '#about' },
    { label: 'Blogs', href: '#blogs' },
    { label: 'Gift Cards', href: '#gift-cards' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-[var(--nav-border)] bg-[var(--nav-bg)] backdrop-blur-[14px] transition-all duration-300">
        <div className="nav-container flex items-center h-[100px] max-w-[1280px] mx-auto px-5 md:px-8">

          {/* Logo */}
          <div className="flex-1 flex items-center">
            <a href="/" className="flex items-center no-underline">
              <video
                src="/logo_final.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  height: '90px',
                  width: '420px',
                  objectFit: 'contain',
                  display: 'block',
                  mixBlendMode: theme === 'dark' ? 'screen' : 'multiply',
                  marginLeft: '0',
                }}
              />
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden min-[900px]:flex items-center gap-0.5 flex-shrink-0">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-pill">
                {item.label}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden min-[900px]:flex flex-1 items-center justify-end gap-2.5">
            <a href="http://localhost:3000/auth" className="nav-btn-login">
              Login
            </a>

            <a href="#portals" className="nav-btn-book">
              Book a Therapy
            </a>

            <button
              onClick={toggleTheme}
              className="nav-theme-pill flex items-center justify-center p-2 rounded-full border border-[var(--nav-border)] hover:bg-[var(--accent-light)] transition-colors"
              title="Toggle theme"
            >
              {theme === 'light'
                ? <Moon size={15} />
                : <Sun size={15} className="text-amber-400" />
              }
            </button>
          </div>

          {/* Mobile burger */}
          <div className="min-[900px]:hidden flex-1 flex justify-end">
            <button
              className="flex items-center justify-center p-2 border border-[var(--nav-border)] rounded-lg text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--accent-light)] transition-all"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="min-[900px]:hidden nav-mobile-drawer flex flex-col gap-2.5 p-6 bg-[var(--nav-bg)] border-t border-[var(--nav-border)] backdrop-blur-3xl shadow-lg">
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

            <div className="flex gap-2.5 pt-4 mt-2 border-t border-[var(--nav-border)]">
              <a
                href="http://localhost:3000/auth"
                className="nav-btn-login flex-1 justify-center text-center"
              >
                Login
              </a>
              <a
                href="#portals"
                className="nav-btn-book flex-1 justify-center text-center"
                onClick={() => setIsOpen(false)}
              >
                Book a Therapy
              </a>
            </div>

            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-2 mt-1 rounded-lg text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--accent-light)] transition-colors"
            >
              {theme === 'light'
                ? <><Moon size={15} /> Switch to Dark Mode</>
                : <><Sun size={15} className="text-amber-400" /> Switch to Light Mode</>
              }
            </button>
          </div>
        )}
      </nav>

      {/* Floating theme FAB */}
      <button
        onClick={toggleTheme}
        title="Toggle dark/light mode"
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full border-[1.5px] border-[var(--nav-border)] bg-[var(--bg-card)] text-[var(--text-primary)] flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 active:scale-100 transition-all duration-200"
      >
        {theme === 'light' ? <Moon size={16} /> : <Sun size={16} className="text-amber-400" />}
      </button>
    </>
  );
}