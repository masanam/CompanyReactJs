import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Helpers from '../../utilities/Helpers'
import api from '../../utilities/api'
import EditCompanyPage from './EditCompanyPage'
import './CompanyPage.css'

import CompanyStore from '../../stores/CompanyStore'

class CompanyView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userId: '',
      company: []
    }

    this.getCompany = this.getCompany.bind(this)
  }

  getCompany () {
    let company = CompanyStore.getAllCompany()
    console.log(company)
    this.setState({
      company,
      userId: window.sessionStorage.getItem('userId')
    })
  }

  componentDidMount () {
    api.findAllCompany().then(loadCompanySuccess.bind(this))
    function loadCompanySuccess (company) {
      this.setState({
        company: company.data,
        userId: window.sessionStorage.getItem('userId')
      })
      Helpers.showInfo('Company loaded')
    }
  }

  prepareCompanyForEdit (companyId) {
    api.findCompanyById(companyId)
      .then(loadCompanyForEditSuccess.bind(this))

    function loadCompanyForEditSuccess (companyInfo) {
      this.showView(
        <EditCompanyPage
          onsubmit={this.editCompany.bind(this)}
          companyId={companyInfo.data.id}
          title={companyInfo.data.name}
          author={companyInfo.data.address}
          description={companyInfo.data.phone}
        />
      )
    }
  }

  render () {
    console.log(this.state.company)

    let companyRows = this.state.company.map(item =>
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.address}</td>
        <td>{item.phone}</td>
        <td><Link to={`/company/details/${item.id}`}>More info</Link></td>
      </tr>
      
    )

    return (
      <div className='company-view text-center'>
        <h1>All Company</h1>
        <table className='company-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {companyRows}
          </tbody>
        </table>
      </div>
    )
  }
}

export default CompanyView
