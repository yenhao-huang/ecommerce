import Link from 'next/link'
import { apiGet } from '@/lib/api'

type Item = {
  source_id: string
  title: string
  description?: string
  category?: string
  price?: number | string
  image_url?: string
  raw?: { brand?: string }
}

export default async function ProductDetail({ params }: { params: { sourceId: string } }) {
  const item = await apiGet<Item>(`/products/${params.sourceId}`)
  const brand = item.raw?.brand || 'APPLE'

  return (
    <main className="container">
      <nav className="nav">
        <Link className="pill" href="/products">← 回商品列表</Link>
        <Link className="pill" href="/">回首頁</Link>
      </nav>

      <section className="detail-grid">
        <div className="detail-media">
          {item.image_url ? <img src={item.image_url} alt={item.title} /> : <span>no image</span>}
        </div>
        <div className="detail-info">
          <div className="section-label" style={{ color: '#b45309' }}>{brand}</div>
          <h1 style={{ marginTop: 0, fontSize: 44 }}>{item.title}</h1>
          <p style={{ color: '#4b5563', fontSize: 24 }}>{item.description || 'No description available.'}</p>
          <div className="badges">
            {item.category ? <span className="badge">{item.category}</span> : null}
            <span className="badge">⭐ 3.47</span>
          </div>
          <div className="price">{item.price !== undefined && item.price !== null ? `$${item.price}` : '--'}</div>

          <h3 style={{ marginBottom: 8, marginTop: 16, fontSize: 30 }}>產品亮點</h3>
          <ul style={{ marginTop: 0, color: '#4b5563', lineHeight: 1.7, fontSize: 24 }}>
            <li>Active Noise Cancellation</li>
            <li>Spatial Audio</li>
            <li>Premium build</li>
          </ul>

          <div className="actions">
            <button className="btn primary">加入購物車</button>
            <button className="btn">立即購買</button>
          </div>
        </div>
      </section>
    </main>
  )
}
