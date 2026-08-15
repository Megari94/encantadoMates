import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Logo from '../components/Logo.jsx'

export default function AdminLogin() {
  const { session, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  if (session) return <Navigate to="/admin" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) {
      setError('Email o contraseña incorrectos.')
      return
    }
    navigate('/admin')
  }

  return (
    <div className="bg-wood relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
      <div className="pointer-events-none absolute inset-0 bg-ink/50" />

      <div className="glass relative w-full max-w-sm rounded-[28px] p-8 shadow-warm-lg">
        <div className="mb-8 flex justify-center">
          <Logo height="h-14" />
        </div>

        <h1 className="mb-1 text-center font-display text-2xl">PANEL DE ADMINISTRACIÓN</h1>
        <p className="mb-6 text-center font-body text-sm text-ink/60">
          Ingresá con tu cuenta para gestionar el catálogo.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1 block font-body text-xs font-semibold uppercase tracking-wide text-ink/60">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-white/50 px-4 py-2.5 font-body text-sm outline-none transition-colors focus:border-olive"
              placeholder="admin@encantadomates.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block font-body text-xs font-semibold uppercase tracking-wide text-ink/60">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-white/50 px-4 py-2.5 font-body text-sm outline-none transition-colors focus:border-olive"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-terracotta/10 px-3 py-2 font-body text-sm text-terracotta">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-ink px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide text-cream shadow-warm transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-ink/10" />
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">o</span>
          <span className="h-px flex-1 bg-ink/10" />
        </div>

        <Link
          to="/"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-ink/20 bg-white/25 px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide text-ink/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-olive hover:bg-white/55"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Ir al sitio
        </Link>
      </div>
    </div>
  )
}
