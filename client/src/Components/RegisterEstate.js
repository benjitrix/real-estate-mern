import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../Context/context'
import EstateServices from '../Services/EstateServices'
import QueryServices from '../Services/QueryServices'
import Message from './Message'
import '../css/RegisterEstate.css'

const RegisterEstate = () => {
  const [estate, setEstate] = useState({title: '', category: '', estateType: '', location: '', price: '', description: '', contact: '', images: ''})
  const [estatePhotos, setEstatePhotos] = useState([])
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
  const { token, alert, error } = useGlobalContext()
  const authContext = useGlobalContext()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = () => {
    QueryServices.getCategories().then(data => {
      setCategories(data.message.categories)
      console.log(data);
    })
  }


  const onChangeHandler = (e) => {
    setEstate({...estate, [e.target.name]: e.target.value})
  }

  const onChangeImageHandler = (e) => {
    const images = e.target.files
    setEstatePhotos(images)
    setEstate({...estate, [e.target.name]: e.target.files})
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()

    if (token) {
      const fd = new FormData()
      let estateObj = {}
      Object.keys(estate).forEach((key, i) => {
        if (estate[key].length !== 0) {
          estateObj[key] = estate[key]
          if (key === "images") {
          for (let i = 0; i < estatePhotos.length; i++) {
            fd.append("images", estatePhotos[i])
          }
        }
        fd.append(`${key}`, estate[key])
        }
      })
      
      EstateServices.registerEstate(token, fd).then(data => {
        if (data.message.isAuthenticated) {
          authContext.setAlert(data.message.msgBody)
          authContext.setError(data.message.msgError)
        } else {
          authContext.setAlert('User not authenticated')
          authContext.setError(true)
        }
        console.log(data) 
      })
      
      setTimeout(() => {
        authContext.setError(false)
        navigate("/", { replace: true})
      }, 1500)
    }
  }

  return (
    <section className='register-estate-container'>
      <h2>Register Estate</h2>
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
        {/* <input 
          type="text"
          value={estate.category}
          name='category'
          onChange={(e) => onChangeHandler(e)}
          className='estate-input'
        /> */}
        <select 
          name='category' 
          className='estate-input'
          onChange={(e) => onChangeHandler(e)}
          >
          {
            categories.map((category, index) => {
              return (
                <option value={category.name} key={index}>
                  {category.name}
                </option>
              )
            })
          }
        </select>
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

export default RegisterEstate
