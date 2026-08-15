export default function Logo({ className = '', markOnly = false, height = 'h-11' }) {
  if (markOnly) {
    return (
      <img
        src="/logo-mark.png"
        alt="Encantado Mates"
        className={`${height} w-auto object-contain ${className}`}
      />
    )
  }

  return (
    <img
      src="/logo.png"
      alt="Encantado Mates"
      className={`${height} w-auto object-contain ${className}`}
    />
  )
}
