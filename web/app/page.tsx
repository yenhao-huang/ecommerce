'use client'

import Link from 'next/link'
import { useState } from 'react'

type Item = {
  source_id: string
  title: string
  description?: string
  category?: string
  price?: number
  image_url?: string
}

const featured = [
  { name: 'Aural Canvas X1', price: '$329', desc: 'Balanced, spacious, and tuned for people who notice compression artifacts.' },
  { name: 'Night Train Pro', price: '$249', desc: 'Fold-flat comfort with bass that stays disciplined at low listening volume.' },
  { name: 'Signal Mini', price: '$149', desc: 'A featherweight on-ear option that still makes podcasts sound expensive.' },
]

export default function HomePage() {
  const [q, setQ] = useState('wireless noise canceling headphones')
  const [items, setItems] = useState<Item[]>([])
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
    <main className="container">
      <nav className="nav">
        <div className="brand">🎧 Headphone Atelier</div>
        <a className="pill" href="#search">Explore Search</a>
      </nav>

      <section className="hero-grid">
        <div className="hero-copy">
          <div className="section-label">Curated listening gear</div>
          <h1>Find headphones that sound intentional, not algorithmic.</h1>
          <p>
            A tactile storefront for the FastAPI semantic search engine in this project. Browse categories,
            scan featured drops, and query the live catalog without leaving the page.
          </p>
          <div className="actions">
            <a className="btn primary" href="#search">Search the Catalog</a>
            <a className="btn" href="#featured">View Featured Picks</a>
          </div>
          <div className="badges">
            <span className="badge">wireless noise canceling</span>
            <span className="badge">gaming headset</span>
            <span className="badge">studio headphones</span>
            <span className="badge">travel bluetooth</span>
          </div>
        </div>

        <aside className="panel-dark">
          <div className="section-label" style={{ color: 'rgba(255,255,255,.76)' }}>Live semantic search</div>
          <h3>Built for quick product discovery</h3>
          <p>Search the same local vector-backed inventory your FastAPI server exposes at <code>/search</code>.</p>
          <div className="badges">
            <span className="badge">Client-side search requests to 127.0.0.1:8000</span>
            <span className="badge">App Router + TypeScript + Tailwind foundation</span>
            <span className="badge">shadcn-style component primitives</span>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="section-label">Categories</div>
        <h2 className="section-title">Shop by listening mode</h2>
        <div className="grid-3">
          <article className="card"><div className="card-body"><h3>Studio Clarity</h3><p>Reference tuning and detail retrieval for long production sessions.</p></div></article>
          <article className="card"><div className="card-body"><h3>Commute Quiet</h3><p>Wireless ANC picks built to cut the city down to a whisper.</p></div></article>
          <article className="card"><div className="card-body"><h3>All-Day Hybrid</h3><p>Portable sets with enough battery and comfort for every tab in your day.</p></div></article>
        </div>
      </section>

      <section className="section" id="featured">
        <div className="section-label">Featured products</div>
        <h2 className="section-title">Editorial spotlight</h2>
        <div className="grid-3">
          {featured.map((f) => (
            <article key={f.name} className="card">
              <div className="card-body">
                <h3>{f.name}</h3>
                <p>{f.desc}</p>
                <div className="actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="price">{f.price}</div>
                  <button className="btn">Preview</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="search">
        <div className="section-label">Search</div>
        <h2 className="section-title">Query the FastAPI backend live</h2>

        <div className="search-wrap">
          <p style={{ marginTop: 0, color: '#6b7280' }}>Client-side fetch to <code>http://127.0.0.1:8000/search?q=...&limit=6</code></p>
          <div className="search-row">
            <input className="input" value={q} onChange={(e) => setQ(e.target.value)} />
            <button className="btn primary" onClick={runSearch} disabled={loading}>{loading ? 'Searching…' : 'Search'}</button>
          </div>

          {items.length > 0 && (
            <div className="grid-3" style={{ marginTop: 14 }}>
              {items.map((item) => (
                <article key={item.source_id} className="card">
                  <div className="product-image">
                    {item.image_url ? <img src={item.image_url} alt={item.title} /> : <span>no image</span>}
                  </div>
                  <div className="card-body">
                    <h3>{item.title}</h3>
                    <p>{item.description || 'No description'}</p>
                    <div className="badges">
                      {item.category ? <span className="badge">{item.category}</span> : null}
                    </div>
                    <div className="actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="price">{typeof item.price === 'number' ? `$${item.price}` : '--'}</div>
                      <Link className="btn primary" href={`/products/id/${item.source_id}`}>查看詳情</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="actions" style={{ marginTop: 12 }}>
          <Link className="btn" href="/products">商品列表</Link>
        </div>
      </section>
    </main>
  )
}
