import React from 'react'
import {connect} from 'react-redux'

import {getUserId} from '../../store/userActions'

import ViewRoot from '../../Layouts/ViewRoot'
import InStory from '../InStory'
import LoginForm from '../LoginForm'
import Loading from '../Loading'

class App extends React.Component {
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
        content = <InStory />
      } else {
        content = <LoginForm />
      }
    }

    return (
      <ViewRoot
        fixed>
        {content}
      </ViewRoot>
    )
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
)(App)
