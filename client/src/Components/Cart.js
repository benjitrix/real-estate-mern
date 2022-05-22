import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../Context/context'
import PurchaseServices from '../Services/PurchaseServices'
import EstateSuperCondensed from './EstateSuperCondensed'
import { FaTrashAlt } from 'react-icons/fa'
import StripeCheckout from './StripeCheckout'
import '../css/Cart.css'

const Cart = () => {
  const [total, setTotal] = useState(0)
  const [removeItem, setRemoveItem] = useState(false)
  const { token, cart, fetchEstatesInCart } = useGlobalContext()
  
  useEffect(() => {
    fetchEstatesInCart()
    console.log(cart);
  }, [token, removeItem])

  useEffect(() => {
    addPrices()
  }, [cart])

  // delete cart item
  const deleteCartItem = (id) => {
    PurchaseServices.removeEstateFromCart(token, id).then(data => {
      setRemoveItem(!removeItem)
      console.log(data);
    })
  }

  // add prices of cart items
  const addPrices = () => {
    const prices = document.getElementsByClassName('cart-item-price')
    const pricesArr = [...prices]
    const totalPrice = pricesArr.reduce((total, amount) => {
      return total + Number(amount.innerHTML)
    }, 0)
    setTotal(totalPrice)
  }

  return (
    <section className='cart-container'>
      <div className='estates-in-cart'>
        <div className='cart-item-titles'>
          <p>item</p>
          <p>price ($)</p>
        </div>
        {
          cart.map((cartItem, index) => {
            return (
              <div className='estate-item-in-cart' key={index}>
                <Link 
                  to={`/single-estate/${cartItem._id}`} className='cart-item-link'>
                  <EstateSuperCondensed estate={cartItem} />
                </Link>
                <p className='cart-item-price'>{cartItem.price}</p>
                <button
                  onClick={() => deleteCartItem(cartItem._id)}
                  className="cart-item-delete-btn"
                >
                  <FaTrashAlt />
                </button>
              </div>
              )
          })
        }
        <div className='cart-item-price-total'>
          <p>total</p>
          <p className='total-price'>{total}</p>
        </div>
      </div>
      <div className='process-payment'>
        <p>Check out</p>
        <StripeCheckout />
      </div>
    </section>
  )
}

export default Cart