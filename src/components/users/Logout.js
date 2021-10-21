import { Component } from 'react'
import Helpers from '../../utilities/Helpers'
import api from '../../utilities/api'

class Logout extends Component {
  componentWillMount () {
    api.logoutUser().then(logoutSuccess.bind(this))
    function logoutSuccess () {
      window.sessionStorage.clear()
      Helpers.showInfo('You have successfully logged out')
      this.props.history.push('/company/home')
    }
  }

  render () {
    return (
      null
    )
  }
}

export default Logout
