export default function QuantitySelector({ value, onChange, min = 1, max = 99, size = 'md' }) {
  const dims = size === 'sm' ? 'h-8 w-8 text-sm' : 'h-9 w-9'

  function step(delta) {
    const next = value + delta
    if (next < min || next > max) return
    onChange(next)
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-ink/15 bg-cream/60 p-1">
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={value <= min}
        className={`${dims} flex items-center justify-center rounded-full font-body font-semibold text-ink transition-colors hover:bg-ink/10 disabled:opacity-30`}
        aria-label="Restar"
      >
        −
      </button>
      <span className="w-6 text-center font-body text-sm font-semibold tabular-nums">{value}</span>
      <button
        type="button"
        onClick={() => step(1)}
        disabled={value >= max}
        className={`${dims} flex items-center justify-center rounded-full font-body font-semibold text-ink transition-colors hover:bg-ink/10 disabled:opacity-30`}
        aria-label="Sumar"
      >
        +
      </button>
    </div>
  )
}
