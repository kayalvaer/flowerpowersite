import {parseCookies} from '@/helpers/index'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { FaImage } from 'react-icons/fa'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'
import Link from 'next/link'
import Image from 'next/image'
import { API_URL } from '@/config/index'
import styles from '@/styles/Add.module.css'

export default function EditFlowerPage({flur, token}) {
    const [values, setValues] = useState({
        date: flur.date,
        name: flur.name,
        time: flur.time,
        description: flur.description,
        editor: flur.editor,
        location: flur.description,
    })
    const [imagePreview, setImagePreview] = useState(
        flur.image ? flur.image.formats.thumbnail.url : null
    )
    const [showModal, setShowModal] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        //Validation
        const isEmpty = Object.values(values).some(
         (element) => element === ''
        )

        if(isEmpty) {
            toast.error('🦄 Please fill details');
        }

        const res = await fetch(`${API_URL}/flowers/${flur.id}`, 
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        body: JSON.stringify(values),
        })

        if(!res.ok) {
            if(res.status === 403 || res.status === 401) {
                toast.error('🦄 Unauthorized action!')
                return
            }
            toast.error('🦄 Oops something went wrong there!')
        } else {
            const flur = await res.json()
            router.push(`/flowers/${flur.slug}`)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const imageUploaded = async (e) => {
        const res = await fetch(`${API_URL}/flowers/${flur.id}`)
        const data = await res.json()
        setImagePreview(data.image.formats.thumbnail.url)
        setShowModal(false)
      }

    return (  
        <Layout title='Add flower information'>
            <Link href='/flowers'>
                <a className={styles.back}>
                  {'<'} Go Back
                </a>
            </Link>
            <h1>Edit Flowers</h1>
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
                            value={moment(values.date).format('yyyy-MM-DD')}
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
                    value='Update item'
                    className='btn-primary'
                />
            </form>
            <h2>Flower Image</h2>
            {imagePreview ? (
                <div className={styles.image}>
                    <Image 
                        src={imagePreview} 
                        width={300}
                        height={250}
                    />
                </div>
                    
            ) : (
              <div>
                <p>No uploaded image</p>
              </div>
            )}

              <div>
                  <button 
                    onClick={() => setShowModal(true)} 
                    className="btn-primary btn-icon"
                  >
                    <FaImage /> 
                    Upload Image
                  </button>
              </div>

              <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <ImageUpload 
                        flurId={flur.id} 
                        imageUpLoaded={imageUploaded}
                    />
              </Modal>
        </Layout>
    )
}

export async function getServerSideProps({params: {id}, req }) {
    const { token } = parseCookies(req)

    const res = await fetch(`${API_URL}/flowers/${id}`)
    const flur = await res.json()

    return {
        props: {
            flur,
            token
        }
    }
}