import styles from '../styles/Footer.module.css'
import Link from "next/link";
import Layout from './Layout';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <h5>Copyright &copy; Kay Alvær</h5>
            <p>
                <Link href='/flowers/index.js'>
                    Flowers say a lot about us !
                </Link>
            </p>
            
        </footer>
    )
}
