import styles from '@/styles/Header.module.css'
import Link from "next/link";

export default function Heading() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>
                    <a>Flower Power</a>
                </Link>
            </div>

            <nav>
                <ul>
                    <li>
                        <Link href='/'>
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/contact'>
                            <a>Contact</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/login'>
                            <a>Log In</a>
                        </Link>
                    </li>
                </ul>
            </nav>
            
        </header>
    )
}
