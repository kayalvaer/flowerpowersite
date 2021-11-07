import styles from '@/styles/Subscribe.module.css'
import Link from "next/link";

export default function Footer() {
    return (
        <div className={styles.subscribe}>
            <h2>Our flowers seems like a great idea for you</h2>
            <h5>
                Our flowers seems like a great idea for you. We have a club.
                our club member are welcome to write theoir meaning and unique 
                experiences about flowers. Why not join them!
            </h5>
            <p className={styles.link}>
                <Link href="pages/account/register">
                            <a className='btnHero'>Join us</a>
                </Link>
            </p>
            
        </div>
    )
}
