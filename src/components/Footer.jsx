import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#productos', label: 'Productos' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
]

const INFO_ITEMS = ['Envíos y entregas', 'Cuidados del mate', 'Preguntas frecuentes']

export default function Footer() {
  return (
    <footer className="bg-olive-dark text-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-14 sm:px-8 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1">
          <Logo height="h-11" className="brightness-0 invert" />
          <p className="mt-4 font-body text-sm text-cream/60">
            Resistencia, Chaco, Argentina
            <br />
            Taller artesanal
          </p>
        </div>

        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
            Navegación
          </h4>
          <ul className="mt-4 flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="font-body text-sm text-cream/75 transition-colors hover:text-terracotta">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
            Información
          </h4>
          <ul className="mt-4 flex flex-col gap-2.5">
            {INFO_ITEMS.map((item) => (
              <li key={item} className="font-body text-sm text-cream/75">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
            Seguinos
          </h4>
          <div className="mt-4 flex gap-3">
            <a
              href="https://www.instagram.com/encantadomates/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-terracotta hover:text-terracotta"
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://wa.me/5493624716035"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-terracotta hover:text-terracotta"
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor">
                <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.85 14.24c-.25.7-1.24 1.28-2.02 1.44-.54.11-1.24.2-3.6-.77-3.02-1.25-4.97-4.32-5.12-4.52-.15-.2-1.22-1.62-1.22-3.09s.75-2.19 1.02-2.49c.25-.28.55-.35.73-.35h.53c.17 0 .4-.02.62.48.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.18-.32.4-.45.53-.15.15-.31.32-.13.62.17.3.77 1.27 1.65 2.06 1.14 1.02 2.1 1.34 2.4 1.49.3.15.47.13.65-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.75.83 2.05.98.3.15.5.23.57.35.08.13.08.72-.17 1.42Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-center sm:flex-row sm:px-8 sm:text-left">
          <p className="font-body text-xs text-cream/40">
            © {new Date().getFullYear()} Encantado Mates. Todos los derechos reservados.
          </p>
          <Link to="/admin" className="font-body text-xs text-cream/30 transition-colors hover:text-cream/60">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
