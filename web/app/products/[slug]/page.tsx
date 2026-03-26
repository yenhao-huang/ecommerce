import Link from 'next/link'
export default function SlugPage({ params }: { params: { slug: string } }) { return (<main><Link href="/products">Back to Product List</Link><h1>{params.slug}</h1><p>Use /products/id/[sourceId] for canonical detail route.</p></main>) }
