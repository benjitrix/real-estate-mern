import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../Context/context'
import EstateServices from '../Services/EstateServices'
import Estate from './Estate'
import EstateCondensed from './EstateCondensed'
import '../css/UserEstates.css'

const UserEstates = () => {
  const [estates, setEstates] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { setAlert, setError, blurred, settingRotate, token } = useGlobalContext()

  useEffect(() => {
    getAllUserEstates()
  }, [token])

  const getAllUserEstates = () => {
    if (token) {
      EstateServices.getUserEstates(token).then(data => {
      setEstates(data.message.estates)
      setAlert(data.message.msgBody)
      setError(data.message.msgError)
      setIsLoading(false)
      console.log('User Estates: ', data)
    })
    }   
  }

  if (isLoading) {
    return <h3 style={{margin:"0 auto"}}>Loading...</h3>
  }

  if (estates.length < 1) {
    return <h2>No estates to display!</h2>
  } else if (estates.length < 4) {
    const newEstates = estates.slice(0, 3)
    return (
      <section className={`${blurred ? 'estates-container blurred' : 'estates-container'}`} onClick={() => settingRotate(true)}>
        {
          newEstates.map((estate, index) => {
              return <Estate key={estate._id} {...estate} key={index} />
          })
        }
      </section>
    )
  } else if (estates.length >= 4) {
    return (
      <section className='estates-condensed'>
        <h2>user generated estates</h2>
        <div className='estates-condensed-container'>
          {
            estates.map((estate, index) => {
              return <EstateCondensed {...estate} key={index} />
            })
          }
        </div>
      </section>
    )
  }
}

export default UserEstates
