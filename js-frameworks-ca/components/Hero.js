import styles from '@/styles/Hero.module.css'
import Link from 'next/link'

export default function Hero() {
    return (
        <div className={styles.hero}>
            <div className={styles.heroContent}>
                <h1>Passion To Flower Power</h1>
                <h3>
                    Embrace the feelings with the power of flowers. Let them 
                    talk with you.
                </h3>
                <p className={styles.link}>
                        <Link href="/account/register">
                            <a className='btn'>Join us</a>
                        </Link>
                    </p>
            </div>
        </div>
    )
}
