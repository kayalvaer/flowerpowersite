import {parseCookies} from '@/helpers/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { API_URL } from '@/config/index'
import styles from '@/styles/Add.module.css'

export default function AddFlowerPage({token}) {
    const [values, setValues] = useState({
        date: '',
        name: '',
        time: '',
        description: '',
        editor: '',
        location: ''
    })

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        //Validation
        const isEmpty = Object.values(values).some(
        (element) => element === '')

        if(isEmpty) {
            toast.error('🦄 Please fill details');
        }

        const res = await fetch(`${API_URL}/flowers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values)
        })

        if(!res.ok) {
            if(res.status === 403 || res.status === 401) {
            toast.error('🦄 Token not included!')
            return
            }
            toast.error('🦄 Oops something went wrong there!')
        } else {
            const flur = await res.json()
            router.push(`/flowers/${flur.slug}`)
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({ ...values, [name]: value})
    }

    return (  
        <Layout title='Add flower information'>
            <Link href='/flowers'>
                <a className={styles.back}>
                  {'<'} Go Back
                </a>
            </Link>
            <h1>Add Flowers</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor='name' className={styles.label}>Flower Name</label>
                        <input 
                            type='text'
                            id='name'
                            name='name'
                            value={values.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="editor" className={styles.label}>Editors</label>
                        <input 
                            type='text'
                            id='editor'
                            name='editor'
                            value={values.editor}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className={styles.label}>Location</label>
                        <input 
                            type='text'
                            id='location'
                            name='location'
                            value={values.location}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className={styles.label}>Date</label>
                        <input 
                            type='date'
                            id='date'
                            name='date'
                            value={values.date}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="time" className={styles.label}>Time</label>
                        <input 
                            type='text'
                            id='time'
                            name='time'
                            value={values.time}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="description" className={styles.label}>Description</label>
                    <textarea 
                        type='text'
                        id='description'
                        name='description'
                        value={values.description}
                        onChange={handleInputChange}
                    >
                    </textarea>
                </div>
                <input 
                    type='submit' 
                    value='Add item'
                    className='btn-primary'
                />
            </form>
        </Layout>
    )
}

export async function getServerSideProps({req}) {
    const {token} = parseCookies(req)

    return {
        props: {
            token
        }
    }
}