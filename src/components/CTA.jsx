export default function CTA() {
  return (
    <section id="contacto" className="bg-black text-white">
      <div className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">¿Listo para impulsar tu marca?</h2>
        <p className="text-white/70 mt-3">Agenda una llamada y armemos tu plan en menos de 30 minutos.</p>
        <a
          href="mailto:hola@impulsa.agency?subject=Quiero%20impulsar%20mi%20marca"
          className="inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-4 font-medium mt-8 hover:opacity-90 transition"
        >
          Escríbenos
        </a>
      </div>
    </section>
  )
}
