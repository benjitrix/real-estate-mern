import React, { useState, useEffect } from 'react';
import QueryServices from '../Services/QueryServices'
import { useGlobalContext } from '../Context/context';
import '../css/Query.css'

const Query = () => {
  const [query, setQuery] = useState({search: '', category: '', estateType: '', min: '', max: '', start: '', end: ''})
  const [categories, setCategories] = useState([])
  const [estateTypes, setEstateTypes] = useState([])
  const { setQueriedEstates } = useGlobalContext()

  useEffect(() => {
    fetchCategories()
    fetchEstateTypes('residential - house')
  }, [])

  // fetch categories, fill category select box
  const fetchCategories = () => {
    QueryServices.getCategories().then(data => {
      setCategories(data.message.categories)
      console.log(data);
    })
  }

  // fetch estate types, fill estate type select box
  const fetchEstateTypes = (category) => {
    QueryServices.getEstateTypes(category).then(data => {
      setEstateTypes(data.message.msgBody)
      console.log(estateTypes);
    })
  }

  // select category, fill estate types
  const ChangeCategoryEstateTypeHandler = (e) => {
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
      case "special-purpose":
        fetchEstateTypes(val)
        break
      case "testing2":
        fetchEstateTypes(val)
        break
      default:
        fetchEstateTypes("residential")
    }
  }

  const onChangeHandler = (e) => {
    setQuery({...query, [e.target.name]: e.target.value})
    console.log(e.target.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log(query);
    let newQuery = {}
    Object.keys(query).forEach((key, i) => {
      if (query[key] !== '') {
        newQuery[key] = query[key]
      }
    })
    console.log("New Obj: ", newQuery);
    QueryServices.getAllQuery(newQuery).then(data => {
      setQueriedEstates(data.message.queryResult)
      console.log(data);
    })
  }

  return (
    <section className='query-container'>
      <h2>Query</h2>
      <div className='query'>
        <form onSubmit={onSubmitHandler} className="query-form">
          <div>
            <label>search</label>
            <input
              type="search"
              name= "search"
              className="query-input"
              onChange={(e) =>onChangeHandler(e)}
            />
            <label>category</label>
            <select 
              size="3"
              name="category" 
              className='query-input' 
              onChange={(e) => {ChangeCategoryEstateTypeHandler(e); onChangeHandler(e)}}
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
            <label>estate type</label>
            <select 
              size="2"
              name="estateType" 
              className='query-input'
              onChange={(e) => onChangeHandler(e)}
              >
              {
                estateTypes.map((estateType, index) => {
                  return (
                    <option value={estateType.name} key={index}
                    >   
                      {estateType.name}
                    </option>
                  )
                })
              }
            </select>
            <label>select min price</label>
            <input
              type="number"
              name="min"
              className="query-input"
              onChange={(e) =>onChangeHandler(e)}
            />
            <label>select max price</label>
            <input
              type="number"
              name="max"
              className="query-input"
              onChange={(e) =>onChangeHandler(e)}
            />
          </div>
          <div>
            <label>select start date</label>
            <input
              type="date"
              name="start"
              className="query-input"
              onChange={(e) =>onChangeHandler(e)}
            />
            <label>select end date</label>
            <input 
              type="date" 
              name="end" 
              className="query-input" 
              onChange={(e) =>onChangeHandler(e)}
            />
            <input
              type="submit"
              value="Submit"
              className='query-input'
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Query;             

