import { useCart } from '../context/CartContext.jsx'

export default function CartButton() {
  const { itemCount, toggleCart } = useCart()

  return (
    <button
      type="button"
      onClick={toggleCart}
      aria-label="Abrir carrito"
      className="relative flex h-11 w-11 items-center justify-center rounded-full bg-olive text-cream shadow-warm transition-transform hover:scale-105 active:scale-95"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 7h1.5l1.6 9.6a2 2 0 0 0 2 1.7h7.4a2 2 0 0 0 2-1.6L20 9H7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="20.5" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="16.5" cy="20.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1 font-body text-xs font-bold text-cream">
          {itemCount}
        </span>
      )}
    </button>
  )
}
