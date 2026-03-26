import { Badge } from '@/app/components/ui/badge'
import { ButtonLink } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { ProductCard } from '@/app/components/product-card'
import { apiGet } from '@/lib/api'
import type { ProductItem } from '@/lib/products'

export default async function ProductsPage() {
  const data = await apiGet<{ items: ProductItem[] }>('/products?limit=100')
  const products = data.items.slice(0, 12)

  return (
    <main className="page-shell">
      <nav className="topbar">
        <div className="page-title-block">
          <p className="eyebrow">Product List</p>
          <h1 className="section-title section-title-large">Product List</h1>
          <p className="section-intro">Curated headphones and audio gear. Tap through for product details.</p>
        </div>
        <div className="topbar-actions">
          <Badge tone="accent">{products.length} items</Badge>
          <ButtonLink href="/" variant="outline" size="sm">
            Back Home
          </ButtonLink>
        </div>
      </nav>

      <section className="section-block section-block-tight">
        <Card className="collection-banner">
          <CardContent className="collection-banner-content">
            <div>
              <p className="eyebrow">Collection</p>
              <h2 className="feature-title">A cleaner catalog surface with the same backend behavior.</h2>
            </div>
            <p className="feature-copy">
              Product cards remain wired to the existing detail route using source ids.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="catalog-grid">
        {products.map((product) => (
          <ProductCard key={product.source_id} product={product} priorityLabel="In stock" />
        ))}
      </section>
    </main>
  )
}
