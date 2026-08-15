import { useEffect, useState } from 'react'
import { supabase, TESTIMONIALS_TABLE } from '../lib/supabaseClient.js'
import Reveal from './Reveal.jsx'

function Stars({ count }) {
  return (
    <div className="flex gap-0.5 text-terracotta">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill={i < count ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.2">
          <path d="M10 1.5l2.6 5.3 5.9.85-4.25 4.14 1 5.86L10 14.9l-5.25 2.76 1-5.86L1.5 7.65l5.9-.85L10 1.5Z" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function fetchTestimonials() {
      const { data } = await supabase
        .from(TESTIMONIALS_TABLE)
        .select('*')
        .order('created_at', { ascending: false })

      if (!active) return
      setTestimonials(data ?? [])
      setLoading(false)
    }

    fetchTestimonials()
    return () => {
      active = false
    }
  }, [])

  if (!loading && testimonials.length === 0) return null

  return (
    <section id="clientes" className="section-anchor bg-ink/[0.03] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-olive">
            Clientes
          </span>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl">LO QUE DICEN</h2>
          <p className="mt-3 font-body text-ink/60">
            Algunas palabras de quienes ya tienen su mate de Encantado Mates.
          </p>
        </Reveal>

        {loading ? (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-40 animate-pulse rounded-2xl bg-ink/5" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 90} className="flex flex-col gap-3 rounded-2xl bg-white/60 p-6 shadow-sm ring-1 ring-ink/5">
                <Stars count={t.rating} />
                <p className="font-body text-sm italic leading-relaxed text-ink/75">“{t.quote}”</p>
                <p className="mt-auto font-body text-sm font-semibold text-ink">{t.customer_name}</p>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
