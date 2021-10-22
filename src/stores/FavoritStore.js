import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import api from '../utilities/api'

class FavoritStore extends EventEmitter {
  constructor () {
    super()
    this.favorit = ''
  }

  getAllFavorit () {
    api.listFavorit().then(loadFavoritSuccess.bind(this))
    function loadFavoritSuccess (favorit) {
      this.state({
        favorit
      })
    }
  }
  handleAction (action) {
    switch (action) {
      case 'GET_ALL_DATAS':
        this.getAllFavorit(action.favorit)
        break
      default:
        console.log('Invalid action!')
        break
    }
  }
}

let favoritStore = new FavoritStore()
dispatcher.register(favoritStore.handleAction.bind(favoritStore))
export default favoritStore
