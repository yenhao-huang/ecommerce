'use client'

import { useState } from 'react'
import { Badge } from '@/app/components/ui/badge'
import { Button, ButtonLink } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { ProductCard } from '@/app/components/product-card'
import type { ProductItem } from '@/lib/products'

const featured = [
  {
    name: 'Aural Canvas X1',
    price: '$329',
    desc: 'Balanced, spacious, and tuned for people who notice compression artifacts.',
  },
  {
    name: 'Night Train Pro',
    price: '$249',
    desc: 'Fold-flat comfort with bass that stays disciplined at low listening volume.',
  },
  {
    name: 'Signal Mini',
    price: '$149',
    desc: 'A featherweight on-ear option that still makes podcasts sound expensive.',
  },
]

export default function HomePage() {
  const [q, setQ] = useState('apple')
  const [items, setItems] = useState<ProductItem[]>([])
  const [loading, setLoading] = useState(false)

  async function runSearch() {
    setLoading(true)
    try {
      const res = await fetch(`http://127.0.0.1:8000/search?q=${encodeURIComponent(q)}&limit=6`)
      const data = await res.json()
      setItems(data.items ?? [])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page-shell">
      <nav className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark">HA</div>
          <div>
            <p className="brand-kicker">3C Audio Store</p>
            <p className="brand-subtitle">智慧比價、規格透明、快速找到最適合你的耳機</p>
          </div>
        </div>
        <div className="topbar-actions">
          <ButtonLink href="/products" variant="outline" size="sm">
            Product List
          </ButtonLink>
          <a className="ui-button ui-button-ghost ui-button-sm" href="#search">
            Explore Search
          </a>
        </div>
      </nav>

      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">熱門 3C 音訊裝置</p>
          <h1 className="display-title">一次比規格、比價格、比評價，快速選對耳機。</h1>
          <p className="lead-copy">
            從通勤降噪、電競語音到錄音監聽，一站式搜尋全站商品。
            直接查看關鍵規格、價格帶與商品亮點，省下反覆比對時間。
          </p>
          <div className="hero-actions">
            <a className="ui-button ui-button-default" href="#search">
              立即搜尋最適合的耳機
            </a>
            <a className="ui-button ui-button-outline" href="#editorial">
              查看本週熱銷推薦
            </a>
          </div>
          <div className="pill-row">
            <Badge>降噪耳機</Badge>
            <Badge>電競耳麥</Badge>
            <Badge>監聽耳機</Badge>
            <Badge>藍牙通勤</Badge>
          </div>
        </div>

        <aside className="editorial-note">
          <p className="eyebrow editorial-note-label">即時商品搜尋</p>
          <h2 className="editorial-note-title">3 秒鎖定符合需求的 3C 耳機方案。</h2>
          <p className="editorial-note-copy">
            輸入品牌、用途或預算，即可快速篩出對應商品，並串接後端 <code>/search</code> 即時結果。
          </p>
          <div className="note-metrics">
            <div>
              <span className="metric-value">127.0.0.1</span>
              <span className="metric-label">本機 API</span>
            </div>
            <div>
              <span className="metric-value">快速比對</span>
              <span className="metric-label">保留完整商品路由</span>
            </div>
            <div>
              <span className="metric-value">可重用元件</span>
              <span className="metric-label">穩定擴充電商頁面</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="section-block" id="search">
        <div className="section-heading">
          <div>
            <p className="eyebrow">商品搜尋</p>
            <h2 className="section-title">輸入需求，立即找到對應 3C 商品</h2>
          </div>
          <p className="section-intro">
            即時連接 <code>http://127.0.0.1:8000/search?q=...&limit=6</code>，回傳最相關商品。
          </p>
        </div>

        <Card className="search-panel">
          <CardContent className="search-panel-content">
            <div className="search-input-row">
              <Input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" />
              <Button onClick={runSearch} disabled={loading}>
                {loading ? '搜尋中…' : '開始搜尋'}
              </Button>
            </div>
            <p className="search-caption">
              可輸入品牌、用途、價位關鍵字（例如：Sony 降噪、電競耳機、3000 元內）。
            </p>

            {items.length > 0 ? (
              <div className="catalog-grid">
                {items.map((item) => (
                  <ProductCard key={item.source_id} product={item} priorityLabel="即時結果" />
                ))}
              </div>
            ) : (
              <div className="search-empty-state">
                <p className="search-empty-title">目前沒有符合商品</p>
                <p className="search-empty-copy">
                  試試更精準的關鍵字（品牌＋用途）以提升命中率。
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="section-actions">
          <ButtonLink href="/products" variant="outline">
            Product List
          </ButtonLink>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">熱門分類</p>
            <h2 className="section-title">依使用情境快速選購</h2>
          </div>
        </div>
        <div className="feature-grid">
          <Card className="feature-card">
            <CardContent>
              <p className="eyebrow">專業監聽</p>
              <h3 className="feature-title">精準還原聲音細節，混音剪輯更可靠。</h3>
              <p className="feature-copy">
                適合創作者與專業工作者，長時間配戴依然舒適。
              </p>
            </CardContent>
          </Card>
          <Card className="feature-card">
            <CardContent>
              <p className="eyebrow">通勤降噪</p>
              <h3 className="feature-title">主動降噪加持，捷運街道也能沉浸聆聽。</h3>
              <p className="feature-copy">
                兼顧續航、便攜與穩定連線，日常通勤首選。
              </p>
            </CardContent>
          </Card>
          <Card className="feature-card">
            <CardContent>
              <p className="eyebrow">遊戲娛樂</p>
              <h3 className="feature-title">低延遲語音清晰，遊戲與追劇一次滿足。</h3>
              <p className="feature-copy">
                支援多場景切換，工作會議到娛樂都能無縫銜接。
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="section-block" id="editorial">
        <div className="section-heading">
          <div>
            <p className="eyebrow">熱銷精選</p>
            <h2 className="section-title">本週人氣商品推薦</h2>
          </div>
        </div>
        <div className="feature-grid">
          {featured.map((feature) => (
            <Card key={feature.name} className="editorial-card">
              <CardContent className="editorial-card-content">
                <p className="eyebrow">人氣推薦</p>
                <h3 className="feature-title">{feature.name}</h3>
                <p className="feature-copy">{feature.desc}</p>
                <div className="editorial-card-footer">
                  <span className="price-inline">{feature.price}</span>
                  <Button variant="outline" size="sm">
                    查看推薦
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
