import { Badge } from '@/app/components/ui/badge'
import { Button, ButtonLink } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { apiGet } from '@/lib/api'
import { formatPrice, getProductHighlights, ratingFromId, slugifyProductTitle, type ProductItem } from '@/lib/products'

export default async function ProductDetail({ params }: { params: { sourceId: string } }) {
  const item = await apiGet<ProductItem>(`/products/${params.sourceId}`)
  const brand = item.raw?.brand || 'APPLE'
  const highlights = getProductHighlights(item)
  const rating = ratingFromId(item.source_id)

  return (
    <main className="page-shell">
      <nav className="topbar">
        <div className="topbar-actions">
          <ButtonLink href="/products" variant="outline" size="sm">
            ← Back to Product List
          </ButtonLink>
          <ButtonLink href="/" variant="ghost" size="sm">
            Back Home
          </ButtonLink>
        </div>
        <ButtonLink href={`/products/${slugifyProductTitle(item.title)}`} variant="ghost" size="sm">
          Canonical slug
        </ButtonLink>
      </nav>

      <section className="product-detail-layout">
        <Card className="product-detail-media-card">
          <CardContent className="product-detail-media-content">
            <div className="product-detail-media">
              {item.image_url ? (
                <img src={item.image_url} alt={item.title} className="product-detail-image" />
              ) : (
                <span className="product-media-fallback">No image</span>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="product-detail-copy">
          <div className="detail-heading">
            <p className="eyebrow">{brand}</p>
            <h1 className="display-title detail-title">{item.title}</h1>
            <p className="lead-copy detail-copy">
              {item.description || 'No description available.'}
            </p>
          </div>

          <div className="pill-row">
            {item.category ? <Badge>{item.category}</Badge> : null}
            <Badge tone="muted">⭐ {rating}</Badge>
            <Badge tone="accent">Source ID {item.source_id}</Badge>
          </div>

          <div className="detail-price-row">
            <div className="price-block">
              <span className="price-caption">Price</span>
              <span className="price-value">{formatPrice(item.price)}</span>
            </div>
          </div>

          <Card className="detail-highlights">
            <CardContent>
              <p className="eyebrow">Highlights</p>
              <ul className="highlights-list">
                {highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="detail-actions">
            <Button>Add to Cart</Button>
            <Button variant="outline">Buy Now</Button>
          </div>
        </div>
      </section>
    </main>
  )
}
