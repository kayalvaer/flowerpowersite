import Head from 'next/head'
import { useRouter } from 'next/router';
import Header from './Header'
import Footer from './Footer'
import Hero from './Hero'
import styles from '@/styles/Layout.module.css'
import Subscribe from './Subscribe'

export default function Layout({title, keywords, 
    description, children}) { 
    const router = useRouter();
    
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords}  />
            </Head>
            
            <Header />
            {router.pathname === '/' && <Hero />}

            <div className={styles.wrap}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'Flower Power | Discover the power of flowers',
    description: 'Find information about flowers and other pants',
    keywords: 'flowers, cactus, plants, meaning of plants'

}
