import { Badge } from '@/app/components/ui/badge'
import { Button, ButtonLink } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { apiGet } from '@/lib/api'
import { formatPrice, getProductHighlights, ratingFromId, type ProductItem } from '@/lib/products'

export default async function ProductDetail({ params }: { params: { sourceId: string } }) {
  const item = await apiGet<ProductItem>(`/products/${params.sourceId}`)
  const brand = item.raw?.brand || 'APPLE'
  const highlights = getProductHighlights(item)
  const rating = ratingFromId(item.source_id)

  return (
    <main className="page-shell">
      <nav className="topbar">
        <ButtonLink href="/products" variant="outline" size="sm">
          ← Back to Product List
        </ButtonLink>
        <ButtonLink href="/" variant="ghost" size="sm">
          Back Home
        </ButtonLink>
      </nav>

      <Card className="detail-shell-card">
        <CardContent className="detail-shell-grid">
          <div className="product-detail-media detail-flat-media">
            {item.image_url ? (
              <img src={item.image_url} alt={item.title} className="product-detail-image" />
            ) : (
              <span className="product-media-fallback">No image</span>
            )}
          </div>

          <div className="detail-shell-copy">
            <p className="eyebrow">{brand}</p>
            <h1 className="detail-shell-title">{item.title}</h1>
            <p className="lead-copy detail-copy">{item.description || 'No description available.'}</p>

            <div className="pill-row">
              {item.category ? <Badge>{item.category}</Badge> : null}
              <Badge tone="muted">⭐ {rating}</Badge>
            </div>

            <div className="detail-price-row">
              <span className="price-value">{formatPrice(item.price)}</span>
            </div>

            <div>
              <p className="eyebrow">Product Highlights</p>
              <ul className="highlights-list">
                {highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className="detail-actions">
              <Button>Add to Cart</Button>
              <Button variant="outline">Buy Now</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
