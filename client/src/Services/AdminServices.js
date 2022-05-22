const url = '/api/v1/admin'

export default {
  addCategory: (category) => {
    return fetch(`${url}/category`, {
      method: "POST",
      body: JSON.stringify(category),
      headers: { "Content-type": "application/json" }
    }).then(res => res.json())
      .then(data => data)     
  },
  addEstateType: (estateType) => {
    return fetch(`${url}/estate-type`, {
      method: "POST",
      body: JSON.stringify(estateType),
      headers: { "Content-type": "application/json"}
    }).then(res => res.json())
      .then(data => data)
  }
}