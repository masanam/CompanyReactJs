import React, { Component } from 'react'
import api from '../../utilities/api'
import Helpers from '../../utilities/Helpers'
import './Form.css'

class CreateCompanyPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      company: {
        name: '',
        address: '',
        phone: ''
      }
    }

    this.handleUserChange = this.handleUserChange.bind(this)
    this.createCompany = this.createCompany.bind(this)
  }

  handleUserChange (event) {
    const target = event.target
    const field = target.name
    const value = target.value

    const company = this.state.company
    company[field] = value

    this.setState({
      company
    })
  }

  createCompany (event) {
    event.preventDefault()
    const username = window.sessionStorage.getItem('username')
    api.createCompany(
      this.state.company.name,
      this.state.company.address,
      this.state.company.phone,
      username
    )
    .then(createCompanySuccess.bind(this))
    function createCompanySuccess () {
      Helpers.showInfo(`The company ${this.state.company.name} was created!`)
      this.props.history.push('/company/companys')
    }
  }

  render () {
    return (
      <div className='row'>
        <div className='col-md-offset-4 col-md-3'>
          <form className='company-form'>
            <h2>Create Company</h2>
            <label>
              <div>Name:</div>
              <input
                className='form-control input-sm chat-input'
                type='text' name='name' size='50' required
                value={this.state.company.name}
                onChange={this.handleUserChange} />
            </label>
            <br />
            <label>
              <div>Address:</div>
              <input
                className='form-control input-sm chat-input'
                type='text' name='address' required size='50'
                value={this.state.company.address}
                onChange={this.handleUserChange} />
            </label>
            <br />
            <label>
              <div>Phone:</div>
              <input
                className='form-control input-sm chat-input'
                type='text' name='phone' required size='50'
                value={this.state.company.phone}
                onChange={this.handleUserChange} />
            </label>
            <br />
            <span className='group-btn'>
              <input
                className='btn btn-primary btn-md'
                value='Create Company'
                type='submit'
                onClick={this.createCompany} />
            </span>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateCompanyPage
