import React, { Component } from 'react'
import api from '../../utilities/api'
import Helpers from '../../utilities/Helpers'

import './Form.css'

class EditCompanyPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      company: {
        companyId: '',
        name: '',
        address: '',
        phone: ''
      }
    }

    this.handleUserChange = this.handleUserChange.bind(this)
    this.editCompany = this.editCompany.bind(this)
  }

  componentWillMount () {
    let id = this.props.match.params.id
    api.findCompanyById(id).then(findCompanyByIdSuccess.bind(this))
    function findCompanyByIdSuccess (company) {
      this.setState({
        company: {
          companyId: id,
          title: company.name,
          author: company.address,
          description: company.phone

        }
      })
    }
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

  editCompany (event) {
    event.preventDefault()
    const company = this.state.company
    const username = window.sessionStorage.getItem('username')
    api.editCompany(
      company.companyId,
      company.name,
      company.address,
      company.phone,
      username
    )
    .then(editCompanySuccess.bind(this))
    function editCompanySuccess () {
      Helpers.showInfo(`The company ${this.state.name} was edited`)
      this.props.history.push('/company/companys')
    }
  }

  render () {
    if (this.state.company) {
      return (
        <div className='row'>
          <div className='col-md-offset-4 col-md-3'>
            <form className='company-form'>
              <h2>Edit Company</h2>
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
              <div className='group-btn text-center'>
                <input
                  className='btn btn-primary btn-md'
                  value='Edit Company'
                  type='submit'
                  onClick={this.editCompany} />
              </div>
            </form>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default EditCompanyPage
