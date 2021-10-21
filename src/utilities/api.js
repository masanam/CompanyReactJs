import $ from 'jquery'

let api = (function () {
  const baseUrl = 'http://localhost:8000/api/'

  function loginUser (email, password) {
    return $.ajax({
      method: 'POST',
      url: baseUrl + 'users/login',
      data: JSON.stringify({email, password}),
      contentType: 'application/json',
    })
  }

  function registerUser (name, email, password, password_confirmation) {
    return $.ajax({
      method: 'POST',
      url: baseUrl + 'users/register',
      data: JSON.stringify({name, email, password, password_confirmation}),
      contentType: 'application/json',
    })
  }

  
  function logoutUser () {
    return $.ajax({
      method: 'GET',
      url: baseUrl + 'users/logout',
      headers: getUserAuthHeaders()
    })
  }

  function getUserAuthHeaders () {
    return {
      Authorization: 'Bearer ' + window.sessionStorage.getItem('authToken')
    }
  }

  return {
    loginUser,
    registerUser,
    logoutUser
  }
})()

export default api
