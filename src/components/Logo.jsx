export default function Logo({ className = '', markClassName = 'h-12 w-12', showTagline = true }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src="/logo-mark.svg" alt="" aria-hidden="true" className={`${markClassName} shrink-0`} />
      <div className="leading-none">
        <div className="font-display text-2xl sm:text-3xl">ENCANTADO</div>
        {showTagline && (
          <div className="font-display text-sm sm:text-base tracking-[0.5em] text-olive -mt-1">
            MATES
          </div>
        )}
      </div>
    </div>
  )
}
