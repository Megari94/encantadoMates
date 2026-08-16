export const WHATSAPP_NUMBER = '5493624716035'

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
})

export function formatPrice(value) {
  return currencyFormatter.format(value)
}

export function buildWhatsAppOrderUrl(items, total) {
  const lines = [
    'Hola! Quiero hacer este pedido desde la web de Encantado Mates:',
    '',
    ...items.map(
      (item) =>
        `• ${item.quantity}x ${item.name} (${item.category_name ?? item.category ?? 'Sin categoría'}) — ${formatPrice(item.price * item.quantity)}`
    ),
    '',
    `Total: ${formatPrice(total)}`,
  ]

  const text = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}

export function buildWhatsAppInquiryUrl() {
  const text = encodeURIComponent(
    'Hola! Vi la web de Encantado Mates y quería hacerles una consulta.'
  )
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}
