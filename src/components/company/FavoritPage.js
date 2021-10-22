import React, { Component } from 'react'
import Helpers from '../../utilities/Helpers'
import api from '../../utilities/api'


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



  unMarkFavorit(favoritId) {
    api.deleteFavorit (favoritId)
  }  

  render () {
    console.log(this.state.favorit)

    let favoritRows = this.state.favorit.map(item =>
      <tr key={item.company.id}>
        <td>{item.company.name}</td>
        <td>{item.company.address}</td>
        <td>{item.company.phone}</td>
        <td>
                <button className='btn btn-primary'  onClick={this.unMarkFavorit.bind(this,  item.id)}>UnMarked</button>
        </td>      
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
              <th>UnMarked</th>
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
