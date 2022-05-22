import React from 'react'
import { Link } from 'react-router-dom'
import '../css/EstateCondensed.css'

const EstateCondensed = (estate) => {
  const { _id, title, category, estateType, description, location, price, contact, images, createdAt, updatedAt } = estate
  const dayCreated = createdAt.split('T')[0]

  return (
    <article className='estate-condensed-container'>
      <Link to={`/single-estate/${_id}`} className='estate-link'>
        <div className='estate-info'>
          <p className='estate-title'>Title: <span>{title}</span></p>
          <p className='estate-category-type'>Type: <span>{category}/{estateType}</span></p>
          <p className='estate-price'>Price: <span>${price}</span></p>
          <p className='estate-day-created'>Created: <span>{dayCreated}</span></p>
        </div>
        <img src={images[0]} alt="" className='estate-image' />
      </Link>
    </article>
  )
}

export default EstateCondensed