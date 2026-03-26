'use client'
import Link from 'next/link'
import { useState } from 'react'
type Item = { source_id: string; title: string; description?: string }
export default function HomePage() {
  const [q, setQ] = useState('sony')
  const [items, setItems] = useState<Item[]>([])
  async function runSearch() {
    const res = await fetch(`http://127.0.0.1:8000/search?q=${encodeURIComponent(q)}&limit=8`)
    const data = await res.json(); setItems(data.items ?? [])
  }
  return (<main><h1>Headphone Store</h1><p>Search and browse headphone products.</p><div style={{display:'flex',gap:8}}><input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search headphones"/><button onClick={runSearch}>Search</button><Link href="/products">View all products</Link></div><div style={{marginTop:24,display:'grid',gap:12}}>{items.map((item)=><div key={item.source_id} style={{border:'1px solid #ddd',borderRadius:12,padding:12}}><h3>{item.title}</h3><p>{item.description ?? ''}</p><Link href={`/products/id/${item.source_id}`}>View Details</Link></div>)}</div></main>)
}
