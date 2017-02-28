import React from 'react'
import {connect} from 'react-redux'
import TextInput from '../../UI/TextInput'
import Button from '../../UI/Button'
import InputGroup from '../../Layouts/InputGroup'
import {Media, MediaBody, MediaFigure} from '../../Layouts/Media'
import {Modal, ModalWindow} from '../../Layouts/ModalWindow'
import {setUserId} from '../../store/userActions'

class LoginForm extends React.Component {
  constructor (props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
    this.changeId = this.changeId.bind(this)

    this.state = {
      userId: '',
      error: null
    }
  }

  submitForm (e) {
    e.preventDefault()
    let error = ''

    const {setUserId} = this.props

    if (this.state.userId === '') {
      error = 'user Id cannot be empty'
    }

    if (!error) {
      setUserId(this.state.userId)
    } else {
      this.setState({
        error
      })
    }
  }

  changeId (value) {
    this.setState({
      userId: value,
      error: ''
    })
  }

  render () {
    const {isFetching} = this.props

    return (
      <Modal>
        <ModalWindow
          border={false}
          body={
            <form onSubmit={this.submitForm}>
              <Media>
                <MediaBody>
                  <InputGroup
                    inline
                    label="User Id:"
                    error={this.state.error}
                    body={
                      <TextInput
                        value={this.state.userId}
                        error={this.state.error}
                        disabled={isFetching}
                        hasSuffix
                        changeCallback={this.changeId} />
                    } />
                </MediaBody>

                <MediaFigure
                  n={0}>
                  <Button
                    hasPrefix
                    disabled={isFetching}>Log In</Button>
                </MediaFigure>
              </Media>
            </form>
          }/>
      </Modal>
    )
  }
}

export default connect(
  state => {
    return {
      isFetching: state.user.isFetching
    }
  },
  dispatch => {
    const extensionId = document.getElementById('InStoryExtensionId').dataset.id
    return {
      setUserId: (userId) => {
        dispatch(setUserId(extensionId, userId))
      }
    }
  }
)(LoginForm)
