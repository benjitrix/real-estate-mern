// User register, login
export default {
  register: (user) => {
    return fetch('/api/v1/user/register', {
      method: "POST",
      body: JSON.stringify(user),
      headers: {"Content-type": "application/json"}
    }).then(res =>res.json())
      .then(data => data)
  },
  login: (user) => {
    return fetch('/api/v1/user/login', {
      method: "POST",
      body: JSON.stringify(user),
      headers: {"Content-type": "application/json"}
    }).then(res => res.json())
      .then(data => data)
  },
  logout: () => {
    return fetch('/api/v1/user/logout') 
      .then(res => res.json())
      .then(data => data)
  },
  getUser: () => {
    return fetch('/api/v1/user/getUser')
      .then(res => res.json())
      .then(data => data)
  },
  isAuthenticated: (token) => {
    return fetch('/api/v1/user/check/authenticate', {
      method: "GET",
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)    
  }
}