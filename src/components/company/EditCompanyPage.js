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
        title: '',
        author: '',
        description: '',
        imageUrl: '',
        addedByUser: ''
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
          title: company.title,
          author: company.author,
          description: company.description,
          imageUrl: company.imageUrl,
          addedByUser: company.addedByUser
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
      company.title,
      company.author,
      company.description,
      company.imageUrl,
      username
    )
    .then(editCompanySuccess.bind(this))
    function editCompanySuccess () {
      Helpers.showInfo(`The company ${this.state.title} was edited`)
      this.props.history.push('/companys-library/companys')
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
                <div>Title:</div>
                <input
                  className='form-control input-sm chat-input'
                  type='text' name='title' size='50' required
                  value={this.state.company.title}
                  onChange={this.handleUserChange} />
              </label>
              <label>
                <div>Image url:</div>
                <input
                  className='form-control input-sm chat-input'
                  type='url' name='imageUrl' size='50'
                  value={this.state.company.imageUrl}
                  onChange={this.handleUserChange} />
              </label>
              <br />
              <label>
                <div>Author:</div>
                <input
                  className='form-control input-sm chat-input'
                  type='text' name='author' required size='50'
                  value={this.state.company.author}
                  onChange={this.handleUserChange} />
              </label>
              <br />
              <label>
                <div>Description:</div>
                <textarea
                  className='form-control input-sm chat-input'
                  name='description' rows='10' cols='50'
                  value={this.state.company.description}
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
