import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Helpers from '../../utilities/Helpers'
import api from '../../utilities/api'
import './FavoritPage.css'

import FavoritStore from '../../stores/FavoritStore'

class FavoritView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userId: '',
      favorit: []
    }

    this.getFavorit = this.getFavorit.bind(this)
  }

  getFavorit () {
    let favorit = FavoritStore.getAllFavorit()
    console.log(favorit)
    this.setState({
      favorit,
      userId: window.sessionStorage.getItem('userId')
    })
  }

  componentDidMount () {
    api.listFavorit().then(loadFavoritSuccess.bind(this))
    function loadFavoritSuccess (favorit) {
      this.setState({
        favorit: favorit.data,
        userId: window.sessionStorage.getItem('userId')
      })
      Helpers.showInfo('Favorit loaded')
    }
  }

  prepareFavoritForEdit (favoritId) {
    api.findFavoritById(favoritId)
      .then(loadFavoritForEditSuccess.bind(this))

    function loadFavoritForEditSuccess (favoritInfo) {

    }
  }

  render () {
    console.log(this.state.favorit)

    let favoritRows = this.state.favorit.map(item =>
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.address}</td>
        <td>{item.phone}</td>
        <td><Link to={`/favorit/details/${item.id}`}>More info</Link></td>
      </tr>
      
    )

    return (
      <div className='favorit-view text-center'>
        <h1>All Favorit</h1>
        <table className='favorit-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {favoritRows}
          </tbody>
        </table>
      </div>
    )
  }
}

export default FavoritView
