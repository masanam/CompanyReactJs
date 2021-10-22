import React, { Component } from 'react'
import api from '../../utilities/api'
import { Link } from 'react-router-dom'

import './CompanyDetails.css'

class CompanyDetails extends Component {
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
  }

  componentDidMount () {
    let id = this.props.match.params.id
    api.findCompanyById(id).then(findCompanyByIdSuccess.bind(this))
    function findCompanyByIdSuccess (company) {
      console.log(company.data)

      this.setState({
        company: {
          companyId: id,
          name: company.data.name,
          address: company.address,
          phone: company.phone,

        }
      })
    }
  }
  // prepareCompanyForEdit (companyId) {
  //   api.findCompanyById(companyId)
  //     .then(loadCompanyForEditSuccess.bind(this))

  //   function loadCompanyForEditSuccess (companyInfo) {
  //     this.showView(
  //       <EditCompanyPage
  //         onsubmit={this.editCompany.bind(this)}
  //         companyId={companyInfo._id}
  //         title={companyInfo.name}
  //         author={companyInfo.address}
  //         description={companyInfo.phone}
  //       />
  //     )
  //   }
  // }

  render () {
    const company = this.state.company
    console.log(company)

    if (company) {
      return (
        <div className='company-details'>
          <div className='row'>
            <div className='col-sm-4'>
              <h2>{company.name}</h2>
              <h3>{company.address}</h3>
              <p>{company.phone}</p>
              {this.getActions(company)}
              {/* <Link to={`/company/edit-company/${company.companyId}`}>
                <button className='btn btn-primary'>Edit</button>
              </Link>
              &nbsp;
              <Link to={`/company/delete-company/${company.companyId}`}>
                <button className='btn btn-primary'>Delete</button>
              </Link> */}
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  getActions (company) {
    if (company.addedByUser === window.sessionStorage.getItem('username')) {
      return (
        <td>
          <Link to={`/company/edit/${company.companyId}`}>
            <button className='btn btn-info'>Edit</button>
          </Link>
          &nbsp;
          <Link to={`/company/delete/${company.companyId}`}>
            <button className='btn btn-danger'>Delete</button>
          </Link>
        </td>
      )
    } else {
      return <td />
    }
  }
}

export default CompanyDetails
