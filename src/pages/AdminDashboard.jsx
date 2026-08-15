import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, PRODUCTS_TABLE } from '../lib/supabaseClient.js'
import { useAuth } from '../context/AuthContext.jsx'
import Logo from '../components/Logo.jsx'
import ProductForm from '../admin/ProductForm.jsx'
import ProductTable from '../admin/ProductTable.jsx'

export default function AdminDashboard() {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showProductForm, setShowProductForm] = useState(false)

  async function fetchProducts() {
    setLoadingProducts(true)
    const { data } = await supabase
      .from(PRODUCTS_TABLE)
      .select('*')
      .order('created_at', { ascending: false })
    setProducts(data ?? [])
    setLoadingProducts(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  async function handleToggleStock(product) {
    await supabase.from(PRODUCTS_TABLE).update({ in_stock: !product.in_stock }).eq('id', product.id)
    fetchProducts()
  }

  async function handleDeleteProduct(product) {
    if (!window.confirm(`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`)) return
    await supabase.from(PRODUCTS_TABLE).delete().eq('id', product.id)
    fetchProducts()
  }

  async function handleSignOut() {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen">
      <header className="glass sticky top-0 z-30 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Logo height="h-10" />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="rounded-full border border-ink/15 px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide text-ink/70 transition-colors hover:bg-ink/5"
            >
              Ver sitio
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full bg-ink px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide text-cream transition-transform hover:scale-105"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-olive">
              Catálogo
            </span>
            <h1 className="font-display mt-1 text-3xl text-olive-dark">PRODUCTOS</h1>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingProduct(null)
              setShowProductForm(true)
            }}
            className="rounded-full bg-terracotta px-5 py-2.5 font-body text-sm font-semibold uppercase tracking-wide text-cream shadow-warm transition-transform hover:scale-105 active:scale-95"
          >
            + Nuevo producto
          </button>
        </div>

        {loadingProducts ? (
          <div className="grid gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-2xl bg-ink/5" />
            ))}
          </div>
        ) : (
          <ProductTable
            products={products}
            onEdit={(p) => {
              setEditingProduct(p)
              setShowProductForm(true)
            }}
            onDelete={handleDeleteProduct}
            onToggleStock={handleToggleStock}
          />
        )}
      </main>

      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => setShowProductForm(false)}
          onSaved={() => {
            setShowProductForm(false)
            fetchProducts()
          }}
        />
      )}
    </div>
  )
}
