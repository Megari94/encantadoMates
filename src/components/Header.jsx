import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import CartButton from './CartButton.jsx'

export default function Header() {
  return (
    <header className="sticky top-0 z-40">
      <div className="glass shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link to="/" className="transition-transform hover:scale-[1.02]">
            <Logo markClassName="h-10 w-10 sm:h-12 sm:w-12" />
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="https://www.instagram.com/encantadomates/"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 font-body text-sm font-medium text-ink/80 transition-colors hover:text-terracotta sm:flex"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
              </svg>
              @encantadomates
            </a>
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  )
}
