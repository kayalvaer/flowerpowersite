import Link from 'next/link'
import styles from '@/styles/Pagination.module.css'
import { PER_PAGE } from '@/config/index'


export default function Pagination({page, total}) {
    const lastPage = Math.ceil(total / PER_PAGE)
    return (
        <div className={styles.grid}>
            {page > 1 && (
            <Link href={`/flowers?page=${page - 1}`}>
                <a className='btn-page'><span className='arrowPrev'>{'<'}</span>Prev</a>
            </Link>
            )}

            {page < lastPage && (
            <Link href={`/flowers?page=${page + 1}`}>
                <a className='btn-page'>Next<span className='arrowNext'>{'>'}</span></a>
            </Link>
            )}
      </div>
    )
}

