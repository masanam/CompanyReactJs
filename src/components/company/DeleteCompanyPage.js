import React, { Component } from 'react'
import api from '../../utilities/api'
import Helpers from '../../utilities/Helpers'

import './Form.css'

class DeleteCompanyPage extends Component {
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

    this.deleteCompany = this.deleteCompany.bind(this)
  }

  componentWillMount () {
    let id = this.props.match.params.id
    api.findCompanyById(id).then(findCompanyByIdSuccess.bind(this))
    function findCompanyByIdSuccess (company) {
      this.setState({
        company: {
          companyId: id,
          name: company.name,
          address: company.address,
          phone: company.phone
        }
      })
    }
  }

  componentWillUnmount () {
    Helpers.showInfo(`The company ${this.state.name} was deleted`)    
  }

  deleteCompany (event) {
    event.preventDefault()
    api.deleteCompany(
      this.state.company.companyId
    )
    .then(deleteCompanySuccess.bind(this))

    function deleteCompanySuccess () {
      this.props.history.push('/company/companys')
    }
  }

  render () {
    let company = this.state.company
    if (company) {
      return (
        <div className='row'>
          <div className='col-md-offset-4 col-md-3'>
            <form className='company-form'>
              <h2>Confirm Delete Company</h2>
              <label>
                <div>Name:</div>
                <input
                  className='form-control input-sm chat-input'
                  type='text' name='name' size='35' disabled
                  value={this.state.company.name} />
              </label>
              <br />
              <label>
                <div>Address:</div>
                <input
                  className='form-control input-sm chat-input'
                  type='text' name='address' disabled size='35'
                  value={this.state.company.address} />
              </label>
              <br />
              <label>
                <div>Phone:</div>
                <input
                  className='form-control input-sm chat-input'
                  type='text' name='phone' disabled size='35'
                  value={this.state.company.phone} />
              </label>
              <div className='group-btn text-center'>
                <input
                  className='btn btn-danger btn-md'
                  value='Delete Company'
                  type='submit'
                  onClick={this.deleteCompany} />
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

export default DeleteCompanyPage
