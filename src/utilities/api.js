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

  function findAllCompany () {
    return $.ajax({
      method: 'GET',
      url: baseUrl + 'users/list-company',
      headers: getUserAuthHeaders()
    })
  }

  function findCompanyById (companyId) {
    return $.ajax({
      method: 'GET',
      url: baseUrl + 'users/company/' + companyId,
      headers: getUserAuthHeaders()
    })
  }

  function findCompanyName (name) {
    return $.ajax({
      method: 'POST',
      url: baseUrl + 'users/search-company',
      headers: getUserAuthHeaders(),
      data: JSON.stringify({name}),
      contentType: 'application/json'
    })
  }

  function createCompany (name, address, phone) {
    return $.ajax({
      method: 'POST',
      url: baseUrl + 'users/add-company',
      headers: getUserAuthHeaders(),
      data: JSON.stringify({name, address, phone}),
      contentType: 'application/json'
    })
  }

  function editCompany (companyId, name, address, phone) {
    return $.ajax({
      method: 'PUT',
      url: baseUrl + 'users/edit-company/' + companyId,
      headers: getUserAuthHeaders(),
      data: { name, address, phone }
    })
  }

  function deleteCompany (companyId) {
    return $.ajax({
      method: 'DELETE',
      url: baseUrl + 'users/delete-company/' + companyId,
      headers: getUserAuthHeaders()
    })
  }


  function listFavorit () {
    return $.ajax({
      method: 'GET',
      url: baseUrl + 'users/list-favorit',
      headers: getUserAuthHeaders()
    })
  }

  function addFavorit (companyId) {
    return $.ajax({
      method: 'GET',
      url: baseUrl + 'users/add-favorit/' + companyId,
      headers: getUserAuthHeaders()
    })
  }

  function deleteFavorit (companyId) {
    return $.ajax({
      method: 'GET',
      url: baseUrl + 'users/delete-favorit/' + companyId,
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
    logoutUser,
    findAllCompany,
    findCompanyById,
    createCompany,
    editCompany,
    deleteCompany,
    findCompanyName,
    listFavorit,
    addFavorit,
    deleteFavorit,

  }
})()

export default api
