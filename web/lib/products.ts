export type ProductItem = {
  source_id: string
  title: string
  description?: string
  category?: string
  price?: number | string
  image_url?: string
  raw?: { brand?: string }
}

export function formatPrice(price?: number | string) {
  if (price === undefined || price === null || price === '') return '--'
  const numeric = typeof price === 'string' ? Number(price) : price
  if (Number.isFinite(numeric)) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(numeric)
  }
  return `$${price}`
}

export function ratingFromId(sourceId: string) {
  const total = sourceId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return (4 + (total % 10) / 10).toFixed(1)
}

export function slugifyProductTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getProductHighlights(product: ProductItem) {
  const brand = product.raw?.brand || 'Signature tuning'
  const category = product.category || 'Everyday listening'

  return [
    `${brand} finish with a refined, editorial look.`,
    `${category} positioning tuned for comfortable daily use.`,
    'FastAPI-backed catalog detail preserved in the current route structure.',
  ]
}
