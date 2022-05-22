import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../Context/context'
import EstateServices from '../Services/EstateServices'
import Estate from './Estate'
import '../css/Estates.css'

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
    return <h3>Loading...</h3>
  }

  if (estates.length < 1) {
    return <h2>No estates to display!</h2>
  } else {
    return (
      <section className={`${blurred ? 'estates-container blurred' : 'estates-container'}`} onClick={() => settingRotate(true)}>
        {
          estates.map((estate, i) => {
            return <Estate key={estate._id} {...estate} />
          })
        }
      </section>
    )
  }
}

export default UserEstates
