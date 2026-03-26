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
          <p className="eyebrow">3C 商品列表</p>
          <h1 className="section-title section-title-large">人氣耳機總覽</h1>
          <p className="section-intro">精選耳機與音訊裝置，快速查看規格與價格，直接進入詳情頁。</p>
        </div>
        <div className="topbar-actions">
          <Badge tone="accent">共 {products.length} 件商品</Badge>
          <ButtonLink href="/" variant="outline" size="sm">
            Back Home
          </ButtonLink>
        </div>
      </nav>

      <section className="section-block section-block-tight">
        <Card className="collection-banner">
          <CardContent className="collection-banner-content">
            <div>
              <p className="eyebrow">熱門專區</p>
              <h2 className="feature-title">高評價耳機一次看，從入門到旗艦完整覆蓋。</h2>
            </div>
            <p className="feature-copy">
              商品卡片可直接進入詳情頁，快速比較規格、價格與使用情境。
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
