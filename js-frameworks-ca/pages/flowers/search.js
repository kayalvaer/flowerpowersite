import qs from 'qs'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from "@/components/Layout"
import FlowerItem from '@/components/FlowerItem'
import { API_URL } from '@/config/index'

export default function SearchPage({ flowers} ) {
  const router = useRouter()

  return (
    <Layout title='Search list'>
      <Link href='/flowers'>Go Back</Link>
      <h1>Search List for {router.query.term}</h1>
      {flowers.length === 0 && <h3>Empty List
      </h3>}
    
      {flowers.map((flur) => (
        <FlowerItem key={flur.id} flur={flur} />
      ))}
      
    </Layout>
  )
}

export async function getServerSideProps({query: {term}}) {
  const query = qs.stringify({
      _where: {
          _or: [
              {name_contains: term},
              {description_contains: term},
          ]
      }
  })
  
  const res = await fetch(`${API_URL}/flowers?${query}`)
  const flowers = await res.json()

  return {
    props: { flowers },
  }
}

