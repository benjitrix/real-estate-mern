import React from 'react'
import Query from '../Components/Query'
import UserEstates from '../Components/UserEstates'
import '../css/QueryUserEstates.css'

const QueryUserEstates = () => {
  return (
    <section className='query-user-estates'>
      <Query />
      <UserEstates />
    </section>
  )
}

export default QueryUserEstates