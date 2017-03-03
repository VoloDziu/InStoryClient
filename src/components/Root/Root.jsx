import React from 'react'
import {connect} from 'react-redux'

import {getUserId} from '../../store/userActions'

import App from '../App'
import LoginForm from '../LoginForm'
import Loading from '../Loading'

class Root extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      timeoutId: null
    }
  }

  componentWillMount () {
    this.state.timeoutId = setInterval(() => {
      let extensionDiv = document.getElementById('InStoryExtensionId')

      if (extensionDiv) {
        clearTimeout(this.state.timeoutId)
        this.props.getUserId(extensionDiv.dataset.id)
      }
    }, 100)
  }

  render () {
    const {userId, isFetching} = this.props

    let content = null
    if (isFetching) {
      content = <Loading />
    } else {
      if (userId) {
        content = <App />
      } else {
        content = <LoginForm />
      }
    }

    return content
  }
}

export default connect(
  state => {
    return {
      userId: state.user.id,
      isFetching: state.user.isFetching
    }
  },
  dispatch => {
    return {
      getUserId: (extensionId) => {
        dispatch(getUserId(extensionId))
      }
    }
  }
)(Root)
