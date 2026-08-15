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
    title: 'Maderas nobles del monte chaqueño',
    text: 'Seleccionamos cada pieza de madera y calabaza pensando en durabilidad y belleza natural.',
    icon: <path d="M12 3v18M12 3c-3 2-5 5-5 9s2 6 5 6c3 0 5-2 5-6s-2-7-5-9Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: 'Cuidado en cada detalle',
    text: 'Curamos cada mate antes de enviarlo, listo para que lo estrenes sin vueltas.',
    icon: <path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: 'Trato directo, sin vueltas',
    text: 'Coordinamos tu pedido y cualquier consulta directo por WhatsApp, de persona a persona.',
    icon: <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.55L4 20l1.05-4.45A8.5 8.5 0 1 1 21 11.5Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
]

export default function AboutValues() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-olive">
          Quiénes somos
        </span>
        <h2 className="font-display mt-3 text-4xl sm:text-5xl">MATE A MATE, DESDE CHACO</h2>
        <p className="mt-5 font-body text-ink/70">
          Somos Encantado Mates, un taller artesanal en Resistencia dedicado a
          tallar mates, termos y bombillas. Empezamos por el gusto de trabajar
          la madera con las manos, y hoy seguimos el mismo proceso cuidado de
          siempre: cada pieza se hace de a una, para una sola persona.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((value, i) => (
          <Reveal key={value.title} delay={i * 90} className="rounded-2xl bg-white/50 p-6 shadow-sm ring-1 ring-ink/5">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-terracotta" fill="none" stroke="currentColor" strokeWidth="1.6">
              {value.icon}
            </svg>
            <h3 className="font-body mt-4 text-base font-semibold">{value.title}</h3>
            <p className="mt-2 font-body text-sm text-ink/65">{value.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
