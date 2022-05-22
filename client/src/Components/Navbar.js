import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../Context/context'
import { FaShoppingCart } from 'react-icons/fa'
import '../css/Navbar.css'

const Navbar = () => {
  // const [rotate, setRotate] = useState(false)
  const { user, logout, setBlurred, blurred, rotate, setRotate } = useGlobalContext()
  const navigate = useNavigate()

  const logoutUser = () => {
    logout()
    setTimeout(() => {
      navigate("/", { replace: true })
    }, 1000)
  }

  const setPointerUnresponsive = () => {
    setRotate(!rotate)
    setBlurred(!blurred)
  }

  return (
    <nav className='navbar-container'>
      <div className='navbar-logo-user-bars'>
        <h2><Link to='/' className='logo'>Real Estate</Link></h2>
        <div className='user-bars'>
          {
            <Link to='/cart' className='cart-link'><FaShoppingCart /></Link>
          }
          { user.name && 
            <Link to='/query-user-estates' className='user-estates'>Your Estates</Link> 
          }
          { user && (
            <p className='user'>
              { user.name === 'admin' ? 
                <Link to='/admin' className='link'>{user.name}</Link> : 
                user.name }
            </p>
            )
          }
          <FaBars className={`${rotate ? 'bars rotate' : 'bars'}`} onClick={() => setPointerUnresponsive()} />
        </div>
      </div>
      <hr className={`${rotate ? 'hr-black hr-brown' : 'hr-brown'}`}/>
      {
        user.name && (
        <div className={`${rotate ? 'links links-show' : 'links'}`}>
          <Link to='/' className='link'>Home</Link>
          <Link to='/register-estate' className='link'>Register Estate</Link>
          <Link to='/query-user-estates' className='user-estates-link link'>{` Your Estates (${user.name}'s)`}</Link>
          <Link to='/about' className='link'>About</Link>
          {user.role ==='admin' && <Link to='/admin' className='link'>Admin</Link>}
          <button onClick={() => logoutUser()} className='logout-btn'>Logout</button>
        </div>
        )
      }
      {
        !user.name && (
        <div className={`${rotate ? 'links links-show' : 'links'}`}>
          <Link to='/' className='link'>Home</Link>
          <Link to='/register' className='link'>Register</Link>
          <Link to='/login' className='link'>Login</Link>
          <Link to='/about' className='link'>About</Link>
        </div>
        )
      }
    </nav>
  )
}

export default Navbar
