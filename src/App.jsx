import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import CTA from './components/CTA'
import SplashCursor from './components/SplashCursor'

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Services />
      <CTA />
      {/* Splash cursor overlay */}
      <SplashCursor />
      {/* Footer */}
      <footer className="bg-black border-t border-white/10">
        <div className="container mx-auto px-6 py-10 text-sm text-white/60">
          © {new Date().getFullYear()} I’m Pulsa · Cancún, MX
        </div>
      </footer>
    </div>
  )
}

export default App
