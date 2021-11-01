import Link from 'next/link'
import {FaUndoAlt, FaTrashAlt} from 'react-icons/fa'
import styles from '@/styles/DashboardFlower.module.css'

export default function DashboardFlowerPage({ flur, handleDelete }) {
    return (
        <div className={styles.flower}> 
            <h4>
                <Link href={`/flowers/${flur.slug}`}>
                    <a>{flur.name}</a>
                </Link>
            </h4>
            <Link href={`/flowers/edit/${flur.id}`}>
                <a className={styles.edit}>
                    <FaUndoAlt /><span className={styles.icon}>Edit Item</span>
                </a>
            </Link>
            <a href='#' className={styles.delete}
                onClick={() => handleDelete(flur.id)}>
                <FaTrashAlt /> <span className={styles.icon}>Delete</span>
            </a>
        </div>
    )
}
