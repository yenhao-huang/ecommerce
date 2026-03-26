import Link from 'next/link'
import { apiGet } from '@/lib/api'

type Item = {
  source_id: string
  title: string
  description?: string
  category?: string
  price?: number | string
  image_url?: string
}

export default async function ProductDetail({ params }: { params: { sourceId: string } }) {
  const item = await apiGet<Item>(`/products/${params.sourceId}`)

  return (
    <main className="container">
      <nav className="nav">
        <div className="brand">Product Detail</div>
        <div className="nav-links">
          <Link className="pill" href="/products">Back to List</Link>
          <Link className="pill" href="/">Home</Link>
        </div>
      </nav>

      <section className="section">
        <h2>{item.title}</h2>
        <p className="section-sub">Source ID: {item.source_id}</p>

        <div className="grid cols-2">
          <article className="card">
            <h3>Overview</h3>
            <p>{item.description || 'No description available.'}</p>
            <div className="meta">
              {item.category ? <span className="badge">{item.category}</span> : null}
              {item.price !== undefined && item.price !== null ? <span className="badge">${item.price}</span> : null}
            </div>
            <div className="actions">
              <button className="btn">Add to Cart</button>
              <button className="btn primary">Buy Now</button>
            </div>
          </article>

          <article className="card">
            <h3>Media</h3>
            {item.image_url ? (
              <p><a className="pill" href={item.image_url} target="_blank">Open product image</a></p>
            ) : (
              <p>No image URL provided for this item.</p>
            )}
          </article>
        </div>
      </section>
    </main>
  )
}
