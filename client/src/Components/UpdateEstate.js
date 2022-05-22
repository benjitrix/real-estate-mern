import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EstateServices from '../Services/EstateServices'
import Message from '../Components/Message'
import { useGlobalContext } from '../Context/context'

const UpdateEstate = () => {
  const {id} = useParams()
  const [estate, setEstate] = useState({title: '', category: '', estateType: '', location: '', price: '', description: '', contact: '', images: []})
  const navigate = useNavigate();
  const { token, alert, error, setAlert } = useGlobalContext()
  const authContext = useGlobalContext()

  const [estatePhotos, setEstatePhotos] = useState([])
  const [fileImages, setFileImages] = useState(false)

  useEffect(() => {
    fetchEstate(id)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setAlert('')
    }, 1000)
  }, [alert])

  const fetchEstate = (id) => {
    EstateServices.getEstate(token, id).then(data => {
      setEstate(data.message.estate)
      console.log(data)
    })
  }

  const onChangeHandler = (e) => {
    setEstate({...estate, [e.target.name]: e.target.value})
  }

  const onChangeImageHandler = (e) => {
      estate.images = []
      const images = e.target.files
      setEstatePhotos(images)
      setFileImages(true)
      setEstate({...estate, [e.target.name]: e.target.files})
  }

  // submit update inputs
  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log(estate.images);
    
    if (token) {
      const fd = new FormData()
      let estateObj = {}
      Object.keys(estate).forEach((key, i) => {
        if (estate[key].length !== 0) {
          estateObj[key] = estate[key]
          fd.append(`${key}`, estateObj[key])
          if (fileImages === false) {
            console.log('No image files selected')
            fd.delete('images')
            estate.images.forEach(item => {
              fd.append("images", item)
            })
          } else if (fileImages === true) {
              console.log('image files selected')
              fd.delete('images')
              for (let i = 0; i < estatePhotos.length; i++) {
                fd.append("images", estatePhotos[i])
              }
          }       
        }
      })
      
      // debugging logs
      console.log(estateObj);
      console.log(estate);
      console.log(fd.getAll('images'));

      EstateServices.updateEstate(token, fd, id).then(data => {
        if (data.message.isAuthenticated) {
          authContext.setAlert(data.message.msgBody)
          authContext.setError(data.message.msgError)
          console.log(data)        
        } else {
          authContext.setAlert('User not authenticated')
          authContext.setError(true)
        }
      })
      setTimeout(() => {
        authContext.setError(false)
        navigate("/", { replace: true})
      }, 1500)
    }
  }

  return (
    <section className='register-estate-container'>
      <h2>Update Estate</h2>
      <form onSubmit={onSubmitHandler} className='register-estate-form'>
        <label>title</label>
        <input 
          type="text" 
          value={estate.title}
          name="title"
          onChange={(e) => onChangeHandler(e)}
          className='estate-input'
        />
        
        <label>category</label>
        <input 
          type="text"
          value={estate.category}
          name='category'
          onChange={(e) => onChangeHandler(e)}
          className='estate-input'
        />
        <label>type</label>
        <input 
          type="text" 
          value={estate.estateType}
          name="estateType"
          onChange={(e) => onChangeHandler(e)}
          className='estate-input'
        />
        <label>location</label>
        <input 
          type="text"
          value={estate.location}
          name='location'
          onChange={(e) => onChangeHandler(e)}
          className='estate-input'
        />
        <label>price</label>
        <input 
          type="number" 
          value={estate.price}
          name="price"
          onChange={(e) => onChangeHandler(e)}
          className='estate-input'
        />
        <label>contact</label>
        <input 
          type="text"
          value={estate.contact}
          name='contact'
          onChange={(e) => onChangeHandler(e)}
          className='estate-input'
        />
        <label>description</label>
        <textarea 
          value={estate.description}
          name="description"
          onChange={(e) => onChangeHandler(e)}
          className='estate-input estate-description'
        />
        <label>photos</label>
        <input 
          type="file"
          // value={estatePhotos}
          name='images'
          onChange={onChangeImageHandler}
          className='estate-input'
          multiple
        />
        {
          estate.images !== [] && (
            <p className='photos-available'>
              {`${estate.images.length} photos available`}
            </p>
            )
        }
        <input
          type="submit"
          value="Submit"
          className='estate-submit estate-input'
        />
        { alert && <Message message={alert} error={error} /> }
      </form>
    </section>
  )
}

export default UpdateEstate
