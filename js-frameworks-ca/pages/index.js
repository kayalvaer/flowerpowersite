import Link from "next/link";
import Layout from "@/components/Layout"
import FlowerItem from '@/components/FlowerItem'
import { API_URL } from '@/config/index'

export default function Home({ flowers} ) {
  //console.log(flowers)
  return (
    <Layout>
      <h1>Trending Flowers</h1>
      {flowers.length === 0 && <h3>Empty List</h3>}
    
      {flowers.map((flur) => (
        <FlowerItem key={flur.id} flur={flur} />
      ))}

      {flowers.length > 0 && (
        <Link href='/detail'>
          <a className='btn-primary'>View More Flowers</a>
        </Link>
      )}
      
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/flowers`)
  const flowers = await res.json()

  return {
    props: { flowers: flowers.slice(0, 3) },
    revalidate: 1,
  }
}