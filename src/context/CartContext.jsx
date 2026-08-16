import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'encantado-mates-cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addItem(product, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      const maxQty = product.stock ?? Infinity

      if (existing) {
        const nextQty = Math.min(existing.quantity + quantity, maxQty)
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
                stock: product.stock,
                category: product.category,
                category_name: product.category_name ?? product.category,
                quantity: nextQty,
              }
            : item
        )
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image_url: product.image_url,
          stock: product.stock,
          category: product.category,
          category_name: product.category_name ?? product.category,
          quantity: Math.min(quantity, maxQty),
        },
      ]
    })
    setIsOpen(true)
  }

  function updateQuantity(productId, quantity) {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((item) => item.id !== productId)
      return prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(quantity, item.stock ?? Infinity) }
          : item
      )
    })
  }

  function removeItem(productId) {
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }

  function clearCart() {
    setItems([])
  }

  function syncCatalog(products, categories) {
    const productsById = new Map(products.map((product) => [product.id, product]))
    const categoryNames = new Map(categories.map((category) => [category.slug, category.name]))

    setItems((prev) =>
      prev.map((item) => {
        const product = productsById.get(item.id)
        if (!product) return item

        return {
          ...item,
          name: product.name,
          price: product.price,
          image_url: product.image_url,
          stock: product.stock,
          category: product.category,
          category_name: categoryNames.get(product.category) ?? product.category,
        }
      })
    )
  }

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  )

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [items]
  )

  const value = {
    items,
    itemCount,
    total,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    toggleCart: () => setIsOpen((prev) => !prev),
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    syncCatalog,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}
