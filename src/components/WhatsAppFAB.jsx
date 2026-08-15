import { buildWhatsAppInquiryUrl } from '../lib/whatsapp.js'

export default function WhatsAppFAB() {
  return (
    <a
      href={buildWhatsAppInquiryUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Consultanos por WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-warm-lg transition-transform hover:scale-110 active:scale-95 sm:bottom-7 sm:right-7"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.85 14.24c-.25.7-1.24 1.28-2.02 1.44-.54.11-1.24.2-3.6-.77-3.02-1.25-4.97-4.32-5.12-4.52-.15-.2-1.22-1.62-1.22-3.09s.75-2.19 1.02-2.49c.25-.28.55-.35.73-.35h.53c.17 0 .4-.02.62.48.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.18-.32.4-.45.53-.15.15-.31.32-.13.62.17.3.77 1.27 1.65 2.06 1.14 1.02 2.1 1.34 2.4 1.49.3.15.47.13.65-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.75.83 2.05.98.3.15.5.23.57.35.08.13.08.72-.17 1.42Z" />
      </svg>
    </a>
  )
}
