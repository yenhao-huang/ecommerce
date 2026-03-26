import Link from 'next/link'
import { apiGet } from '@/lib/api'
type Item = { source_id: string; title: string; description?: string; category?: string; price?: number | string }
export default async function ProductDetail({ params }: { params: { sourceId: string } }) {
  const item = await apiGet<Item>(`/products/${params.sourceId}`)
  return (<main><Link href="/products">Back to Product List</Link><h1>{item.title}</h1><p>{item.description ?? ''}</p><p>Category: {item.category ?? '-'}</p><p>Price: {item.price ?? '-'}</p></main>)
}
