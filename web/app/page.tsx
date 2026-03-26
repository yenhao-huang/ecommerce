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
            <p className="brand-subtitle">Smart pricing, transparent specs, and faster headphone decisions.</p>
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
          <p className="eyebrow">Top 3C Audio Devices</p>
          <h1 className="display-title">Compare specs, pricing, and ratings in one place.</h1>
          <p className="lead-copy">
            From commute ANC and gaming voice chat to studio monitoring, search the full catalog in seconds.
            Review key specs, price ranges, and buying highlights without tab-hopping.
          </p>
          <div className="hero-actions">
            <a className="ui-button ui-button-default" href="#search">
              Find My Best Match
            </a>
            <a className="ui-button ui-button-outline" href="#editorial">
              View Weekly Best Sellers
            </a>
          </div>
          <div className="pill-row">
            <Badge>Noise-Canceling</Badge>
            <Badge>Gaming Headsets</Badge>
            <Badge>Studio Monitoring</Badge>
            <Badge>Bluetooth Commuting</Badge>
          </div>
        </div>

        <aside className="editorial-note">
          <p className="eyebrow editorial-note-label">Live Product Search</p>
          <h2 className="editorial-note-title">Find the right 3C headset setup in seconds.</h2>
          <p className="editorial-note-copy">
            Enter brand, use case, or budget to instantly surface relevant products from the backend <code>/search</code> endpoint.
          </p>
          <div className="note-metrics">
            <div>
              <span className="metric-value">127.0.0.1</span>
              <span className="metric-label">Local API</span>
            </div>
            <div>
              <span className="metric-value">Fast Comparison</span>
              <span className="metric-label">All product routes preserved</span>
            </div>
            <div>
              <span className="metric-value">Reusable UI</span>
              <span className="metric-label">Built to scale ecommerce pages</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="section-block" id="search">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Product Search</p>
            <h2 className="section-title">Type your need, get matching 3C products instantly</h2>
          </div>
          <p className="section-intro">
            Live client-side fetch from <code>http://127.0.0.1:8000/search?q=...&limit=6</code> for top matching results.
          </p>
        </div>

        <Card className="search-panel">
          <CardContent className="search-panel-content">
            <div className="search-input-row">
              <Input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" />
              <Button onClick={runSearch} disabled={loading}>
                {loading ? 'Searching…' : 'Search Now'}
              </Button>
            </div>
            <p className="search-caption">
              Try brand + use-case + budget keywords (e.g. Sony ANC, gaming headset, under $120).
            </p>

            {items.length > 0 ? (
              <div className="catalog-grid">
                {items.map((item) => (
                  <ProductCard key={item.source_id} product={item} priorityLabel="Live Result" />
                ))}
              </div>
            ) : (
              <div className="search-empty-state">
                <p className="search-empty-title">No matching products yet.</p>
                <p className="search-empty-copy">
                  Try more specific keywords (brand + use case) to improve match quality.
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
            <p className="eyebrow">Popular Categories</p>
            <h2 className="section-title">Shop by real-world use case</h2>
          </div>
        </div>
        <div className="feature-grid">
          <Card className="feature-card">
            <CardContent>
              <p className="eyebrow">Studio Monitoring</p>
              <h3 className="feature-title">Accurate detail retrieval for mixing and content production.</h3>
              <p className="feature-copy">
                Built for creators and professionals who need long-session comfort.
              </p>
            </CardContent>
          </Card>
          <Card className="feature-card">
            <CardContent>
              <p className="eyebrow">Commute ANC</p>
              <h3 className="feature-title">Active noise canceling for cleaner listening in busy streets.</h3>
              <p className="feature-copy">
                Balanced battery life, portability, and stable wireless connectivity.
              </p>
            </CardContent>
          </Card>
          <Card className="feature-card">
            <CardContent>
              <p className="eyebrow">Gaming & Media</p>
              <h3 className="feature-title">Low-latency audio and clear voice pickup for competitive play.</h3>
              <p className="feature-copy">
                Switch seamlessly between meetings, gaming, and streaming.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="section-block" id="editorial">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Best Sellers</p>
            <h2 className="section-title">Weekly high-conversion picks</h2>
          </div>
        </div>
        <div className="feature-grid">
          {featured.map((feature) => (
            <Card key={feature.name} className="editorial-card">
              <CardContent className="editorial-card-content">
                <p className="eyebrow">Top Pick</p>
                <h3 className="feature-title">{feature.name}</h3>
                <p className="feature-copy">{feature.desc}</p>
                <div className="editorial-card-footer">
                  <span className="price-inline">{feature.price}</span>
                  <Button variant="outline" size="sm">
View Recommendation
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
