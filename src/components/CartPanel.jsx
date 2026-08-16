import { useCart } from '../context/CartContext.jsx'
import { formatPrice, buildWhatsAppOrderUrl } from '../lib/whatsapp.js'
import QuantitySelector from './QuantitySelector.jsx'

export default function CartPanel() {
  const { items, total, isOpen, closeCart, updateQuantity, removeItem, clearCart } = useCart()

  function handleCheckout() {
    const url = buildWhatsAppOrderUrl(items, total)
    window.open(url, '_blank', 'noopener,noreferrer')
    clearCart()
    closeCart()
  }

  function handleContinueShopping() {
    closeCart()
    window.setTimeout(() => {
      document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })
    }, 380)
  }

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />

      <aside
        className={`glass fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col shadow-warm-lg transition-transform duration-[380ms] ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Carrito de compras"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="font-display text-2xl">TU CARRITO</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-ink/10"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <img src="/logo-mark.png" alt="" className="h-16 w-16 opacity-30" />
              <p className="font-body text-ink/60">Tu carrito está vacío.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 rounded-2xl bg-white/40 p-3">
                  <div className="bg-wood h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                    {item.image_url && (
                      <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-body text-sm font-semibold leading-tight">{item.name}</h3>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Quitar ${item.name}`}
                        className="text-ink/40 transition-colors hover:text-terracotta"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <QuantitySelector
                        value={item.quantity}
                        onChange={(q) => updateQuantity(item.id, q)}
                        max={item.stock ?? 99}
                        size="sm"
                      />
                      <span className="font-body text-sm font-semibold italic text-terracotta">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-ink/10 px-6 py-5">
            <div className="mb-4 flex items-center justify-between font-body">
              <span className="text-ink/70">Total</span>
              <span className="font-display text-2xl">{formatPrice(total)}</span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-olive px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-wide text-cream shadow-warm transition-transform hover:scale-[1.02] active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.85 14.24c-.25.7-1.24 1.28-2.02 1.44-.54.11-1.24.2-3.6-.77-3.02-1.25-4.97-4.32-5.12-4.52-.15-.2-1.22-1.62-1.22-3.09s.75-2.19 1.02-2.49c.25-.28.55-.35.73-.35h.53c.17 0 .4-.02.62.48.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.18-.32.4-.45.53-.15.15-.31.32-.13.62.17.3.77 1.27 1.65 2.06 1.14 1.02 2.1 1.34 2.4 1.49.3.15.47.13.65-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.75.83 2.05.98.3.15.5.23.57.35.08.13.08.72-.17 1.42Z" />
              </svg>
              Enviar pedido por WhatsApp
            </button>
            <button
              type="button"
              onClick={handleContinueShopping}
              className="mt-3 w-full rounded-full border border-ink/20 px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:border-olive hover:bg-white/40"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
