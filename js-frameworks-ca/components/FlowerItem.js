import Link from "next/link"
import Image from 'next/image'
import styles from '@/styles/FlowerItem.module.css'

export default function FlowerItem({ flur }) {
    return (
            <div className={styles.item}>
                <div className={styles.img}> 
        
                    <Image 
                        src={
                          flur.image 
                            ? flur.image.formats.medium.url 
                            : '/images/default.png'
                    } 
                    width={400}
                    height={400}
                    />
                    <p className={styles.date}>
                        {new Date(flur.date).toLocaleDateString
                        ('en-US')} at {flur.time} 
                        <span className={styles.author}>
                            <a href={"#"}>by {flur.editor}</a>
                        </span>
                    </p>
                </div>
                
                <div className={styles.content}>
                    
                    <h3>{flur.name}</h3>
                    <p>{flur.description}</p>
                    <p className={styles.link}>
                        <Link href={`/flowers/${flur.slug}`}>
                            <a className='btn'>Details</a>
                        </Link>
                    </p>

                </div>
            </div>
    )
}
