import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import {useContext} from 'react'
import Image from 'next/image'
import Search from './Search'
import AuthContext from '@/context/AuthContext'
import styles from '@/styles/Header.module.css'
import Link from "next/link";

export default function Heading() {
    const { user, logout } = useContext(AuthContext)

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>
                    <a className='logo' style={{ position: 'relative' }}> 
                        <Image src="/images/Flowerpowerlogo-4iMZgZ.png"
                        width={50}
                        height={50} 
                        alt="..." />
                        <span className='name'>Flower Power</span>
                    </a>
                </Link>
            </div>

            <Search />

            <nav>
                <ul>
                    <li>
                        <Link href='/'>
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/flowers'>
                            <a>Flowers</a>
                        </Link>
                    </li>
                    {user ? (
                    //if logged in
                    <>
                        <li>
                            <Link href='/flowers/add'>
                                <a>Add Flower</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/account/dashboard'>
                                <a>Manage</a>
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => logout()}
                                className='btn-nav btn-icon'
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    </> 
                    ) : (
                        // If logged out
                    <>
                        <li>
                            <Link href='/account/login'>
                                <a className='btn-nav btn-icon'>
                                 <FaSignInAlt /> Log In
                                </a>
                            </Link>
                        </li>
                    </>
                    )}                    
                </ul>
            </nav>
        </header>
    )
}
