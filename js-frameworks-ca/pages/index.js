import Link from "next/link"
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
        <Link href='/flowers'>
          <a className='moreBtn'>. . . . . . . View More</a>
        </Link>
      )}
      
    </Layout>
  )
}


export async function getStaticProps() {
  const res = await fetch(`${API_URL}/flowers?_sort=date:ASC&_limit=2`)
  const flowers = await res.json()

  return {
    props: { flowers },
    revalidate: 1,
  }
}