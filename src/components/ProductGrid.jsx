import { useEffect, useState } from 'react'
import { supabase, PRODUCTS_TABLE } from '../lib/supabaseClient.js'
import ProductCard from './ProductCard.jsx'

export default function ProductGrid() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  return (
    <section id="catalogo" className="mx-auto max-w-6xl px-5 pb-24 pt-4 sm:px-8">
      <div className="mb-10 text-center">
        <h2 className="font-display text-4xl sm:text-5xl">NUESTRO CATÁLOGO</h2>
        <p className="mx-auto mt-3 max-w-md font-body text-ink/60">
          Piezas únicas, torneadas y curadas a mano. El stock se actualiza en
          tiempo real.
        </p>
      </div>

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

      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
