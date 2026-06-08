import { useState } from 'react';
import { MapPin, Check, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const [location, setLocation] = useState('Toronto, ON');

  const handleChangeLocation = () => {
    const newLocation = prompt('Enter your city / province:', location);
    if (newLocation && newLocation.trim() !== '') {
      setLocation(newLocation.trim());
    }
  };

  return (
    <section
      className="hero relative min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-center transition-colors duration-300 px-4 sm:px-6 py-6 sm:py-12 overflow-hidden"
      style={{
        background: 'linear-gradient(rgba(10, 18, 36, 0.78), rgba(10, 18, 36, 0.92)), url("https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1600&auto=format&fit=crop") center/cover no-repeat',
        PaddingTop: 'clamp(60px, 8vw, 100px)'
      }}
    >
      {/* Decorative glows overlaying the photo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#98c454] rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#98c454] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      {/* Main Centered Content */}
      <div className="relative max-w-4xl mx-auto z-10 flex flex-col items-center text-center w-full gap-6 sm:gap-8 pb-8 flex-shrink-0">
        {/* Centered Badge */}
        <div className="inline-flex items-center gap-2 bg-[#98c454]/15 border border-[#98c454]/30 rounded-full px-5 py-2.5 w-fit shadow-sm flex-shrink-0">
          <span className="w-2 h-2 bg-[#98c454] rounded-full animate-pulse"></span>
          <span className="text-gray-200 text-xs sm:text-sm font-semibold tracking-wide">Canada's Premier Massage Therapy Platform</span>
        </div>

        {/* Centered Headline */}
        <h1
          className="font-bold text-white leading-tight select-none px-2 flex-shrink-0"
          style={{
            fontSize: 'clamp(2rem, 5.5vw, 4rem)',
            fontFamily: "'Manrope', sans-serif",
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}
        >
          Professional Massage<br />
          <span className="bg-gradient-to-r from-[#98c454] via-emerald-300 to-[#c5e693] bg-clip-text text-transparent">
            Delivered Your Way
          </span>
        </h1>

        {/* Centered Subtitle */}
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed select-none px-4 flex-shrink-0">
          Book verified massage therapists instantly. Choose <span className="text-[#98c454] font-semibold">home</span>, <span className="text-[#98c454] font-semibold">mobile</span>, or <span className="text-[#98c454] font-semibold">clinic</span>. Transparent pricing. Professional service. Complete wellness.
        </p>

        {/* Centered CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto px-4 max-w-md sm:max-w-none flex-shrink-0">
          <a
            href="#portals"
            className="bg-[#98c454] hover:bg-[#87b043] text-slate-900 font-bold text-sm px-8 py-3.5 rounded-full transition-all shadow-md active:scale-95 text-center flex items-center justify-center min-w-[200px]"
            style={{ borderRadius: '100px' }}
          >
            Book a Massage Now
          </a>
          <a
            href="#services"
            className="border border-white/30 hover:border-white text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all backdrop-blur-sm shadow-sm text-center flex items-center justify-center min-w-[200px]"
            style={{ borderRadius: '100px' }}
          >
            Explore Services
          </a>
        </div>

        {/* Centered Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs md:text-sm text-gray-300 px-4 mb-6 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Check size={14} className="text-[#98c454]" />
            <span>Verified Therapists</span>
          </div>
          <div className="w-1.5 h-1.5 bg-gray-500 rounded-full hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <Check size={14} className="text-[#98c454]" />
            <span>Instant Booking</span>
          </div>
          <div className="w-1.5 h-1.5 bg-gray-500 rounded-full hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <Check size={14} className="text-[#98c454]" />
            <span>Transparent Pricing</span>
          </div>
        </div>
      </div>

      {/* Bottom Location Bar (Overlayed & Responsive) */}
      <div
        className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-2 px-4 sm:px-6 py-3 border transition-all duration-300 text-xs sm:text-sm select-none rounded-2xl sm:rounded-full max-w-[90%] sm:max-w-none text-center flex-shrink-0"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderColor: 'rgba(255, 255, 255, 0.15)',
          color: '#e2e8f0',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <MapPin size={15} className="text-[#98c454]" />
        <span>Active Coverage:</span>
        <button className="font-bold text-white hover:text-[#98c454] transition-colors" onClick={handleChangeLocation}>{location}</button>
        <span className="opacity-40">•</span>
        <button className="font-bold text-[#98c454] hover:text-[#87b043] transition-colors" onClick={handleChangeLocation}>Change Location</button>
      </div>

      {/* Bounce scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce pointer-events-none opacity-40 flex-shrink-0">
        <ChevronDown size={14} className="text-[#98c454]" />
      </div>
    </section>
  );
}
