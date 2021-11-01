import {parseCookies} from '@/helpers/index'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import DashboardFlower from '@/components/DashboardFlower'
import { API_URL } from '@/config/index'
import styles from '@/styles/Dashboard.module.css'

export default function AdminDashboard({ flowers, token }) {
    const router = useRouter()

    const deleteFlower = async (id) => {
        if(confirm('Are you sure of deleting?')) {
          const res = await fetch(`${API_URL}/flowers/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
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
        <Layout title='Admin Dashboard'>
            <div className={styles.dash}>
                <h1>Manage Dashboard</h1>
                <h3>The Flowers</h3>

                {flowers.map((flur) => (
                    <DashboardFlower key={flur.id} flur={flur} 
                    handleDelete={deleteFlower} />
                ))}
            </div>
            
        </Layout>
    )
}

export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req)   
    
    const res = await fetch(`${API_URL}/flowers/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        },
    })

    const flowers = await res.json()

    return {
        props: {
            flowers,
            token
        },
    }
  } 
