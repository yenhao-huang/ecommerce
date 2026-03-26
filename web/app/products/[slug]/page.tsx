import Link from 'next/link'

export default function SlugPage({ params }: { params: { slug: string } }) {
  return (
    <main className="container">
      <section className="section">
        <h2>{decodeURIComponent(params.slug)}</h2>
        <p className="section-sub">Canonical route uses source id.</p>
        <Link className="btn" href="/products">Back to Product List</Link>
      </section>
    </main>
  )
}
