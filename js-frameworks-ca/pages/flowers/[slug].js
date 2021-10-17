import {useRouter} from 'next/router'
import Layout from '../../components/Layout'

export default function ProductInfo() {
    const router = useRouter()

    console.log(router)

    return (
        <Layout>
            <h1>Product Info</h1>
            <h3>{router.query.slug}</h3>
            <button onClick={() => router.push('/')} >Click me</button>
    

        </Layout>
    )
}
