import Layout from "@/components/Layout"
import Pagination from '@/components/Pagination'
import FlowerItem from '@/components/FlowerItem'
import { API_URL, PER_PAGE } from '@/config/index'

export default function ListPage({ flowers, page, total} 
) {
  
  return (
    <Layout>
      <h1>Flower List</h1>
      {flowers.length === 0 && <h3>Empty List</h3>}
    
      {flowers.map((flur) => (
        <FlowerItem key={flur.id} flur={flur} />
      ))}

      <Pagination page={page} total={total} />

    </Layout>
  )
}

export async function getServerSideProps({ query: { page = 
  1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  //Fetch count total
  const totalRes = await fetch(`${API_URL}/flowers/count`)
  const total = await totalRes.json()

  //Fetch flowers
  const flowerRes = await fetch(
    `${API_URL}/flowers?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  )

  const flowers = await flowerRes.json()

  return {
    props: { flowers, page: +page, total },
  }
}
