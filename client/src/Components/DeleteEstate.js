import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EstateServices from '../Services/EstateServices'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../Context/context'
import Message from '../Components/Message'

const DeleteEstate = () => {
  const { id } = useParams()
  const [estate, setEstate] = useState({title: '', category: '', estateType: '', location: '', price: '', description: '', contact: '', images: []})
  const { token, alert, error } = useGlobalContext()
  const authContext = useGlobalContext()
  const navigate = useNavigate()
  
  useEffect(() => {
    fetchEstate(id)
  }, [token])

  const fetchEstate = (id) => {
    if (token) {
      EstateServices.getEstate(token, id).then(data => {
        setEstate(data.message.estate)
        console.log(data)
      })
    }
  }

  // submit update inputs
  const onSubmitHandler = (e) => {
    e.preventDefault()   
    EstateServices.deleteEstate(token, id).then(data => {
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

  return (
    <section className='register-estate-container'>
      <h2>Delete Estate</h2>
      <form onSubmit={onSubmitHandler} className='register-estate-form'>
        <label>title</label>
        <input 
          type="text" 
          defaultValue={estate.title}
          name="title"
          className='estate-input'
        />
        <input
          type="submit"
          value="Submit"
          className='estate-submit estate-input'
        />
        { alert && <Message message={alert} error={error}/> }
      </form>
    </section>
  )
}

export default DeleteEstate
