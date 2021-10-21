import React, { Component } from 'react'
import RegisterForm from './RegisterForm'

import api from '../../utilities/api'

class RegisterPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {
        userId: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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

  registerUser (event) {
    event.preventDefault()
    const user = this.state.user

    if (!this.validateUser(this.state.user)) {
      return
    }

    api.registerUser(user.username, user.email, user.password, user.confirmPassword)
      .then(registerSuccess.bind(this))

    function registerSuccess (userInfo) {
      window.sessionStorage.setItem('authToken', userInfo.token)
      window.sessionStorage.setItem('userId', userInfo.data.id)
      window.sessionStorage.setItem('username', userInfo.data.name)

      this.setState({
        user: {
          username: userInfo.data.name,
          userId: userInfo.data.id
        }
      })

      this.props.history.push('/company/home')
      this.showInfo('You have successfully registered')
    }
  }

  validateUser (user) {
    if (user.password !== user.confirmPassword) {
      this.setState({ error: 'Passwords do not match! ' })
      return false
    }

    // TODO: validate

    return true
  }

  render () {
    return (
      <div>
        <RegisterForm
          onChange={this.handleUserChange.bind(this)}
          onSave={this.registerUser.bind(this)}
          error={this.state.error}
        />
      </div>
    )
  }
}

export default RegisterPage
