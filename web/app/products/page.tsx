import Link from 'next/link'
import { apiGet } from '@/lib/api'

type Item = {
  source_id: string
  title: string
  description?: string
  category?: string
  price?: number
}

export default async function ProductsPage() {
  const data = await apiGet<{ items: Item[]; total?: number }>('/products?limit=100')

  return (
    <main className="container">
      <nav className="nav">
        <div className="brand">All Products</div>
        <div className="nav-links">
          <Link className="pill" href="/">Back Home</Link>
        </div>
      </nav>

      <section className="section">
        <h2>Product Catalog</h2>
        <p className="section-sub">{data.total ?? data.items.length} items indexed.</p>

        <div className="list">
          {data.items.map((p) => (
            <article key={p.source_id} className="list-item">
              <div>
                <strong>{p.title}</strong>
                <div className="meta">
                  {p.category ? <span className="badge">{p.category}</span> : null}
                  {typeof p.price === 'number' ? <span className="badge">${p.price}</span> : null}
                </div>
              </div>
              <Link className="btn" href={`/products/id/${p.source_id}`}>View Details</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
