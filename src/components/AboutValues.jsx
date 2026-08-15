import Reveal from './Reveal.jsx'

const VALUES = [
  {
    title: 'Hecho 100% a mano',
    text: 'Cada mate se tornea, cura y pule a mano, sin moldes ni producción en serie.',
    icon: (
      <path d="M7 21c-1.5 0-3-1-3-3.5C4 14 7 12 7 9a5 5 0 0 1 10 0c0 3 3 5 3 8.5 0 2.5-1.5 3.5-3 3.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Maderas nobles',
    text: 'Seleccionamos cada pieza de madera pensando en durabilidad y belleza natural.',
    icon: <path d="M12 3v18M12 3c-3 2-5 5-5 9s2 6 5 6c3 0 5-2 5-6s-2-7-5-9Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: 'Cuidado en cada detalle',
    text: 'Curamos cada mate antes de enviarlo, listo para que lo estrenes sin vueltas.',
    icon: <path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: 'Trato directo',
    text: 'Coordinamos tu pedido y cualquier consulta directo por WhatsApp, de persona a persona.',
    icon: <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.55L4 20l1.05-4.45A8.5 8.5 0 1 1 21 11.5Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
]

export default function AboutValues() {
  return (
    <section id="nosotros" className="section-anchor bg-olive-dark px-5 py-16 text-cream sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
        <Reveal className="text-center lg:text-left">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-sage">
            Quiénes somos
          </span>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl">MATE A MATE, DESDE CHACO</h2>
          <span className="divider-diamond mx-auto my-6 lg:mx-0" />
          <p className="mx-auto max-w-md font-body text-cream/70 lg:mx-0">
            Somos Encantado Mates, un taller artesanal en Resistencia dedicado
            a tallar mates, termos y bombillas. Empezamos por el gusto de
            trabajar la madera con las manos, y hoy seguimos el mismo proceso
            cuidado de siempre: cada pieza se hace de a una, para una sola
            persona.
          </p>
        </Reveal>

        <Reveal delay={150} className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="blob-mask h-full w-full overflow-hidden">
            <img src="/artisan-hands.jpg" alt="Artesano puliendo un mate a mano" className="h-full w-full object-cover" />
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {VALUES.map((value, i) => (
          <Reveal key={value.title} delay={i * 90} className="rounded-2xl bg-sage p-5 text-ink sm:p-6">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-olive-dark" fill="none" stroke="currentColor" strokeWidth="1.6">
              {value.icon}
            </svg>
            <h3 className="font-body mt-4 text-sm font-semibold sm:text-base">{value.title}</h3>
            <p className="mt-2 font-body text-xs text-ink/65 sm:text-sm">{value.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
