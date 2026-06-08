import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import LandingPage from "./pages/LandingPage";
import PortalHub from "./pages/PortalHub";

function AppContent() {
  const [showLanding, setShowLanding] = useState(true);

  if (showLanding) {
    return <LandingPage onOpenHub={() => setShowLanding(false)} />;
  }

  return <PortalHub onBack={() => setShowLanding(true)} />;
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
