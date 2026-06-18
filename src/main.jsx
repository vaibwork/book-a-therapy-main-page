import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// In the native (Capacitor) shell, hide the splash screen as soon as the hub has
// painted — so there is no black/blank gap while the live site loads. Harmless on
// the web (window.Capacitor is undefined there).
requestAnimationFrame(() => {
  try {
    window.Capacitor?.Plugins?.SplashScreen?.hide?.()
  } catch {
    /* not running in the native shell */
  }
})
