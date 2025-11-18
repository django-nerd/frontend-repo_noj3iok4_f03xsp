export default function Services() {
  const services = [
    {
      title: 'Estrategia & Branding',
      desc: 'Definimos identidad, tono y propuesta de valor para destacar en tu mercado.',
    },
    {
      title: 'Sitios Web & Ecommerce',
      desc: 'Diseño y desarrollo de experiencias rápidas, modernas y enfocadas en conversión.',
    },
    {
      title: 'Ads & Performance',
      desc: 'Campañas en Google, Meta y TikTok con optimización continua y reportes claros.',
    },
    {
      title: 'Contenido & Social',
      desc: 'Calendarios, producción y gestión de redes con storytelling que conecta.',
    },
  ]

  return (
    <section id="servicios" className="relative bg-black text-white">
      <div className="container mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold">Servicios</h2>
        <p className="text-white/70 mt-2 max-w-2xl">Soluciones integrales de marketing digital para marcas que quieren crecer.</p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.title} className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="text-white/70 mt-2 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
