import React from 'react'
import Estates from '../Components/Estates'
import Query from '../Components/Query'
import Adverts from '../Components/Adverts'
import '../css/QueryEstates.css'

const QueryEstates = () => {
  return (
    <main className='query-estates-container'>
      <div className='adverts'>
        <Adverts />
      </div>
      <div className='query-estates'>
        <Query />
        <Estates />
      </div>
    </main>
  )
}

export default QueryEstates
