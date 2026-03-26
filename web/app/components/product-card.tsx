import { Badge } from '@/app/components/ui/badge'
import { ButtonLink } from '@/app/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/app/components/ui/card'
import { formatPrice, ratingFromId, type ProductItem } from '@/lib/products'

type ProductCardProps = {
  product: ProductItem
  priorityLabel?: string
}

export function ProductCard({ product, priorityLabel }: ProductCardProps) {
  const rating = ratingFromId(product.source_id)

  return (
    <Card className="product-card">
      <CardHeader className="product-media-shell">
        <div className="product-media">
          {product.image_url ? (
            <img src={product.image_url} alt={product.title} className="product-media-image" />
          ) : (
            <span className="product-media-fallback">No image</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="product-card-body">
        <div className="product-card-copy">
          <p className="eyebrow">{product.category || 'Curated audio'}</p>
          <h3 className="product-card-title">{product.title}</h3>
          <p className="product-card-description">
            {product.description || 'No description available.'}
          </p>
        </div>
        <div className="pill-row">
          {product.category ? <Badge>{product.category}</Badge> : null}
          <Badge tone="muted">⭐ {rating}</Badge>
          {priorityLabel ? <Badge tone="accent">{priorityLabel}</Badge> : null}
        </div>
      </CardContent>
      <CardFooter className="product-card-footer">
        <div className="price-block">
          <span className="price-caption">Price</span>
          <span className="price-value">{formatPrice(product.price)}</span>
        </div>
        <ButtonLink href={`/products/id/${product.source_id}`} size="sm">
          查看詳情
        </ButtonLink>
      </CardFooter>
    </Card>
  )
}
