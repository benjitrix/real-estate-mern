import React from 'react'
import '../css/EstateSuperCondensed.css'

const EstateSuperCondensed = ({estate}) => {
  const { title, price, images } = estate
  return (
    <article className='super-condensed-container'>
      <div className='cart-item-info'>
        <p><span>title: </span>{title}</p>
        <p><span>price: </span>${price}</p>
      </div>
      <img src={images[0]} alt='' className='super-condensed-image' />
    </article>
  )
}

export default EstateSuperCondensed