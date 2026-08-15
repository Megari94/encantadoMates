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
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showForm, setShowForm] = useState(false)

  async function fetchProducts() {
    setLoading(true)
    const { data } = await supabase
      .from(PRODUCTS_TABLE)
      .select('*')
      .order('created_at', { ascending: false })
    setProducts(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  function openNewForm() {
    setEditingProduct(null)
    setShowForm(true)
  }

  function openEditForm(product) {
    setEditingProduct(product)
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingProduct(null)
  }

  async function handleSaved() {
    closeForm()
    fetchProducts()
  }

  async function handleToggleStock(product) {
    await supabase
      .from(PRODUCTS_TABLE)
      .update({ in_stock: !product.in_stock })
      .eq('id', product.id)
    fetchProducts()
  }

  async function handleDelete(product) {
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
          <Logo markClassName="h-10 w-10" showTagline={false} />
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
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-display text-3xl sm:text-4xl">PRODUCTOS</h1>
          <button
            type="button"
            onClick={openNewForm}
            className="rounded-full bg-terracotta px-5 py-2.5 font-body text-sm font-semibold uppercase tracking-wide text-cream shadow-warm transition-transform hover:scale-105 active:scale-95"
          >
            + Nuevo producto
          </button>
        </div>

        {loading ? (
          <div className="grid gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-2xl bg-ink/5" />
            ))}
          </div>
        ) : (
          <ProductTable
            products={products}
            onEdit={openEditForm}
            onDelete={handleDelete}
            onToggleStock={handleToggleStock}
          />
        )}
      </main>

      {showForm && (
        <ProductForm product={editingProduct} onClose={closeForm} onSaved={handleSaved} />
      )}
    </div>
  )
}
