import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../lib/whatsapp.js'
import QuantitySelector from './QuantitySelector.jsx'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  const available = product.in_stock && product.stock > 0

  function handleAdd() {
    addItem(product, qty)
    setJustAdded(true)
    setQty(1)
    setTimeout(() => setJustAdded(false), 1600)
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-[28px] bg-white/40 shadow-sm ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-warm-lg">
      <div className="bg-wood relative aspect-square overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <img src="/logo-mark.png" alt="" className="h-20 w-20 opacity-40" />
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

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-xl tracking-wide">{product.name}</h3>
        {product.description && (
          <p className="font-body text-sm text-ink/65 line-clamp-2">{product.description}</p>
        )}

        <div className="mt-1 flex items-baseline justify-between">
          <span className="font-body text-lg font-semibold italic text-terracotta">
            {formatPrice(product.price)}
          </span>
          {available && (
            <span className="font-body text-xs text-ink/50">{product.stock} disponibles</span>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          {available ? (
            <>
              <QuantitySelector value={qty} onChange={setQty} max={product.stock} size="sm" />
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 rounded-full px-4 py-2.5 font-body text-sm font-semibold uppercase tracking-wide text-cream shadow-warm transition-all active:scale-95 ${
                  justAdded ? 'bg-olive' : 'bg-ink hover:bg-terracotta'
                }`}
              >
                {justAdded ? 'Agregado ✓' : 'Agregar'}
              </button>
            </>
          ) : (
            <button
              type="button"
              disabled
              className="w-full rounded-full bg-ink/10 px-4 py-2.5 font-body text-sm font-semibold uppercase tracking-wide text-ink/40"
            >
              No disponible
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
