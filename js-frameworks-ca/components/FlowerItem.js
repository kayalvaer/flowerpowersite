import Link from "next/link"
import Image from 'next/image'
import styles from '@/styles/FlowerItem.module.css'
export default function FlowerItem({flur}) {
    return (
        <div className={styles.item}>
            <div className={styles.img}> 
    
                <Image src={flur.image ? flur.image : '/images/default.png'} 
                width={300}
                height={300}
                />
            </div>
            <div className={styles.content}>
                <h3>{flur.name}</h3>
                <p>{flur.description}</p>
                <p className={styles.link}>
                    <Link href={`/detail/${flur.slug}`}>
                        <a className='btn'>Details</a>
                    </Link>
                </p>

            </div>

        </div>
    )
}
