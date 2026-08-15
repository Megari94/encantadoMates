export default function TestimonialTable({ testimonials, onEdit, onDelete }) {
  if (testimonials.length === 0) {
    return (
      <p className="rounded-2xl bg-ink/5 p-10 text-center font-body text-ink/60">
        Todavía no cargaste ningún testimonio.
      </p>
    )
  }

  return (
    <div className="overflow-hidden rounded-[24px] bg-white/50 shadow-sm ring-1 ring-ink/5">
      <ul className="divide-y divide-ink/10">
        {testimonials.map((t) => (
          <li key={t.id} className="flex items-start justify-between gap-4 px-5 py-4">
            <div className="min-w-0">
              <p className="font-body text-sm font-semibold">
                {t.customer_name} <span className="font-normal text-ink/40">· {t.rating}★</span>
              </p>
              <p className="mt-1 font-body text-sm text-ink/60 line-clamp-2">“{t.quote}”</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => onEdit(t)}
                className="rounded-full px-3 py-1.5 font-body text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/5"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => onDelete(t)}
                className="rounded-full px-3 py-1.5 font-body text-xs font-semibold text-terracotta transition-colors hover:bg-terracotta/10"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
