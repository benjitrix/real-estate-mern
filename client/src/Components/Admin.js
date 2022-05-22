import React, { useState, useEffect } from 'react'
import AdminServices from '../Services/AdminServices'
import QueryServices from '../Services/QueryServices'
import Message from './Message'
import { Link } from 'react-router-dom'
import '../css/Admin.css'

const Admin = () => {
  const [query, setQuery] = useState({search: '', category: '', estateType: '', price: '', date: '' })
  const [category, setCategory] = useState({category: ''})
  const [estateType, setEstateType] = useState({estateType: ''})
  const [addEstateType, setAddEstateType] = useState({name: 'residential - house', estateType: ''})
  const [categories, setCategories] = useState([])
  const [estateTypes, setEstateTypes] = useState([])
  const [alert, setAlert] = useState('')
  const [error, setError] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 1500)
  }, [show])

  useEffect(() => {
    fetchCategories()
    fetchEstateTypes('residential - apartment')
  }, [])

  // fetch categories 
  const fetchCategories = () => {
    QueryServices.getCategories().then(data => {
      setCategories(data.message.categories)
    })
  }

  // fetch estate types
  const fetchEstateTypes = (category) => {
    QueryServices.getEstateTypes(category).then(data => {
      setEstateTypes(data.message.msgBody)
      console.log(estateTypes);
    })
  }

  // handle changes in category selection
  const onCategoryEstateTypeChangeHandler = (e) => {
    const val = e.target.value
    switch(val) {
      case "residential - house":
        fetchEstateTypes(val)
        break
      case "residential - apartment":
        fetchEstateTypes(val)
        break
      case "commercial":
        fetchEstateTypes(val)
        break
      case "industrial":
        fetchEstateTypes(val)
        break
      case "land":
        fetchEstateTypes(val)
        break
      case "special purpose":
        fetchEstateTypes(val)
        break
      default:
      fetchEstateTypes("residential")
        break
    }
  }

  const onChangeQueryHandler = (e) => {
    setQuery({...query, [e.target.name]: e.target.value})
  }

  // onchange handler for add EstateType function
  const onChangeEstateHandler = (e) => {
    setAddEstateType({...addEstateType, [e.target.name]: e.target.value})
  }

  const onSubmitQueryHandler = (e) => {
    e.preventDefault()
  }

  // add category to db
  const onSubmitCategoryHandler = (e) => {
    e.preventDefault()
    // if (category.category === '') {
    //   setAlert('No category indicated')
    //   setError(true)
    //   return setShow(true)
    // }
    console.log(category);
    AdminServices.addCategory(category).then(data => {
      setAlert(data.message.msgBody)
      setError(data.message.msgError)
      setShow(true)
      console.log(data);
    })
  }

  // add estate type db
  const onSubmitEstateTypeHandler = (e) => {
    e.preventDefault()
    // if (estateType.estateType === '') {
    //   setAlert('No estate type indicated')
    //   setError(true)
    //   return setShow(true)
    // }
    console.log(addEstateType);
    AdminServices.addEstateType(addEstateType).then(data => {
      setAlert(data.message.msgBody)
      setError(data.message.msgError)
      setShow(true)
      console.log(data);
    })
  }

  return (
    <section className='admin'>
      <h2>estate-user dashboard</h2>
      <div className='admin-container'>
        <div className='estate-management'>
          <h2>estate management</h2>
          <div className='estate-management-container'>
            <div className='admin-query'>
              <form onSubmit={onSubmitQueryHandler} className="admin-query-form">
                <div>
                  <label>search</label>
                  <input
                    type="search"
                    name="search"
                    className='query-input'
                    onChange={(e) => onChangeQueryHandler(e)}
                  />
                  <label>category</label>
                  <select
                    size="3"
                    name="category" 
                    className='query-input'
                    onChange={(e) => {onChangeQueryHandler(e); onCategoryEstateTypeChangeHandler(e)}}
                    >
                    {
                      categories.map((category, index) => {
                        return (
                          <option value={category.name} key={index}>    
                            {category.name}
                          </option>
                        )
                      })
                    }
                  </select>
                  <label>estate</label>
                  <select 
                    name="estateType" 
                    className='query-input'
                    onChange={(e) => onChangeQueryHandler(e)}
                    >
                    {
                      estateTypes.map((estateType, index) => {
                        return (
                          <option value={estateType.name} key={index}>    
                            {estateType.name}
                          </option>
                        )
                      })
                    }
                  </select>
                  <label>min price</label>
                  <input
                    type="number"
                    name="min"
                    className='query-input'
                    onChange={(e) => onChangeQueryHandler(e)}
                  />
                  <label>max price</label>
                  <input
                    type="number"
                    name='max'
                    className='query-input'
                    onCanPlay={(e) => onChangeQueryHandler(e)}
                  />
                </div>
                <div>
                  <label>select start date</label>
                  <input
                    type="date"
                    name='start'
                    className='query-input'
                    onChange={(e) => onChangeQueryHandler(e)}
                  />
                  <label>select end date</label>
                  <input
                    type="date"
                    name='end'
                    className='query-input'
                    onChange={(e) => onChangeQueryHandler(e)}
                  />
                  <input
                  type="submit"
                  value="Submit"
                  className='query-input'
                  />
                </div>
              </form>
            </div>
            <div className='add-category-type'>
              <form onSubmit={onSubmitCategoryHandler}>
                <label>add category</label>
                <input 
                  type="text"
                  className="add-category-type-input"
                  onChange={(e) => setCategory({name: e.target.value})}
                />
                <input
                  type="submit"
                  value="Submit"
                  className='category-type-add-btn'
                />
              </form>
              <form onSubmit={onSubmitEstateTypeHandler} className='add-estate-type-select-category'>
                <label>select category</label>
                <select 
                  size="3"
                  defaultValue="residential"
                  name="name" className='add-category-type-input'
                  onChange={(e) => onChangeEstateHandler(e)}
                  >
                  {
                    categories.map((category, index) => {
                      return (
                        <option value={category.name} key={index}>    
                          {category.name}
                        </option>
                      )
                    })
                  }
                </select>
                <label>add estate type</label>
                <input
                  type="text"
                  // value={estateType}
                  name="estateType"
                  className="add-category-type-input"
                  onChange={(e) => {onChangeEstateHandler(e); setEstateType(e)}}
                />
                <input
                  type="submit"
                  value='Submit'
                  className='category-type-add-btn'
                />
              </form>
              {show && <Message message={alert} error={error} />}
            </div>
          </div>
        </div>
        <div className='user-management'>
          <h2>user management</h2>
          <div>
            <Link to='/register' className='manage-user-link'>Register user</Link>
            <Link to='/delete' className='manage-user-link'>Delete user</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Admin
