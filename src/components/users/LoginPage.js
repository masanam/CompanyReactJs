import React, {Component} from 'react'
import api from '../../utilities/api'
import Helpers from '../../utilities/Helpers'

import LoginForm from './LoginForm'

class LoginPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {
        email: '',
        password: ''
      },
      error: ''
    }
  }

  handleUserChange (event) {
    const target = event.target
    const field = target.name
    const value = target.value

    const user = this.state.user
    user[field] = value

    this.setState({
      user
    })
  }

  loginUser (event) {
    event.preventDefault()
    const user = this.state.user

    // TODO: validate user input

    api.loginUser(user.email, user.password)
      .then(loginSuccess.bind(this))

    function loginSuccess (userInfo) {
      window.sessionStorage.setItem('authToken', userInfo.token)
      window.sessionStorage.setItem('userId', userInfo.data.id)
      window.sessionStorage.setItem('username', userInfo.data.name)

      this.setState({
        username: userInfo.data.name,
        userId: userInfo.data.id
      })

      this.props.history.push('/company/home')
      Helpers.showInfo('You have successfully logged in')
    }
  }

  render () {
    return (
      <div>
        <LoginForm
          onChange={this.handleUserChange.bind(this)}
          onSave={this.loginUser.bind(this)}
          error={this.state.error} />
      </div>
    )
  }
}

export default LoginPage
