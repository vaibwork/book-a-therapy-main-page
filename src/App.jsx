import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { useConfig } from "./hooks/useConfig";
import LandingPage from "./pages/LandingPage";
import PortalHub from "./pages/PortalHub";

function AppContent() {
  const [showLanding, setShowLanding] = useState(true);
  const { customUrls } = useConfig();

  if (showLanding) {
    return (
      <LandingPage
        onOpenHub={() => setShowLanding(false)}
        customUrls={customUrls}
      />
    );
  }

  return (
    <PortalHub
      onBack={() => setShowLanding(true)}
      customUrls={customUrls}
    />
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
