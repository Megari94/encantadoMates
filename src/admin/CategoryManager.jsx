import { useState } from 'react'
import { supabase, CATEGORIES_TABLE } from '../lib/supabaseClient.js'

function toSlug(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function CategoryManager({ categories, products, onClose, onChanged }) {
  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const productCount = (slug) => products.filter((product) => product.category === slug).length

  async function createCategory(e) {
    e.preventDefault()
    const cleanName = name.trim()
    const slug = toSlug(cleanName)
    if (!cleanName || !slug) return
    setSaving(true)
    setError(null)
    const { error: createError } = await supabase.from(CATEGORIES_TABLE)
      .insert({ name: cleanName, slug, sort_order: categories.length * 10 + 10 })
    setSaving(false)
    if (createError) {
      setError(createError.code === '23505' ? 'Ya existe una categoría con ese nombre.' : createError.message)
      return
    }
    setName('')
    onChanged()
  }

  async function saveName(category) {
    const cleanName = editingName.trim()
    if (!cleanName) return
    const { error: updateError } = await supabase.from(CATEGORIES_TABLE)
      .update({ name: cleanName }).eq('id', category.id)
    if (updateError) setError(updateError.message)
    else { setEditingId(null); setError(null); onChanged() }
  }

  async function toggleActive(category) {
    const { error: updateError } = await supabase.from(CATEGORIES_TABLE)
      .update({ active: !category.active }).eq('id', category.id)
    if (updateError) setError(updateError.message)
    else { setError(null); onChanged() }
  }

  async function removeCategory(category) {
    const count = productCount(category.slug)
    if (count > 0) {
      setError(`No podés eliminar “${category.name}” porque tiene ${count} producto${count === 1 ? '' : 's'}.`)
      return
    }
    if (!window.confirm(`¿Eliminar la categoría “${category.name}”?`)) return
    const { error: deleteError } = await supabase.from(CATEGORIES_TABLE).delete().eq('id', category.id)
    if (deleteError) setError(deleteError.message)
    else { setError(null); onChanged() }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
      <div className="glass max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[28px] p-6 shadow-warm-lg">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-olive">Catálogo</span>
            <h2 className="font-display mt-1 text-2xl">GESTIONAR CATEGORÍAS</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/10">✕</button>
        </div>

        <form onSubmit={createCategory} className="mb-6 flex gap-2">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nueva categoría"
            className="min-w-0 flex-1 rounded-xl border border-ink/15 bg-white/50 px-4 py-2.5 font-body text-sm outline-none focus:border-olive" />
          <button disabled={saving || !name.trim()} className="rounded-full bg-terracotta px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-wide text-cream disabled:opacity-50">Agregar</button>
        </form>

        {error && <p className="mb-4 rounded-xl bg-terracotta/10 px-4 py-3 font-body text-sm text-terracotta">{error}</p>}

        <ul className="divide-y divide-ink/10 overflow-hidden rounded-2xl border border-ink/10 bg-white/40">
          {categories.map((category) => (
            <li key={category.id} className="flex flex-wrap items-center gap-2 px-4 py-3">
              <div className="min-w-0 flex-1">
                {editingId === category.id ? (
                  <input autoFocus value={editingName} onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') saveName(category); if (e.key === 'Escape') setEditingId(null) }}
                    className="w-full rounded-lg border border-olive bg-white/70 px-3 py-1.5 font-body text-sm outline-none" />
                ) : (
                  <><p className="font-body text-sm font-semibold">{category.name}</p><p className="font-body text-xs text-ink/45">{productCount(category.slug)} productos · {category.active ? 'Visible' : 'Oculta'}</p></>
                )}
              </div>
              {editingId === category.id ? (
                <button type="button" onClick={() => saveName(category)} className="rounded-full bg-olive px-3 py-1.5 font-body text-xs font-semibold text-cream">Guardar</button>
              ) : (
                <button type="button" onClick={() => { setEditingId(category.id); setEditingName(category.name); setError(null) }} className="rounded-full px-3 py-1.5 font-body text-xs font-semibold text-ink/60 hover:bg-ink/5">Editar</button>
              )}
              <button type="button" onClick={() => toggleActive(category)} className="rounded-full px-3 py-1.5 font-body text-xs font-semibold text-ink/60 hover:bg-ink/5">{category.active ? 'Ocultar' : 'Mostrar'}</button>
              <button type="button" onClick={() => removeCategory(category)} className="rounded-full px-3 py-1.5 font-body text-xs font-semibold text-terracotta hover:bg-terracotta/10">Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
