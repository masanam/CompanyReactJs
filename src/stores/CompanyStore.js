import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import api from '../utilities/api'

class CompanyStore extends EventEmitter {
  constructor () {
    super()
    this.company = ''
  }

  getAllCompany () {
    api.findAllCompany().then(loadCompanySuccess.bind(this))
    function loadCompanySuccess (company) {
      this.state({
        company
      })
    }
  }
  handleAction (action) {
    switch (action) {
      case 'GET_ALL_DATAS':
        this.getAllCompany(action.company)
        break
      default:
        console.log('Invalid action!')
        break
    }
  }
}

let companyStore = new CompanyStore()
dispatcher.register(companyStore.handleAction.bind(companyStore))
export default companyStore
