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
        title: '',
        author: '',
        description: '',
        imageUrl: '',
        addedByUser: ''
      }
    }
  }

  componentDidMount () {
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

  // prepareCompanyForEdit (companyId) {
  //   api.findCompanyById(companyId)
  //     .then(loadCompanyForEditSuccess.bind(this))

  //   function loadCompanyForEditSuccess (companyInfo) {
  //     this.showView(
  //       <EditCompanyPage
  //         onsubmit={this.editCompany.bind(this)}
  //         companyId={companyInfo._id}
  //         title={companyInfo.title}
  //         author={companyInfo.author}
  //         description={companyInfo.description}
  //       />
  //     )
  //   }
  // }

  render () {
    const company = this.state.company
    if (company) {
      return (
        <div className='company-details'>
          <div className='row'>
            <div cclassNamelass='col-sm-4'>
              <img src={company.imageUrl} alt={company.title + ' company'} />
            </div>
            <div className='col-sm-4'>
              <h2>{company.title}</h2>
              <h3>{company.author}</h3>
              <p>{company.description}</p>
              <div>
                Added by user: <em>{company.addedByUser}</em>
              </div>
              {this.getActions(company)}
              {/* <Link to={`/companys-library/edit-company/${company.companyId}`}>
                <button className='btn btn-primary'>Edit</button>
              </Link>
              &nbsp;
              <Link to={`/companys-library/delete-company/${company.companyId}`}>
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
          <Link to={`/companys-library/edit-company/${company.companyId}`}>
            <button className='btn btn-info'>Edit</button>
          </Link>
          &nbsp;
          <Link to={`/companys-library/delete-company/${company.companyId}`}>
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
