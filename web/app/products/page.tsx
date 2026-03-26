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
          <p className="eyebrow">3C Product Catalog</p>
          <h1 className="section-title section-title-large">Top-Rated Headphones</h1>
          <p className="section-intro">Browse curated audio gear with fast access to specs, pricing, and detail pages.</p>
        </div>
        <div className="topbar-actions">
          <Badge tone="accent">{products.length} products</Badge>
          <ButtonLink href="/" variant="outline" size="sm">
            Back Home
          </ButtonLink>
        </div>
      </nav>

      <section className="section-block section-block-tight">
        <Card className="collection-banner">
          <CardContent className="collection-banner-content">
            <div>
              <p className="eyebrow">Featured Zone</p>
              <h2 className="feature-title">From entry-level value picks to flagship premium models.</h2>
            </div>
            <p className="feature-copy">
              Open product cards to compare specs, pricing, and fit-for-use in one flow.
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
