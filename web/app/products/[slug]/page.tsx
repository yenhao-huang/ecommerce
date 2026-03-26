import { Badge } from '@/app/components/ui/badge'
import { ButtonLink } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { apiGet } from '@/lib/api'
import { slugifyProductTitle, type ProductItem } from '@/lib/products'

export default async function SlugPage({ params }: { params: { slug: string } }) {
  const data = await apiGet<{ items: ProductItem[] }>('/products?limit=100')
  const product = data.items.find((item) => slugifyProductTitle(item.title) === params.slug)

  return (
    <main className="page-shell">
      <section className="section-block section-block-tight">
        <Card className="slug-route-card">
          <CardContent className="slug-route-content">
            <div className="page-title-block">
              <p className="eyebrow">Canonical Route</p>
              <h1 className="section-title section-title-large">
                {product ? product.title : decodeURIComponent(params.slug)}
              </h1>
              <p className="section-intro">
                {product
                  ? 'This slug route stays available and points shoppers to the source-id detail page.'
                  : 'Canonical route uses source id. This slug did not match a product in the current dataset.'}
              </p>
            </div>
            <div className="topbar-actions">
              {product ? <Badge tone="accent">Matched product</Badge> : <Badge tone="muted">No match</Badge>}
              <ButtonLink href={product ? `/products/id/${product.source_id}` : '/products'} variant="outline">
                {product ? 'View Details' : 'Back to Product List'}
              </ButtonLink>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
