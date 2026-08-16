import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../lib/whatsapp.js'

export default function ProductCard({ product, categoryLabel }) {
  const { addItem } = useCart()
  const [justAdded, setJustAdded] = useState(false)

  const available = product.in_stock && product.stock > 0

  function handleAdd() {
    if (!available) return
    addItem({ ...product, category_name: categoryLabel ?? product.category }, 1)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }

  return (
    <article className="group flex flex-col transition-transform duration-500 hover:-translate-y-2">
      <div className="bg-wood relative aspect-[4/5] overflow-hidden rounded-[30px] shadow-[0_22px_55px_-30px_rgba(26,24,21,.65)] ring-1 ring-white/70 transition-shadow duration-500 group-hover:shadow-[0_34px_70px_-28px_rgba(26,24,21,.72)]">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <img src="/logo-mark.png" alt="" className="h-16 w-16 opacity-40" />
          </div>
        )}

        {!available && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/50 backdrop-blur-[2px]">
            <span className="rounded-full bg-cream px-4 py-1.5 font-body text-xs font-bold uppercase tracking-wide text-ink">
              Sin stock
            </span>
          </div>
        )}
      </div>

      <div className="relative -mt-7 mx-3 flex items-center justify-between gap-3 rounded-[20px] border border-white/80 bg-white/90 px-4 py-3.5 shadow-[0_18px_40px_-22px_rgba(26,24,21,.6),inset_0_1px_0_white] backdrop-blur-xl transition-shadow duration-500 group-hover:shadow-[0_24px_48px_-20px_rgba(26,24,21,.65)]">
        <div className="min-w-0">
          <h3 className="truncate font-body text-sm font-semibold sm:text-base">{product.name}</h3>
          <p className="truncate font-body text-xs text-ink/50">
            {categoryLabel ?? product.category}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <span className="font-body text-sm font-semibold italic text-terracotta">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!available}
            aria-label={`Agregar ${product.name} al carrito`}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-cream shadow-warm transition-all active:scale-90 disabled:cursor-not-allowed disabled:bg-ink/15 disabled:text-ink/30 disabled:shadow-none ${
              justAdded ? 'bg-olive' : 'bg-terracotta hover:scale-110'
            }`}
          >
            {justAdded ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
