import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/sections/HeroSection";
import About from "../components/sections/About";
import Footer from "../components/layout/Footer";
import { PortalCard } from "../components/ui/PortalCard";
import { PORTALS_DATA } from "../constants/portals";
import { useTheme } from "../context/ThemeContext";

const LandingPage = ({ onOpenHub, customUrls }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="transition-colors duration-300 min-h-screen flex flex-col">
      <Navbar theme={theme} setTheme={setTheme} />
      <HeroSection />
      <About />

      {/* Portal Selection Section */}
      <section id="portals" className="section portals transition-colors duration-300">
        <div className="section__inner">
          <div className="text-center" style={{ marginBottom: "56px" }}>
            <span className="section__label">Match. Relax. Thrive.</span>
            <h2 className="section__heading">Access Your Dedicated Portal</h2>
            <p className="section__sub" style={{ margin: "0 auto" }}>
              Select your role below to access your tailored workspace in the
              Book a Therapy platform.
            </p>
            <button
              onClick={onOpenHub}
              className="btn-lime-sm"
              style={{ marginTop: "24px", cursor: "pointer" }}
            >
              Open Portal Hub View →
            </button>
          </div>

          <div className="portals__grid">
            {PORTALS_DATA.map((portal, i) => (
              <PortalCard
                key={portal.id}
                portal={portal}
                index={i}
                url={customUrls[portal.id]}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
