import Reveal from './Reveal.jsx'

export default function Hero() {
  return (
    <section id="inicio" className="section-anchor relative px-3 pb-5 pt-3 sm:px-5 sm:pb-8">
      <div className="hero-shell relative mx-auto grid max-w-7xl items-center gap-8 overflow-hidden rounded-[30px] sm:rounded-[40px] lg:min-h-[650px] lg:grid-cols-[0.82fr_1.18fr] lg:gap-0">
        <Reveal className="relative z-10 px-6 pt-14 text-center sm:px-10 sm:pt-16 lg:py-20 lg:pl-14 lg:pr-8 lg:text-left xl:pl-20">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
            Resistencia, Chaco, Argentina
          </span>

          <h1 className="font-display mt-5 text-5xl leading-[0.92] text-olive-dark drop-shadow-[0_2px_0_rgba(255,255,255,.65)] sm:text-6xl lg:text-[4.6rem] xl:text-[5.15rem]">
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
              className="rounded-full bg-terracotta px-7 py-3.5 font-body text-xs font-semibold uppercase tracking-[0.08em] text-cream shadow-[0_12px_28px_-12px_rgba(196,122,92,.75)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#b96e51] hover:shadow-[0_18px_35px_-12px_rgba(196,122,92,.85)] active:translate-y-0"
            >
              Ver catálogo
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-ink/20 bg-white/25 px-7 py-3.5 font-body text-xs font-semibold uppercase tracking-[0.08em] text-ink/80 shadow-[inset_0_1px_0_rgba(255,255,255,.8)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-olive hover:bg-white/55"
            >
              Hacer una consulta
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative h-[430px] sm:h-[540px] lg:h-[650px]">
          <img
            src="/hero-mate.jpg"
            alt="Mate artesanal Encantado Mates"
            className="hero-photo-mask h-full w-full object-cover object-[72%_center] transition-transform duration-[1200ms] ease-out hover:scale-[1.025]"
          />

          <div className="glass absolute bottom-6 left-4 flex items-center gap-3 rounded-[18px] px-5 py-4 shadow-[0_20px_45px_-20px_rgba(26,24,21,.55)] sm:bottom-10 sm:left-8">
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
