import React, { useContext, useState, useEffect } from 'react'
import AuthServices from '../Services/AuthServices'
import PurchaseServices from '../Services/PurchaseServices'
export const AppContext = React.createContext()

export const AppProvider = ({children}) => {
  const [user, setUser] = useState({name: '', role: ''})
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState('')
  const [error, setError] = useState(false)
  const [token, setToken] = useState('')
  const [blurred, setBlurred] = useState(false)
  const [rotate, setRotate] = useState(false)
  const [resetBlur, setResetBlur] = useState(false)
  const [queriedEstates, setQueriedEstates] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => { 
      const retrievedToken = localStorage.getItem('estate-token')
      if (retrievedToken === null) {
        return console.log('No token retrieved');
      } else {
        AuthServices.isAuthenticated(retrievedToken).then(data => {
        setToken(retrievedToken)
          setUser({name: data.message.msgBody.name, role: data.message.msgBody.role })
          setIsAuthenticated(data.message.isAuthenticated)
          setIsLoading(false)
          setAlert(data.message.msgBody)
          setError(data.message.msgError)

          console.log(data);
          setTimeout(() => {
            if (error === false) {
              setAlert('')
            }
          }, 2000)
      })
    }
  }, [token])

  const fetchEstatesInCart = () => {
    PurchaseServices.getAllEstatesInCart(token).then(data => {
      setCart(data.message.cart)
      console.log(data);
    })
  }

  const logout = () => {
    localStorage.removeItem('estate-token')
    setUser({name: '', role: ''})
  }

  const settingRotate = (bool) => {
    // setBlurred(!blurred)
    // setRotate(!rotate)
  }

  return (
    <div>
      { isLoading ? <h2>Loading....</h2> : 
        <AppContext.Provider value={{
          user,
          isAuthenticated,
          alert,
          error,
          token,
          isLoading,
          blurred,
          rotate,
          resetBlur,
          queriedEstates,
          cart,
          fetchEstatesInCart,
          setQueriedEstates,
          setUser,
          setIsAuthenticated,
          setAlert,
          setError,
          setToken,
          logout,
          setBlurred,
          setRotate,
          settingRotate,
          setResetBlur,
        }}>
          {children}
        </AppContext.Provider>
      }
    </div>
  )
}

// custom hook
export const useGlobalContext = () => {
  return useContext(AppContext)
}