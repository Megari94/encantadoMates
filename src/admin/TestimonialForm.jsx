import { useState } from 'react'
import { supabase, TESTIMONIALS_TABLE } from '../lib/supabaseClient.js'

const emptyForm = { customer_name: '', quote: '', rating: 5 }

export default function TestimonialForm({ testimonial, onClose, onSaved }) {
  const isEditing = Boolean(testimonial)
  const [form, setForm] = useState(
    testimonial
      ? { customer_name: testimonial.customer_name, quote: testimonial.quote, rating: testimonial.rating }
      : emptyForm
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const payload = {
        customer_name: form.customer_name.trim(),
        quote: form.quote.trim(),
        rating: Number(form.rating),
      }

      const query = isEditing
        ? supabase.from(TESTIMONIALS_TABLE).update(payload).eq('id', testimonial.id)
        : supabase.from(TESTIMONIALS_TABLE).insert(payload)

      const { error: saveError } = await query
      if (saveError) throw saveError

      onSaved()
    } catch (err) {
      setError(err.message ?? 'Ocurrió un error al guardar el testimonio.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm p-4">
      <div className="glass w-full max-w-lg rounded-[28px] p-6 shadow-warm-lg max-h-[90vh] overflow-y-auto">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl">{isEditing ? 'EDITAR TESTIMONIO' : 'NUEVO TESTIMONIO'}</h2>
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
          <div>
            <label className="mb-1 block font-body text-xs font-semibold uppercase tracking-wide text-ink/60">
              Nombre del cliente
            </label>
            <input
              required
              value={form.customer_name}
              onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
              className="w-full rounded-xl border border-ink/15 bg-white/50 px-4 py-2.5 font-body text-sm outline-none focus:border-olive"
            />
          </div>

          <div>
            <label className="mb-1 block font-body text-xs font-semibold uppercase tracking-wide text-ink/60">
              Testimonio
            </label>
            <textarea
              required
              rows={3}
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              className="w-full resize-none rounded-xl border border-ink/15 bg-white/50 px-4 py-2.5 font-body text-sm outline-none focus:border-olive"
            />
          </div>

          <div>
            <label className="mb-1 block font-body text-xs font-semibold uppercase tracking-wide text-ink/60">
              Puntaje
            </label>
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              className="w-full rounded-xl border border-ink/15 bg-white/50 px-4 py-2.5 font-body text-sm outline-none focus:border-olive"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'estrella' : 'estrellas'}
                </option>
              ))}
            </select>
          </div>

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
              disabled={saving}
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
