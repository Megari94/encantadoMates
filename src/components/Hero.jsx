export default function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-14 sm:px-8 sm:pt-20">
      {/* Decorative organic color blobs */}
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 bg-sage/40 blur-2xl animate-float"
        style={{ borderRadius: '62% 38% 55% 45% / 45% 55% 45% 55%' }}
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 bg-blush/50 blur-2xl"
        style={{ borderRadius: '45% 55% 40% 60% / 55% 45% 55% 45%', animationDelay: '1.5s' }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
        <div className="relative z-10 text-center lg:text-left">
          <span className="inline-block rounded-full bg-olive/10 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-olive">
            Hecho a mano en Resistencia, Chaco
          </span>

          <h1 className="font-display mt-5 text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            MATES ARTESANALES
            <br />
            <span className="text-terracotta">CON ALMA</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md font-body text-base text-ink/70 sm:text-lg lg:mx-0">
            Cada mate de Encantado Mates se talla y cura a mano, pieza por
            pieza. Elegí el tuyo y hacenos tu pedido directo por WhatsApp.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href="#catalogo"
              className="rounded-full bg-terracotta px-7 py-3 font-body text-sm font-semibold uppercase tracking-wide text-cream shadow-warm transition-transform hover:scale-105 active:scale-95"
            >
              Ver catálogo
            </a>
            <a
              href="https://www.instagram.com/encantadomates/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-ink/20 px-7 py-3 font-body text-sm font-semibold uppercase tracking-wide text-ink/80 transition-colors hover:border-ink/40 hover:bg-ink/5"
            >
              Seguinos en Instagram
            </a>
          </div>
        </div>

        {/* Mate-shaped cutout showcasing a natural wood/leaf texture */}
        <div className="relative z-10 mx-auto aspect-[4/5] w-full max-w-sm lg:max-w-none">
          <svg viewBox="0 0 200 220" className="h-full w-full drop-shadow-[0_20px_40px_rgb(26_24_21_/_0.25)]">
            <defs>
              <clipPath id="mate-hero-mask" clipPathUnits="userSpaceOnUse">
                <path d="M40 66
                         C34 66 30 71 31 78
                         C33 96 30 104 22 112
                         C14 120 14 134 24 140
                         C22 150 28 162 42 168
                         C52 190 76 204 100 204
                         C124 204 148 190 158 168
                         C172 162 178 150 176 140
                         C186 134 186 120 178 112
                         C170 104 167 96 169 78
                         C170 71 166 66 160 66
                         C160 50 134 38 100 38
                         C66 38 40 50 40 66
                         Z" />
              </clipPath>
              <linearGradient id="wood-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#cbb89a" />
                <stop offset="55%" stopColor="#b89a72" />
                <stop offset="100%" stopColor="#8f7250" />
              </linearGradient>
            </defs>

            <g clipPath="url(#mate-hero-mask)">
              <rect x="0" y="0" width="200" height="220" fill="url(#wood-grad)" />
              {Array.from({ length: 14 }).map((_, i) => (
                <path
                  key={i}
                  d={`M-20 ${10 + i * 16} Q 100 ${i % 2 === 0 ? 4 : 26} 220 ${10 + i * 16}`}
                  stroke="#1A1815"
                  strokeOpacity="0.08"
                  strokeWidth="2"
                  fill="none"
                />
              ))}
              <circle cx="60" cy="70" r="34" fill="#6E775C" opacity="0.35" />
              <circle cx="150" cy="150" r="46" fill="#C47A5C" opacity="0.25" />
              <circle cx="140" cy="55" r="18" fill="#A7B58C" opacity="0.4" />
            </g>

            <path d="M40 66
                     C34 66 30 71 31 78
                     C33 96 30 104 22 112
                     C14 120 14 134 24 140
                     C22 150 28 162 42 168
                     C52 190 76 204 100 204
                     C124 204 148 190 158 168
                     C172 162 178 150 176 140
                     C186 134 186 120 178 112
                     C170 104 167 96 169 78
                     C170 71 166 66 160 66
                     C160 50 134 38 100 38
                     C66 38 40 50 40 66
                     Z"
                  fill="none" stroke="#1A1815" strokeWidth="3" />
          </svg>

          <img
            src="/logo-mark.svg"
            alt="Encantado Mates"
            className="absolute -bottom-4 -right-2 h-20 w-20 drop-shadow-lg sm:h-24 sm:w-24"
          />
        </div>
      </div>
    </section>
  )
}
