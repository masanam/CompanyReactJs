import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './NavigationBar.css'

class NavigationBar extends Component {
  render () {
    let navbarLinks
    if (window.sessionStorage.getItem('authToken') === null) {
      navbarLinks =
        <span>
          <Link to='/company/home'>Home</Link>
          <Link to='/company/login'>Login</Link>
          <Link to='/company/register'>Register</Link>
        </span>
    } else {
      navbarLinks =
        <span>
          <Link to='/company/home'>Home</Link>
          <Link to='/company/list'>Company</Link>
          <Link to='/company/favorit'>Favorit</Link>
          <Link to='/company/logout'>Logout</Link>
          <span className='loggedInUser'>
            <Link to='/company/profile'>
              <i className='glyphicon glyphicon-user' />
              &nbsp;
              {window.sessionStorage.getItem('username')}
            </Link>
          </span>
        </span>
    }

    return (
      <nav>
        <div className='navigation-bar navbar-fixed-top'>
          <Link to='/company/' className='navbar-header'>
            The Company 
          </Link>
          {navbarLinks}
        </div>
      </nav>
    )
  }
}

export default NavigationBar
