import React, { Component } from 'react'
import api from '../../utilities/api'
import Helpers from '../../utilities/Helpers'
import './Form.css'

class CreateCompanyPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      company: {
        title: '',
        author: '',
        description: '',
        imageUrl: '',
        addedByUser: ''
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
      this.state.company.title,
      this.state.company.author,
      this.state.company.description,
      this.state.company.imageUrl,
      username
    )
    .then(createCompanySuccess.bind(this))
    function createCompanySuccess () {
      Helpers.showInfo(`The company ${this.state.title} was created!`)
      this.props.history.push('/companys-library/companys')
    }
  }

  render () {
    return (
      <div className='row'>
        <div className='col-md-offset-4 col-md-3'>
          <form className='company-form'>
            <h2>Create Company</h2>
            <label>
              <div>Title:</div>
              <input
                className='form-control input-sm chat-input'
                type='text' name='title' size='50' required
                value={this.state.company.title}
                onChange={this.handleUserChange} />
            </label>
            <br />
            <label>
              <div>Company image url (optional):</div>
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
