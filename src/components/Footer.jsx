import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="relative border-t border-ink/10 bg-ink text-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-12 text-center sm:px-8">
        <Logo height="h-11" className="brightness-0 invert" />

        <p className="max-w-sm font-body text-sm text-cream/60">
          Mates artesanales torneados a mano en Resistencia, Chaco, Argentina.
        </p>

        <div className="flex items-center gap-5 font-body text-sm">
          <a
            href="https://www.instagram.com/encantadomates/"
            target="_blank"
            rel="noreferrer"
            className="text-cream/80 transition-colors hover:text-terracotta"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/5493624716035"
            target="_blank"
            rel="noreferrer"
            className="text-cream/80 transition-colors hover:text-terracotta"
          >
            WhatsApp
          </a>
          <Link to="/admin" className="text-cream/40 transition-colors hover:text-cream/70">
            Admin
          </Link>
        </div>

        <p className="font-body text-xs text-cream/30">
          © {new Date().getFullYear()} Encantado Mates. Hecho con cariño en Chaco.
        </p>
      </div>
    </footer>
  )
}
