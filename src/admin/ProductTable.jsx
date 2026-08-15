import { formatPrice } from '../lib/whatsapp.js'

export default function ProductTable({ products, categories, onEdit, onDelete, onToggleStock }) {
  const categoryLabels = Object.fromEntries(categories.map((category) => [category.slug, category.name]))
  if (products.length === 0) {
    return (
      <p className="rounded-2xl bg-ink/5 p-10 text-center font-body text-ink/60">
        Todavía no cargaste ningún producto.
      </p>
    )
  }

  return (
    <div className="overflow-hidden rounded-[24px] bg-white/50 shadow-sm ring-1 ring-ink/5">
      <div className="hidden grid-cols-[auto_2fr_1fr_1fr_1fr_auto] gap-4 border-b border-ink/10 px-5 py-3 font-body text-xs font-semibold uppercase tracking-wide text-ink/50 sm:grid">
        <span>Foto</span>
        <span>Nombre</span>
        <span>Precio</span>
        <span>Stock</span>
        <span>Estado</span>
        <span className="text-right">Acciones</span>
      </div>

      <ul className="divide-y divide-ink/10">
        {products.map((product) => (
          <li
            key={product.id}
            className="grid grid-cols-[auto_1fr] items-center gap-4 px-5 py-4 sm:grid-cols-[auto_2fr_1fr_1fr_1fr_auto]"
          >
            <div className="bg-wood h-12 w-12 overflow-hidden rounded-xl">
              {product.image_url && (
                <img src={product.image_url} alt="" className="h-full w-full object-cover" />
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate font-body text-sm font-semibold">{product.name}</p>
              <p className="truncate font-body text-xs text-ink/50">
                {categoryLabels[product.category] ?? product.category}
                <span className="sm:hidden"> · {formatPrice(product.price)} · {product.stock} u.</span>
              </p>
            </div>

            <span className="hidden font-body text-sm text-terracotta sm:block">
              {formatPrice(product.price)}
            </span>
            <span className="hidden font-body text-sm sm:block">{product.stock} u.</span>

            <span className="hidden sm:block">
              <button
                type="button"
                onClick={() => onToggleStock(product)}
                className={`rounded-full px-3 py-1 font-body text-xs font-semibold ${
                  product.in_stock
                    ? 'bg-olive/15 text-olive'
                    : 'bg-ink/10 text-ink/50'
                }`}
              >
                {product.in_stock ? 'Con stock' : 'Sin stock'}
              </button>
            </span>

            <div className="col-span-2 flex justify-end gap-2 sm:col-span-1">
              <button
                type="button"
                onClick={() => onToggleStock(product)}
                className="rounded-full px-3 py-1.5 font-body text-xs font-semibold text-ink/60 hover:bg-ink/5 sm:hidden"
              >
                {product.in_stock ? 'Marcar sin stock' : 'Marcar con stock'}
              </button>
              <button
                type="button"
                onClick={() => onEdit(product)}
                className="rounded-full px-3 py-1.5 font-body text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/5"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => onDelete(product)}
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
