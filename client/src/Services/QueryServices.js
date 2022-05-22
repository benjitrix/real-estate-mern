const url = 'api/v1/query/estates'

export default {
  getCategories: () => {
    return fetch(`${url}/categories`)
      .then(res => res.json())
      .then(data => data)
  },
  getEstateTypes: (category) => {
    const newCategory = {"category": category}
    return fetch(`${url}/estate-types`, {
      method: "POST",
      body: JSON.stringify(newCategory),
      headers: { "Content-type": "application/json"}
    }).then(res => res.json())
      .then(data => data)
  },
  getAllQuery: (query) => {
    console.log(query);
    return fetch(`${url}/query/all`, {
      method: "POST",
      body: JSON.stringify(query),
      headers: { "Content-type": "application/json"}
    }).then(res => res.json())
      .then(data => data)
  },
  getCategoryQuery: (category) => {
    return fetch(`${url}/categories-query`, {
      method: "POST",
      body: JSON.stringify(category),
      headers: { "Content-type": "application/json"}
    }).then(res => res.json())
      .then(data => data)
  },
  getEstateTypesQuery: (estateType) => {
    return fetch(`${url}/estate-type-query`, {
      method: "POST",
      body: JSON.stringify(estateType),
      headers: { "Content-type": "application/json" }
    }).then(res => res.json())
      .then(data => data)
  }
}