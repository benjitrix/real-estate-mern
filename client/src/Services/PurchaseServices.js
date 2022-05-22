const url = '/api/v1/estate/purchase'

export default {
  addEstateToCart: (token, estateID) => {
    return fetch(`${url}/add-to-cart/${estateID}`, {
      method: 'GET',
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  },
  getAllEstatesInCart: (token) => {
    return fetch(`${url}/estates-in-cart`, {
      method: 'GET',
      headers: { Authorization: token}
    }).then(res => res.json())
      .then(data => data)
  },
  removeEstateFromCart: (token, id) => {
    return fetch(`${url}/remove-from-cart/${id}`, {
      method: 'GET',
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  }
}