'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

type Item = {
  source_id: string
  title: string
  description?: string
  category?: string
  price?: number
}

const categories = ['Wireless', 'Noise Cancelling', 'Gaming', 'Studio', 'Sports', 'Budget']

export default function HomePage() {
  const [q, setQ] = useState('sony')
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<Item[]>([])

  async function runSearch() {
    setLoading(true)
    try {
      const res = await fetch(`http://127.0.0.1:8000/search?q=${encodeURIComponent(q)}&limit=8`)
      const data = await res.json()
      setItems(data.items ?? [])
    } finally {
      setLoading(false)
    }
  }

  const heroStats = useMemo(() => [
    { label: 'Fast API', value: 'OpenAPI Ready' },
    { label: 'Search', value: 'Keyword + DB' },
    { label: 'Frontend', value: 'Next.js App Router' },
  ], [])

  return (
    <main className="container">
      <nav className="nav">
        <div className="brand">🎧 Headphone E-commerce</div>
        <div className="nav-links">
          <Link className="pill" href="/products">Products</Link>
          <a className="pill" href="http://127.0.0.1:8000/docs" target="_blank">API Docs</a>
        </div>
      </nav>

      <section className="hero">
        <h1>Find Your Next Perfect Headphone</h1>
        <p>
          Search by brand, category, or use case. Browse detailed product pages and wire everything to your backend API.
        </p>
        <div className="meta">
          {heroStats.map((s) => (
            <span key={s.label} className="badge">{s.label}: {s.value}</span>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Search</h2>
        <p className="section-sub">Try keywords like "sony", "wireless", or "noise cancelling".</p>
        <div className="search-row">
          <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search headphones" />
          <button className="btn primary" onClick={runSearch} disabled={loading}>{loading ? 'Searching…' : 'Search'}</button>
          <Link className="btn ghost" href="/products">Browse all</Link>
        </div>

        <div className="grid cols-2" style={{ marginTop: 14 }}>
          {items.map((item) => (
            <article key={item.source_id} className="card">
              <h3>{item.title}</h3>
              <p>{item.description || 'No description available.'}</p>
              <div className="meta">
                {item.category ? <span className="badge">{item.category}</span> : null}
                {typeof item.price === 'number' ? <span className="badge">${item.price}</span> : null}
              </div>
              <div className="actions">
                <Link className="btn" href={`/products/id/${item.source_id}`}>View Details</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Shop by Category</h2>
        <div className="meta">
          {categories.map((c) => <span className="badge" key={c}>{c}</span>)}
        </div>
      </section>

      <section className="section">
        <h2>Editorial Picks</h2>
        <div className="grid cols-3">
          <article className="card">
            <h3>Best for Daily Commute</h3>
            <p>Balanced ANC, long battery, comfortable ear cups for all-day use.</p>
          </article>
          <article className="card">
            <h3>Best for Focus</h3>
            <p>Deep isolation and low-latency playback for concentrated workflows.</p>
          </article>
          <article className="card">
            <h3>Best Value</h3>
            <p>Reliable sound profile at a price point that still makes sense.</p>
          </article>
        </div>
      </section>
    </main>
  )
}
