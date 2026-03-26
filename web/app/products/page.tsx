import Link from 'next/link'
import { apiGet } from '@/lib/api'

type Item = { source_id: string; title: string; description?: string; category?: string; price?: number; image_url?: string }

export default async function ProductsPage() {
  const data = await apiGet<{ items: Item[] }>('/products?limit=100')

  return (
    <main className="container">
      <nav className="nav">
        <div>
          <div className="section-label">PRODUCT LIST</div>
          <h1 style={{ margin: 0, fontSize: 44 }}>商品列表</h1>
          <p style={{ color: '#6b7280' }}>精選耳機與音訊設備，點進去看商品詳情。</p>
        </div>
        <Link className="pill" href="/">回首頁</Link>
      </nav>

      <section className="grid-3">
        {data.items.slice(0, 12).map((p) => (
          <article key={p.source_id} className="card">
            <div className="product-image">
              {p.image_url ? <img src={p.image_url} alt={p.title} /> : <span>no image</span>}
            </div>
            <div className="card-body">
              <h3>{p.title}</h3>
              <p>{p.description || 'No description available.'}</p>
              <div className="badges">
                {p.category ? <span className="badge">{p.category}</span> : null}
                <span className="badge">⭐ 4.{Math.floor(Math.random() * 9)}</span>
              </div>
              <div className="actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="price">{typeof p.price === 'number' ? `$${p.price}` : '--'}</div>
                <Link className="btn primary" href={`/products/id/${p.source_id}`}>查看詳情</Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
