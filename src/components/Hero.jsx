import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full bg-black text-white overflow-hidden">
      {/* Spline background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/a6HhFsV3-DN9Z-yP/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Dark gradient overlay for contrast, let clicks pass through */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 py-24 flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70 mb-4">
          Agencia digital • Cancún
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight max-w-4xl">
          I’m Pulsa: Marketing digital que impulsa marcas con tecnología y creatividad
        </h1>
        <p className="mt-5 max-w-2xl text-white/80">
          Creamos experiencias modernas, campañas de alto impacto y sitios web que convierten.
          Somos tu equipo en Cancún para crecer en línea.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a href="#contacto" className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-3 font-medium transition hover:opacity-90">
            Hablemos
          </a>
          <a href="#servicios" className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 font-medium text-white hover:bg-white/10 transition">
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  )
}
