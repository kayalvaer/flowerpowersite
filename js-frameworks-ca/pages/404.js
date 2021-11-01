import { FaExclamationTriangle } from 'react-icons/fa'
import Layout from '@/components/Layout'
import Link from "next/link";
import styles from '@/styles/404.module.css'

export default function ErrorPage() {
    return (
        <Layout>
            <div className={styles.errorMsg}>
                
                <h1>
                    <FaExclamationTriangle />
                </h1>
                <p>404</p>
                <h4>Oops, sorry the page is not rendered</h4>
                <Link href='/'>{'<'}Go back to Home Page</Link>
            </div>
        </Layout>
    )
}
