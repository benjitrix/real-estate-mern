import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../Context/context'
import AuthServices from '../Services/AuthServices'
import Message from './Message'
import '../css/Register.css'

const Register = () => {
  const [user, setUser] = useState({name: '', email: '', password: ''})
  const authContext = useGlobalContext()
  const { alert, setAlert, error, setError } = useGlobalContext()
  
  useEffect(() => {
    setTimeout(() => {
      setAlert('')
    }, 1500)
  }, [alert])

  const onChangeHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    AuthServices.register(user).then(data => {
      authContext.setAlert(data.message.msgBody)
      authContext.setError(data.message.msgError)
      console.log(data)
    })
    setUser({name: '', email: '', password: ''})
    setError(false)
  }

  return (
    <section className='register-container'>
      <h2>Register</h2>
      <form onSubmit={onSubmitHandler} className='register-form'>
        <label>name</label>
        <input 
          type='text' 
          value={user.name}
          onChange={(e) => onChangeHandler(e)}
          name="name"
          className='register-name register-input'
          />
          <label>email</label>
          <input 
          type='email' 
          value={user.email}
          onChange={(e) => onChangeHandler(e)}
          name="email"
          className='register-email register-input'
          />
          <label>password</label>
          <input 
          type='password' 
          value={user.password}
          onChange={(e) => onChangeHandler(e)}
          name="password"
          className='register-password register-input'
          />
          <input 
            type="submit" 
            value="Submit" 
            className='register-submit register-input '
          />
          {alert && <Message message={alert} error={error} />}
      </form>
      <p>Already registered? <Link to="/login">login</Link></p> 
    </section>
  )
}

export default Register
