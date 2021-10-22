import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './HomePage.css'

class HomePage extends Component {
  render () {
    let userGreeting
    let username = window.sessionStorage.getItem('username')
    if (username) {
      userGreeting =
        <div>
          <h2>Hello, {username}!</h2>
          <Link to='/company/list'>
            <button>All Company</button>
          </Link>
        </div>
    } else {
      userGreeting =
        <div>
          <h3>Please login to access the project</h3>
          <Link to='/company/login'>
            <button>Login</button>
          </Link>
          &nbsp;
          <Link to='/company/register'>
            <button>Sign up</button>
          </Link>
        </div>
    }
    return (
      <div className='home-view text-center'>
        <h1>Welcome to the Company</h1>
        {userGreeting}
      </div>
    )
  }
}

export default HomePage
