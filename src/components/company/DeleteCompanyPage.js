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
        title: '',
        author: '',
        description: ''
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
          title: company.title,
          author: company.author,
          description: company.description
        }
      })
    }
  }

  componentWillUnmount () {
    Helpers.showInfo(`The company ${this.state.title} was deleted`)    
  }

  deleteCompany (event) {
    event.preventDefault()
    api.deleteCompany(
      this.state.company.companyId
    )
    .then(deleteCompanySuccess.bind(this))

    function deleteCompanySuccess () {
      this.props.history.push('/companys-library/companys')
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
                <div>Title:</div>
                <input
                  className='form-control input-sm chat-input'
                  type='text' name='title' size='35' disabled
                  value={this.state.company.title} />
              </label>
              <br />
              <label>
                <div>Author:</div>
                <input
                  className='form-control input-sm chat-input'
                  type='text' name='author' disabled size='35'
                  value={this.state.company.author} />
              </label>
              <br />
              <label>
                <div>Description:</div>
                <textarea
                  className='form-control input-sm chat-input'
                  name='description' rows='10' disabled cols='50'
                  value={this.state.company.description} />
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
