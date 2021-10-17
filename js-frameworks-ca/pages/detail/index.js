import Layout from "@/components/Layout"
import FlowerItem from '@/components/FlowerItem'
import { API_URL } from '@/config/index'

export default function ListPage({ flowers} ) {
  //console.log(flowers)
  return (
    <Layout>
      <h1>Flower List</h1>
      {flowers.length === 0 && <h3>Empty List</h3>}
    
      {flowers.map((flur) => (
        <FlowerItem key={flur.id} flur={flur} />
      ))}
      
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/flowers`)
  const flowers = await res.json()

  return {
    props: { flowers },
    revalidate: 1,
  }
}
