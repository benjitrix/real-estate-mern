import React, { useState, useEffect } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { useGlobalContext } from '../Context/context'
import AuthServices from '../Services/AuthServices'
import Message from '../Components/Message'
import '../css/Login.css'

const Login = () => {
  const [user, setUser] = useState({email: '', password: ''})
  const authContext = useGlobalContext()
  const { alert,setAlert, error } = useGlobalContext()
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      setAlert('')
    }, 1000)
  }, [alert])

  const onChangeHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    AuthServices.login(user).then(data => {
      // const { isAuthenticated, user } = data.message
      if (data.message.isAuthenticated) {
        localStorage.setItem('estate-token', `Bearer ${data.message.token}`)
        authContext.setUser(data.message.user);
        authContext.setIsAuthenticated(data.message.isAuthenticated)
        authContext.setToken(data.message.token)
        authContext.setAlert(data.message.msgBody)
        authContext.setError(data.message.msgError)
        console.log(data)
      } else {
        authContext.setAlert('User not authenticated')
        authContext.setError(true)
      }
    })
    setUser({email: '', password: ''})
    authContext.setError(false)
    navigate('/', { replace: true })
  }

  return (
    <section className='login-container'>
      <h2>Login</h2>
      <form onSubmit={onSubmitHandler} className='login-form'>
        <label>email</label>
        <input 
          type="text" 
          value={user.email}
          name="email" 
          onChange={(e) => onChangeHandler(e)} 
          className='login-name login-input' 
        />
        <label>password</label>
        <input 
          type="password" 
          value={user.password}
          name="password" 
          onChange={(e) => onChangeHandler(e)} 
          className='login-name login-input' 
        />
        <input 
          type="submit" 
          value="Submit" 
          className='login-submit login-input' 
        />
        { alert && <Message message={alert} error={error} /> }
      </form>
      <p>Not registered? <Link to='/register'>Register</Link></p>
    </section>
  )
}

export default Login
