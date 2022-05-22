import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import StripeServices from '../Services/StripeServices'
import { useGlobalContext } from '../Context/context'
import '../css/StripeCheckout.css'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const StripeCheckout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [showBtn, setShowBtn] = useState(true)
  const { cart, token } = useGlobalContext()

   // checkout with stripe
  const payWithStripe = () => {
    const cartArr = []
    cart.forEach((item, index) => {
      let cartObj = {}
      cartObj['id'] = item._id
      cartArr.push(cartObj);
    })
    console.log(cartArr);
    StripeServices.payWithStripe(token, cartArr).then(data => {
      setShowBtn(false)
      setClientSecret(data.clientSecret)
      console.log(data);
    })
  }

  const appearance = {
    theme: 'night',
    variables: {
    colorPrimary: '#0570de',
    colorBackground: '#ffffff',
    colorText: '#30313d',
    colorDanger: '#df1b41',
    fontFamily: 'Ideal Sans, system-ui, sans-serif',
    spacingUnit: '2px',
    borderRadius: '4px',
  }
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="stripe-checkout-container">
      <div className='pre-checkout-btn'>
        {
          showBtn && 
          <button
            onClick={() => payWithStripe()}
          >
            Checkout
          </button>
        }
      </div>
      <div className='stripe-checkout'>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
}

export default StripeCheckout