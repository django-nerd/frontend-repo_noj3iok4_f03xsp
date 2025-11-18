import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-30 bg-black/60 backdrop-blur border-b border-white/10">
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between text-white">
        <a href="#" className="font-bold tracking-tight text-white">I’m Pulsa</a>
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#servicios" className="hover:text-white/70">Servicios</a>
          <a href="#proyectos" className="hover:text-white/70">Proyectos</a>
          <a href="#equipo" className="hover:text-white/70">Equipo</a>
          <a href="#contacto" className="hover:text-white/70">Contacto</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded hover:bg-white/10">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/90 text-white">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
            <a href="#servicios" className="hover:text-white/70">Servicios</a>
            <a href="#proyectos" className="hover:text-white/70">Proyectos</a>
            <a href="#equipo" className="hover:text-white/70">Equipo</a>
            <a href="#contacto" className="hover:text-white/70">Contacto</a>
          </div>
        </div>
      )}
    </header>
  )
}
