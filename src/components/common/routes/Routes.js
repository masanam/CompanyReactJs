import React from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'

import HomePage from '../../home/HomePage'
import ProfilePage from '../../users/profile/ProfilePage'
import LoginPage from '../../users/LoginPage'
import RegisterPage from '../../users/RegisterPage'
import Logout from '../../users/Logout'

import FavoritPage from '../../company/FavoritPage'
import CompanyPage from '../../company/CompanyPage'
import EditCompanyPage from '../../company/EditCompanyPage'
import CreateCompanyPage from '../../company/CreateCompanyPage'
import DeleteCompanyPage from '../../company/DeleteCompanyPage'
import CompanyDetails from '../../company/CompanyDetails'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/company/' component={HomePage} />
    <Route path='/company/home' component={HomePage} />
    <Route path='/company/login' component={LoginPage} />
    <Route path='/company/register' component={RegisterPage} />
    <PrivateRoute path='/company/logout' component={Logout} />
    <PrivateRoute path='/company/profile' component={ProfilePage} />
    <PrivateRoute path='/company/list' component={CompanyPage} />
    <PrivateRoute path='/company/details/:id' component={CompanyDetails} />
    <PrivateRoute path='/company/edit/:id' component={EditCompanyPage} />
    <PrivateRoute path='/company/delete/:id' component={DeleteCompanyPage} />
    <PrivateRoute path='/company/create' component={CreateCompanyPage} />
    <PrivateRoute path='/company/favorit' component={FavoritPage} />

  </Switch>
)

export default Routes
