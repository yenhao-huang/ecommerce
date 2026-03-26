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
            <p className="brand-kicker">Headphone Atelier</p>
            <p className="brand-subtitle">Cream editorial storefront for live product discovery</p>
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
          <p className="eyebrow">Curated listening gear</p>
          <h1 className="display-title">Find headphones that feel selected, not sorted.</h1>
          <p className="lead-copy">
            A polished storefront wrapped around your FastAPI catalog. Browse editorial collections,
            move straight into search, and keep the existing routes intact.
          </p>
          <div className="hero-actions">
            <a className="ui-button ui-button-default" href="#search">
              Search the Catalog
            </a>
            <a className="ui-button ui-button-outline" href="#editorial">
              View Editorial Picks
            </a>
          </div>
          <div className="pill-row">
            <Badge>wireless noise canceling</Badge>
            <Badge>gaming headset</Badge>
            <Badge>studio headphones</Badge>
            <Badge>travel bluetooth</Badge>
          </div>
        </div>

        <aside className="editorial-note">
          <p className="eyebrow editorial-note-label">Live semantic search</p>
          <h2 className="editorial-note-title">Built to surface the right pair in one pass.</h2>
          <p className="editorial-note-copy">
            Search the same local vector-backed inventory your backend exposes at <code>/search</code>.
          </p>
          <div className="note-metrics">
            <div>
              <span className="metric-value">127.0.0.1</span>
              <span className="metric-label">Local API host</span>
            </div>
            <div>
              <span className="metric-value">App Router</span>
              <span className="metric-label">Route structure preserved</span>
            </div>
            <div>
              <span className="metric-value">UI Primitives</span>
              <span className="metric-label">Reusable components added</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="section-block" id="search">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Search</p>
            <h2 className="section-title">Query the FastAPI backend live</h2>
          </div>
          <p className="section-intro">
            Client-side fetch to <code>http://127.0.0.1:8000/search?q=...&limit=6</code>
          </p>
        </div>

        <Card className="search-panel">
          <CardContent className="search-panel-content">
            <div className="search-input-row">
              <Input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" />
              <Button onClick={runSearch} disabled={loading}>
                {loading ? 'Searching…' : 'Search'}
              </Button>
            </div>
            <p className="search-caption">
              Try broad shopper intent, feature-focused phrases, or brand-specific queries.
            </p>

            {items.length > 0 ? (
              <div className="catalog-grid">
                {items.map((item) => (
                  <ProductCard key={item.source_id} product={item} priorityLabel="Live result" />
                ))}
              </div>
            ) : (
              <div className="search-empty-state">
                <p className="search-empty-title">No live results yet.</p>
                <p className="search-empty-copy">
                  Run a query to preview the same catalog surfaced in the product routes below.
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
            <p className="eyebrow">Categories</p>
            <h2 className="section-title">Shop by listening mode</h2>
          </div>
        </div>
        <div className="feature-grid">
          <Card className="feature-card">
            <CardContent>
              <p className="eyebrow">Studio Clarity</p>
              <h3 className="feature-title">Reference tuning for concentrated work.</h3>
              <p className="feature-copy">
                Detail retrieval, balanced tonality, and enough comfort for long production sessions.
              </p>
            </CardContent>
          </Card>
          <Card className="feature-card">
            <CardContent>
              <p className="eyebrow">Commute Quiet</p>
              <h3 className="feature-title">Wireless ANC built for the city.</h3>
              <p className="feature-copy">
                Portable silhouettes and low-fatigue sound for everyday transit.
              </p>
            </CardContent>
          </Card>
          <Card className="feature-card">
            <CardContent>
              <p className="eyebrow">All-Day Hybrid</p>
              <h3 className="feature-title">Portable sets that transition cleanly.</h3>
              <p className="feature-copy">
                Battery life, quick pairing, and an easy profile for work and casual listening.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="section-block" id="editorial">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Featured products</p>
            <h2 className="section-title">Editorial spotlight</h2>
          </div>
        </div>
        <div className="feature-grid">
          {featured.map((feature) => (
            <Card key={feature.name} className="editorial-card">
              <CardContent className="editorial-card-content">
                <p className="eyebrow">Editor&apos;s pick</p>
                <h3 className="feature-title">{feature.name}</h3>
                <p className="feature-copy">{feature.desc}</p>
                <div className="editorial-card-footer">
                  <span className="price-inline">{feature.price}</span>
                  <Button variant="outline" size="sm">
                    Preview
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
