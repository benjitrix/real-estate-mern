import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import EstateServices from '../Services/EstateServices'
import { FaBars } from 'react-icons/fa'
import { useGlobalContext } from '../Context/context'
import EstateImages from './EstateImages'
import '../css/SingleEstate.css'

const SingleEstate = () => {
  const { id } = useParams()
  const [image, setImage] = useState('')
  const [iconModal, setIconModal] = useState(false)
  const [listModal, setListModal] = useState(false)
  const [estate, setEstate] = useState({id, title: '', category: '', estateType: '', location: '', price: '', description: '', contact: '', updatedAt: '', images: []})
  const { token, alert, error } = useGlobalContext()

  const dayCreated = estate.updatedAt.split('T')[0]
  const timeCreated = estate.updatedAt.slice(11, 16)

  useEffect(() => {
    fetchEstate(id)
    console.log(id);
  }, [])

  const fetchEstate = (id) => {
    EstateServices.getEstate(token, id).then(data => {
      setEstate(data.message.estate)
      console.log(data)
    })
  }


  return (
    <article 
      className='single-estate-container' 
      key={estate.id} 
      onMouseOver={() => setIconModal(true)} 
      onMouseLeave={() => setIconModal(false)} >
      <div className='estate-title' >
        <p>{estate.title}</p>
      </div>
      <div className='images-map'>
        <EstateImages images={estate.images} id={estate.id} />
        <div className="mapouter" style={{ position:"relative",textAlign:"left", height:"386px", width:"400px" }}>
          <div className="gmap_canvas" style={{ overflow:"hidden",background:"none!important", height:"386px", width:"400px" }}>
            <iframe width="390" height="376" id="gmap_canvas" src="https://maps.google.com/maps?q=12%20Presedential%20Road,%20Enugu&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
            </iframe>
          </div>
        </div>
      </div>      
      <div className='estate-details-description'>
        <div className='estate-details'>
          <div className='single-estate-category-type-location-date'>
            <p>Category: <span>{estate.category}</span></p>
            <p>Type: <span>{estate.estateType}</span></p>
            <p>Location: <span>{estate.location} Lorem ipsum dolor sit amet. </span></p>
            <p>Date posted: <span>{dayCreated}</span></p>
          </div>
        </div>
        <div className='single-estate-description'>
          <h4>Description:</h4><p className='description'> {estate.description}</p>
        </div>  
        <div className='contact-price'>
          <p className='contact'><span>Contact: </span>{estate.contact}</p>
          <p className='price'><span>Price: </span> ${estate.price}</p>
        </div>
      </div>
      {
        iconModal  && (
          <div className='single-estate-show-modal-icon' onClick={() => setListModal(!listModal)}>
            <FaBars />
          </div>
        )
      }
      {
        listModal && (
          <div className='single-estate-show-modal-list'>
            <Link to='/' className='modal-list-link'>Home</Link>
            <Link to={`/update-estate/${estate.id}`} className='modal-list-link'>Update</Link>
            <Link to={`/delete-estate/${estate.id}`} className='modal-list-link'>Delete</Link>
          </div>
        )
      }
    </article>
  )
}

export default SingleEstate
