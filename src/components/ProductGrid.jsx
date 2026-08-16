import { useEffect, useMemo, useState } from 'react'
import { supabase, PRODUCTS_TABLE, CATEGORIES_TABLE } from '../lib/supabaseClient.js'
import ProductCard from './ProductCard.jsx'
import Reveal from './Reveal.jsx'
import { useCart } from '../context/CartContext.jsx'

const PAGE_SIZE = 6

export default function ProductGrid() {
  const { syncCatalog } = useCart()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('todos')
  const [search, setSearch] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  useEffect(() => {
    let active = true

    async function fetchProducts() {
      setLoading(true)
      const [{ data, error }, { data: categoryData, error: categoryError }] = await Promise.all([
        supabase.from(PRODUCTS_TABLE).select('*').order('created_at', { ascending: false }),
        supabase.from(CATEGORIES_TABLE).select('*').eq('active', true).order('sort_order'),
      ])

      if (!active) return
      if (error || categoryError) setError(error?.message ?? categoryError.message)
      else {
        setProducts(data ?? [])
        setCategories(categoryData ?? [])
        syncCatalog(data ?? [], categoryData ?? [])
      }
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

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [category, search])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  return (
    <section id="productos" className="section-anchor section-pattern relative px-5 py-16 sm:px-8 sm:py-24">
      <div className="relative z-10 mx-auto max-w-6xl">
      <Reveal className="mb-10 text-center">
        <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-olive">
          Catálogo
        </span>
        <h2 className="font-display mt-3 text-4xl sm:text-5xl">NUESTROS PRODUCTOS</h2>
        <span className="divider-diamond mx-auto my-5" />
        <p className="mx-auto max-w-md font-body text-ink/60">
          Piezas únicas, torneadas y curadas a mano. El stock se actualiza en
          tiempo real.
        </p>
      </Reveal>

      <Reveal delay={100} className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setCategory('todos')}
            className={`rounded-full px-4 py-2 font-body text-sm font-semibold transition-colors ${
              category === 'todos'
                ? 'bg-olive-dark text-cream'
                : 'border border-ink/15 text-ink/70 hover:border-ink/30'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.slug)}
              className={`rounded-full px-4 py-2 font-body text-sm font-semibold transition-colors ${
                category === cat.slug
                  ? 'bg-olive-dark text-cream'
                  : 'border border-ink/15 text-ink/70 hover:border-ink/30'
              }`}
            >
              {cat.name}
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
            className="w-full rounded-full border border-ink/10 bg-white/70 py-3 pl-10 pr-4 font-body text-sm shadow-[0_10px_30px_-22px_rgba(26,24,21,.5),inset_0_1px_0_rgba(255,255,255,.9)] outline-none backdrop-blur-sm transition-all focus:border-olive focus:bg-white focus:shadow-[0_14px_35px_-20px_rgba(51,54,31,.55)]"
          />
        </div>
      </Reveal>

      {loading && (
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] animate-pulse rounded-[28px] bg-ink/5" />
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

      {!loading && !error && visible.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product, i) => (
              <Reveal key={product.id} delay={(i % 3) * 90}>
                <ProductCard
                  product={product}
                  categoryLabel={categories.find((cat) => cat.slug === product.category)?.name}
                />
              </Reveal>
            ))}
          </div>

          {hasMore && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                className="rounded-full bg-terracotta px-7 py-3 font-body text-sm font-semibold uppercase tracking-wide text-cream shadow-warm transition-transform hover:scale-105 active:scale-95"
              >
                Ver catálogo completo
              </button>
            </div>
          )}
        </>
      )}
      </div>
    </section>
  )
}
