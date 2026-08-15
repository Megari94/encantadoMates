import Reveal from './Reveal.jsx'

export default function Hero() {
  return (
    <section id="inicio" className="section-anchor relative overflow-hidden">
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-0">
        <Reveal className="relative z-10 px-5 pt-14 text-center sm:px-8 sm:pt-16 lg:py-16 lg:pr-10 lg:text-left">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
            Resistencia, Chaco, Argentina
          </span>

          <h1 className="font-display mt-5 text-5xl leading-[0.95] sm:text-6xl lg:text-[4.25rem]">
            MATES ARTESANALES
            <br />
            <span className="text-terracotta">CON ALMA</span>
          </h1>

          <span className="divider-diamond mx-auto my-6 lg:mx-0" />

          <p className="mx-auto max-w-md font-body text-base text-ink/70 sm:text-lg lg:mx-0">
            Tallamos y curamos cada mate a mano, pieza por pieza. Elegí el tuyo
            en el catálogo o escribinos si tenés una consulta.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href="#productos"
              className="rounded-full bg-terracotta px-7 py-3 font-body text-sm font-semibold uppercase tracking-wide text-cream shadow-warm transition-transform hover:scale-105 active:scale-95"
            >
              Ver catálogo
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-ink/20 px-7 py-3 font-body text-sm font-semibold uppercase tracking-wide text-ink/80 transition-colors hover:border-ink/40 hover:bg-ink/5"
            >
              Hacer una consulta
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative h-[420px] sm:h-[520px] lg:h-[620px]">
          <img
            src="/hero-mate.jpg"
            alt="Mate artesanal Encantado Mates"
            className="hero-photo-mask h-full w-full object-cover"
          />

          <div className="glass absolute bottom-6 left-4 flex items-center gap-3 rounded-2xl px-5 py-4 shadow-warm-lg sm:bottom-10 sm:left-8">
            <span className="font-display text-3xl text-terracotta">100%</span>
            <span className="font-body text-xs font-semibold uppercase leading-tight text-ink/70">
              Hecho
              <br />a mano
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
