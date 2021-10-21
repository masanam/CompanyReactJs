import React from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'

import HomePage from '../../home/HomePage'
import ProfilePage from '../../users/profile/ProfilePage'
import LoginPage from '../../users/LoginPage'
import RegisterPage from '../../users/RegisterPage'
import Logout from '../../users/Logout'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/company/' component={HomePage} />
    <Route path='/company/home' component={HomePage} />
    <Route path='/company/login' component={LoginPage} />
    <Route path='/company/register' component={RegisterPage} />
    <PrivateRoute path='/company/logout' component={Logout} />
    <PrivateRoute path='/company/profile' component={ProfilePage} />
  </Switch>
)

export default Routes
