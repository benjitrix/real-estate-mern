import React, { useState } from 'react'
import { FaEllipsisV } from 'react-icons/fa'
import { FaBars } from 'react-icons/fa'
import { FaCaretSquareDown } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import EstateImages from './EstateImages'
import PurchaseServices from '../Services/PurchaseServices'
import { useGlobalContext } from '../Context/context'
import '../css/Estate.css'

const Estate = (estate) => {
  const [iconModal, setIconModal] = useState(false)
  const [listModal, setListModal] = useState(false)
  const [show, setShow] = useState(false)
  const { _id, title, category, estateType, description, location, price, contact, images, createdAt, updatedAt } = estate
  const { token } = useGlobalContext()

  const dayCreated = createdAt.split('T')[0]

  const shortDescription = description.slice(0, 140)

  const addToCart = () => {
    PurchaseServices.addEstateToCart(token, _id).then(data => {
      console.log(data);
    })
  }

  return (
    <article 
      className='estate-container' 
      key={_id} 
      onMouseOver={() => setIconModal(true)} 
      onMouseLeave={() => setIconModal(false)} >
      <div className='estate-title' >
        <p>{title}</p>
      </div>
      <EstateImages images={images} id={_id} />
      <div className='estate-details-description'>
        <div className='estate-details'>
          <div className='category-type-location-date'>
            <p className="category">Category: <span>{category}</span></p>
            <p className="type">Type: <span>{estateType}</span></p>
            <p className="location">Location: <span>{location}</span></p>
            <p className="date">Date posted: <span>{dayCreated}</span></p>
          </div>
        </div>
        <div className='estate-description'>
          <h4>Description:</h4>
          <p className='description'> 
            {`${!show ? shortDescription : description}`} 
            <button 
              className='read-more-btn'
              onClick={() => setShow(!show)}
              >
              more...
            </button>
          </p>
        </div>  
        <div className='contact-price'>
          <p className='contact'><span>Contact: </span>{contact}</p>
          <p className='price'><span>Price: </span> ${price}</p>
        </div>
        <div className='add-to-cart'>
          <button
            onClick={addToCart}
            className='add-to-cart-btn'
          >
            Add-to-Cart
          </button>
        </div>
      </div>
      {
        iconModal  && (
          <div className='show-modal-icon' onClick={() => setListModal(!listModal)}>
            <FaBars />
          </div>
        )
      }
      {
        listModal && (
          <div className='show-modal-list'>
            <Link to={`/single-estate/${_id}`} className='modal-list-link'>More...</Link>
            <Link to={`/update-estate/${_id}`} className='modal-list-link'>Update</Link>
            <Link to={`/delete-estate/${_id}`} className='modal-list-link'>Delete</Link>
          </div>
        )
      }
    </article>
  )
}

export default Estate