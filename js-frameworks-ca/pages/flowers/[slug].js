import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import Layout from "@/components/Layout"
import { API_URL } from '@/config/index'
import styles from '@/styles/Detail.module.css'
import { useRouter } from 'next/router'

export default function FlowerDetails({ flur }) {
    const router = useRouter()

    const deleteFlower = async (e) => {
      if(confirm('Are you sure of deleting?')) {
        const res = await fetch(`${API_URL}/flowers/${flur.id}`, {
          method: 'DELETE',
        });

        const data = await res.json()

        if (!res.ok) {
          toast.error(data.message)
        } else {
          router.push('/flowers') 
        }
      }
    }
  
    return (
    <Layout>
          <div className={styles.detail}>
              <div className={styles.controls}>
                <Link href={`/flowers/edit/${flur.id}`}>
                    <a>
                       <FaPencilAlt />
                       Edit  
                    </a>
                </Link>
                <a href="#" className={styles.delete}
                    onClick={deleteFlower}>
                    <FaTimes />
                    Delete
                </a>
              </div>
              <h1>{flur.name}</h1>
              <ToastContainer />
              {flur.image && (
                  <div className={styles.image}>
                    <Image 
                      src={flur.image.formats.medium.url} 
                      width={400}
                      height={330}
                    />
                  </div>
              )}
              <span>
              {new Date(flur.date).toLocaleDateString
                    ('en-US')} at {flur.time}
              </span>
              <h3>Location: </h3>
                <p>{flur.location}</p>
              <h3>Description: </h3>
                <p>{flur.description}</p>
              <Link href='/flowers'>
                  <a className={styles.back}>
                  {'<'} Go back
                  </a>
              </Link>
          </div>
    </Layout>
  )
}

export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/flowers`)
    const flowers = await res.json()

    const paths = flowers.map(flur => ({
        params: {slug: flur.slug}
    }))
    
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params: 
    { slug } }) {
  const res = await fetch(`${API_URL}/flowers?slug=${slug}`)
  const flowers = await res.json();
  
  return {
    props: {
      flur: flowers[0]
    },
    revalidate: 1
  }
}
