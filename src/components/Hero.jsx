import Reveal from './Reveal.jsx'

export default function Hero() {
  return (
    <section id="inicio" className="section-anchor px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <Reveal className="text-center lg:text-left">
          <span className="inline-block rounded-full bg-olive/10 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-olive">
            Resistencia, Chaco, Argentina
          </span>

          <h1 className="font-display mt-5 text-5xl leading-[0.95] sm:text-6xl lg:text-[4.5rem]">
            MATES ARTESANALES
            <br />
            <span className="text-terracotta">CON ALMA</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md font-body text-base text-ink/70 sm:text-lg lg:mx-0">
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

        <Reveal delay={150} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="bg-wood relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-warm-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <img src="/logo-mark.png" alt="" className="h-32 w-32 opacity-90 drop-shadow-lg sm:h-40 sm:w-40" />
            </div>
          </div>

          <div className="glass absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-warm sm:-left-8">
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
