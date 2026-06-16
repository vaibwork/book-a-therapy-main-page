import { ThemeProvider } from "./context/ThemeContext";
import WhoAreYou from "./pages/WhoAreYou";

// Minimal main page: a single "Who are you?" portal picker.
// (The old marketing LandingPage / rich PortalHub remain in the repo but are
// no longer mounted — restore them here if ever needed.)
function App() {
  return (
    <ThemeProvider>
      <WhoAreYou />
    </ThemeProvider>
  );
}

export default App;
