import Link from 'next/link'
import { apiGet } from '@/lib/api'
type Item = { source_id: string; title: string }
export default async function ProductsPage() {
  const data = await apiGet<{ items: Item[] }>('/products?limit=100')
  return (<main><h1>Products</h1><Link href="/">Back to Home</Link><ul>{data.items.map((p)=><li key={p.source_id}><Link href={`/products/id/${p.source_id}`}>{p.title}</Link></li>)}</ul></main>)
}
