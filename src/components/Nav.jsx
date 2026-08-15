import { useState } from 'react'
import Logo from './Logo.jsx'
import CartButton from './CartButton.jsx'
import { useActiveSection } from '../hooks/useActiveSection.js'

const LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'productos', label: 'Productos' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'clientes', label: 'Clientes' },
  { id: 'contacto', label: 'Contacto' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(LINKS.map((l) => l.id))

  function handleLinkClick() {
    setOpen(false)
  }

  return (
    <header className="nav-surface sticky top-0 z-40 border-b border-ink/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a href="#inicio" className="shrink-0 transition-opacity hover:opacity-80">
          <Logo height="h-9 sm:h-10" />
        </a>

        <nav className="hidden items-center gap-4 lg:gap-7 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative font-body text-xs font-semibold uppercase tracking-wide transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:bg-terracotta after:transition-all lg:text-sm ${
                active === link.id
                  ? 'text-terracotta after:w-full'
                  : 'text-ink/70 after:w-0 hover:text-ink'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CartButton />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-ink/5 md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink/10 px-5 py-3 md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={handleLinkClick}
              className={`rounded-xl px-4 py-2.5 font-body text-sm font-semibold uppercase tracking-wide ${
                active === link.id ? 'bg-ink text-cream' : 'text-ink/70'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
