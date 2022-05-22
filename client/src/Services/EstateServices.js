// Estate getAll, create, getOne, update, delete
const url = '/api/v1/estate'
export default {
  getAllEstates: () => {
    return fetch('/api/v1/estates/all')
      .then(res => res.json())
      .then(data => data)
  },
  registerEstate: (token, estate) => {
    return fetch(`${url}/register`, {
      method: "POST",
      body: estate,
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  },
  getEstate: (token, id) => {
    return fetch(`${url}/${id}`, {
      method: "GET",
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  },
  getUserEstates: (token) => {
    return fetch(`${url}/estates/user`, {
      method: "GET",
      headers: { Authorization: token}
    }).then(res => res.json())
      .then(data => data)
  },
  updateEstate: (token, update, id) => {
    return fetch(`${url}/update/${id}`, {
      method: "PUT",
      body: update,
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  },
  deleteEstate: (token, id) => {
    return fetch(`${url}/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  }
}