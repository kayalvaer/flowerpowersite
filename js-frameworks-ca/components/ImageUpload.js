import { useState } from 'react'
import { API_URL } from '@/config/index'
import styles from '@/styles/Add.module.css'

export default function ImageUpload({flurId, imageUploaded, token, showModal}) {
    const [image, setImage] = useState(null);
    console.log(imageUploaded, flurId, showModal, token);
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('files', image)
        formData.append('ref', 'flowers')
        formData.append('refId', flurId)
        formData.append('field', 'image')
    
        const res = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData,
        })
    
        if (res.ok) {
          await imageUploaded()
        }
      }

    const handleFileChange = (e) => {
      setImage(e.target.files[0])
    }

    return (
        <div className={styles.form}>
          <h1>Upload Event Image</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.file}>
              <input type='file' onChange={handleFileChange} />
            </div>
            <input type='submit' value='Upload' className='btn' />
          </form>
        </div>
    )
}
