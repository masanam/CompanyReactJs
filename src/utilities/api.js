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
      url: baseUrl + 'users/search-company/' + companyId,
      headers: getUserAuthHeaders()
    })
  }

  function createCompany (title, author, description, imageUrl, addedByUser) {
    return $.ajax({
      method: 'POST',
      url: baseUrl + 'users/add-company',
      headers: getUserAuthHeaders(),
      data: JSON.stringify({title, author, description, imageUrl, addedByUser}),
      contentType: 'application/json'
    })
  }

  function editCompany (companyId, title, author, description, imageUrl, addedByUser) {
    return $.ajax({
      method: 'PUT',
      url: baseUrl + 'users/edit-company/' + companyId,
      headers: getUserAuthHeaders(),
      data: { title, author, description, imageUrl, addedByUser }
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
      method: 'POST',
      url: baseUrl + 'users/mark-favorit',
      headers: getUserAuthHeaders(),
      data: JSON.stringify({companyId}),
      contentType: 'application/json'
    })
  }

  function deleteFavorit (companyId) {
    return $.ajax({
      method: 'POST',
      url: baseUrl + 'users/mark-favorit',
      headers: getUserAuthHeaders(),
      data: JSON.stringify({companyId}),
      contentType: 'application/json'
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
    listFavorit,
    addFavorit,
    deleteFavorit,

  }
})()

export default api
