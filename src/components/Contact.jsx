import { buildWhatsAppInquiryUrl } from '../lib/whatsapp.js'
import Reveal from './Reveal.jsx'

export default function Contact() {
  return (
    <section id="contacto" className="section-anchor px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-olive">
            Contacto
          </span>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl">HABLEMOS</h2>
          <p className="mx-auto mt-3 max-w-md font-body text-ink/60">
            ¿Tenés una duda, querés un mate personalizado o simplemente
            preguntar algo? Escribinos, no hace falta que sea para comprar.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Reveal
            as="a"
            href={buildWhatsAppInquiryUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl bg-[#25D366]/10 p-6 ring-1 ring-[#25D366]/20 transition-transform hover:-translate-y-1"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.85 14.24c-.25.7-1.24 1.28-2.02 1.44-.54.11-1.24.2-3.6-.77-3.02-1.25-4.97-4.32-5.12-4.52-.15-.2-1.22-1.62-1.22-3.09s.75-2.19 1.02-2.49c.25-.28.55-.35.73-.35h.53c.17 0 .4-.02.62.48.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.18-.32.4-.45.53-.15.15-.31.32-.13.62.17.3.77 1.27 1.65 2.06 1.14 1.02 2.1 1.34 2.4 1.49.3.15.47.13.65-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.75.83 2.05.98.3.15.5.23.57.35.08.13.08.72-.17 1.42Z" />
              </svg>
            </span>
            <span>
              <span className="block font-body text-base font-semibold text-ink">WhatsApp</span>
              <span className="block font-body text-sm text-ink/60">Respuesta directa y rápida</span>
            </span>
          </Reveal>

          <Reveal
            as="a"
            delay={90}
            href="https://www.instagram.com/encantadomates/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl bg-terracotta/10 p-6 ring-1 ring-terracotta/20 transition-transform hover:-translate-y-1"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-terracotta text-cream">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <span>
              <span className="block font-body text-base font-semibold text-ink">@encantadomates</span>
              <span className="block font-body text-sm text-ink/60">Nuestras últimas piezas en Instagram</span>
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
