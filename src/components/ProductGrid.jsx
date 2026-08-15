import { useEffect, useMemo, useState } from 'react'
import { supabase, PRODUCTS_TABLE, PRODUCT_CATEGORIES } from '../lib/supabaseClient.js'
import ProductCard from './ProductCard.jsx'
import Reveal from './Reveal.jsx'

export default function ProductGrid() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('todos')
  const [search, setSearch] = useState('')

  useEffect(() => {
    let active = true

    async function fetchProducts() {
      setLoading(true)
      const { data, error } = await supabase
        .from(PRODUCTS_TABLE)
        .select('*')
        .order('created_at', { ascending: false })

      if (!active) return
      if (error) setError(error.message)
      else setProducts(data ?? [])
      setLoading(false)
    }

    fetchProducts()
    return () => {
      active = false
    }
  }, [])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === 'todos' || p.category === category
      const matchesSearch = p.name.toLowerCase().includes(search.trim().toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [products, category, search])

  return (
    <section id="productos" className="section-anchor mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal className="mb-10 text-center">
        <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-olive">
          Catálogo
        </span>
        <h2 className="font-display mt-3 text-4xl sm:text-5xl">NUESTROS PRODUCTOS</h2>
        <p className="mx-auto mt-3 max-w-md font-body text-ink/60">
          Piezas únicas, torneadas y curadas a mano. El stock se actualiza en
          tiempo real.
        </p>
      </Reveal>

      <Reveal delay={100} className="mb-8 flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setCategory('todos')}
            className={`rounded-full px-4 py-2 font-body text-sm font-semibold transition-colors ${
              category === 'todos' ? 'bg-ink text-cream' : 'bg-ink/5 text-ink/70 hover:bg-ink/10'
            }`}
          >
            Todos
          </button>
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setCategory(cat.value)}
              className={`rounded-full px-4 py-2 font-body text-sm font-semibold transition-colors ${
                category === cat.value ? 'bg-ink text-cream' : 'bg-ink/5 text-ink/70 hover:bg-ink/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre…"
            className="w-full rounded-full border border-ink/15 bg-white/60 py-2.5 pl-10 pr-4 font-body text-sm outline-none transition-colors focus:border-olive"
          />
        </div>
      </Reveal>

      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] animate-pulse rounded-[28px] bg-ink/5" />
          ))}
        </div>
      )}

      {error && !loading && (
        <p className="rounded-2xl bg-terracotta/10 p-6 text-center font-body text-terracotta">
          No pudimos cargar el catálogo. {error}
        </p>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="rounded-2xl bg-ink/5 p-10 text-center font-body text-ink/60">
          Todavía no hay productos cargados. ¡Muy pronto vas a ver nuestros mates acá!
        </p>
      )}

      {!loading && !error && products.length > 0 && filtered.length === 0 && (
        <p className="rounded-2xl bg-ink/5 p-10 text-center font-body text-ink/60">
          No encontramos productos que coincidan con esa búsqueda.
        </p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <Reveal key={product.id} delay={(i % 3) * 90}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}
