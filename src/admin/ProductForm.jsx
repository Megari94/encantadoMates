import { useState } from 'react'
import { supabase, PRODUCTS_TABLE, PRODUCT_IMAGES_BUCKET } from '../lib/supabaseClient.js'

const emptyForm = {
  name: '',
  description: '',
  price: '',
  stock: '',
  category: '',
  in_stock: true,
  image_url: '',
}

export default function ProductForm({ product, categories, onClose, onSaved }) {
  const isEditing = Boolean(product)
  const [form, setForm] = useState(
    product
      ? {
          name: product.name,
          description: product.description ?? '',
          price: product.price,
          stock: product.stock,
          category: product.category ?? categories[0]?.slug ?? '',
          in_stock: product.in_stock,
          image_url: product.image_url ?? '',
        }
      : { ...emptyForm, category: categories[0]?.slug ?? '' }
  )
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(product?.image_url ?? null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  function handleImageChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  async function uploadImage() {
    const ext = imageFile.name.split('.').pop()
    const path = `${crypto.randomUUID()}.${ext}`
    const { error: uploadError } = await supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .upload(path, imageFile, { cacheControl: '3600', upsert: false })

    if (uploadError) throw uploadError

    const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path)
    return data.publicUrl
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      let imageUrl = form.image_url
      if (imageFile) {
        imageUrl = await uploadImage()
      }

      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
        in_stock: form.in_stock,
        image_url: imageUrl || null,
      }

      const query = isEditing
        ? supabase.from(PRODUCTS_TABLE).update(payload).eq('id', product.id)
        : supabase.from(PRODUCTS_TABLE).insert(payload)

      const { error: saveError } = await query
      if (saveError) throw saveError

      onSaved()
    } catch (err) {
      setError(err.message ?? 'Ocurrió un error al guardar el producto.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm p-4">
      <div className="glass w-full max-w-lg rounded-[28px] p-6 shadow-warm-lg max-h-[90vh] overflow-y-auto">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl">{isEditing ? 'EDITAR PRODUCTO' : 'NUEVO PRODUCTO'}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-ink/10"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-wood h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
              {preview && <img src={preview} alt="" className="h-full w-full object-cover" />}
            </div>
            <label className="flex-1 cursor-pointer rounded-xl border border-dashed border-ink/25 px-4 py-3 text-center font-body text-sm text-ink/60 transition-colors hover:border-olive hover:text-olive">
              {imageFile ? imageFile.name : 'Subir foto'}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>

          <div>
            <label className="mb-1 block font-body text-xs font-semibold uppercase tracking-wide text-ink/60">
              Nombre
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-ink/15 bg-white/50 px-4 py-2.5 font-body text-sm outline-none focus:border-olive"
            />
          </div>

          <div>
            <label className="mb-1 block font-body text-xs font-semibold uppercase tracking-wide text-ink/60">
              Descripción corta
            </label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full resize-none rounded-xl border border-ink/15 bg-white/50 px-4 py-2.5 font-body text-sm outline-none focus:border-olive"
            />
          </div>

          <div>
            <label className="mb-1 block font-body text-xs font-semibold uppercase tracking-wide text-ink/60">
              Categoría
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-xl border border-ink/15 bg-white/50 px-4 py-2.5 font-body text-sm outline-none focus:border-olive"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}{cat.active ? '' : ' (oculta)'}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block font-body text-xs font-semibold uppercase tracking-wide text-ink/60">
                Precio (ARS)
              </label>
              <input
                required
                type="number"
                min="0"
                step="1"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full rounded-xl border border-ink/15 bg-white/50 px-4 py-2.5 font-body text-sm outline-none focus:border-olive"
              />
            </div>
            <div>
              <label className="mb-1 block font-body text-xs font-semibold uppercase tracking-wide text-ink/60">
                Cantidad disponible
              </label>
              <input
                required
                type="number"
                min="0"
                step="1"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full rounded-xl border border-ink/15 bg-white/50 px-4 py-2.5 font-body text-sm outline-none focus:border-olive"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 font-body text-sm text-ink/70">
            <input
              type="checkbox"
              checked={form.in_stock}
              onChange={(e) => setForm({ ...form, in_stock: e.target.checked })}
              className="h-4 w-4 rounded accent-olive"
            />
            Producto visible / con stock
          </label>

          {error && (
            <p className="rounded-lg bg-terracotta/10 px-3 py-2 font-body text-sm text-terracotta">{error}</p>
          )}

          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-ink/15 px-5 py-2.5 font-body text-sm font-semibold text-ink/70 transition-colors hover:bg-ink/5"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving || categories.length === 0}
              className="flex-1 rounded-full bg-ink px-5 py-2.5 font-body text-sm font-semibold text-cream shadow-warm transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
            >
              {saving ? 'Guardando…' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
