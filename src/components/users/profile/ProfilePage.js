import React, {Component} from 'react'

class ProfilePage extends Component {
  constructor (props) {
    super(props)

    const username = window.sessionStorage.getItem('username')
    this.state = {
      username
    }
  }


  render () {

    return (
      <div className='text-center'>
        <h2>{this.state.username}</h2>
        <hr />
      </div>
    )
  }
}

export default ProfilePage
