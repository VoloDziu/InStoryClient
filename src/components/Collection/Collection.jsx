import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {DropTarget} from 'react-dnd'

import constants from '../../constants'
import {Flex, FlexItem} from '../../Layouts/Flex'
import Button from '../../UI/Button'
import TextInput from '../../UI/TextInput'
import Checkbox from '../Checkbox'

import {
  updateCollection,
  addImagesToCollection
} from '../../store/historyActions'
import {toggleCheckCollection} from '../../store/uiActions'

import './Collection.css'

class Collection extends React.Component {
  constructor (props) {
    super(props)

    this.startEditing = this.startEditing.bind(this)
    this.cancelEditing = this.cancelEditing.bind(this)
    this.saveEditing = this.saveEditing.bind(this)
    this.deleteCollection = this.deleteCollection.bind(this)

    this.state = {
      newName: null,
      error: null,
      isEditing: false
    }
  }

  startEditing () {
    this.setState({
      newName: this.props.collection.name,
      isEditing: true,
      error: null
    })
  }

  cancelEditing () {
    this.setState({
      isEditing: false
    })
  }

  saveEditing (e) {
    e.preventDefault()
    const {updateCollection, userId, collection} = this.props

    if (this.state.newName === '') {
      this.setState({
        error: 'name cannot be blank'
      })
    } else {
      updateCollection(
        userId,
        collection._id,
        {
          name: this.state.newName
        },
        () => {
          this.setState({
            isEditing: false
          })
        }
      )
    }
  }

  deleteCollection () {
    const {deleteCollection, userId, collection} = this.props

    deleteCollection(userId, collection._id)
  }

  changeName (value) {
    this.setState({
      error: null,
      newName: value
    })
  }

  render () {
    const {
      collection,
      isUpdating,
      connectDropTarget,
      isOver,
      toggleCheckCollection,
      isChecked
    } = this.props

    const classes = classnames('Collection', {
      'Collection--interactive': !this.state.isEditing,
      'Collection--is-over': isOver,
      'Collection--selected': isChecked
    })

    if (this.state.isEditing) {
      return (
        <div
          className={classes}>
          <Flex>
            <FlexItem>
              <Checkbox
                onClick={toggleCheckCollection}
                checked={isChecked} />
            </FlexItem>

            <FlexItem
              spacing={1}
              main>
              <form
                onSubmit={this.saveEditing}>
                <Flex>
                  <FlexItem
                    main>
                    <TextInput
                      changeCallback={v => this.changeName(v)}
                      value={this.state.newName}
                      error={this.state.error}
                      disabled={isUpdating}
                       />
                  </FlexItem>

                  <FlexItem
                    spacing={1}>
                    <Button
                      color="green"
                      link
                      disabled={isUpdating}>save</Button>
                  </FlexItem>
                </Flex>
              </form>
            </FlexItem>

            <FlexItem
              spacing={1}>
              <Button
                link
                disabled={isUpdating}
                onClick={this.cancelEditing}>cancel</Button>
            </FlexItem>
          </Flex>
        </div>
      )
    } else {
      return connectDropTarget(
        <div
          className={classes}>
          <Flex>
            <FlexItem
              main>
              <div
                onClick={toggleCheckCollection}
                className="Collection__body">
                <Flex>
                  <FlexItem>
                    <Checkbox
                      checked={isChecked} />
                  </FlexItem>

                  <FlexItem
                    spacing={1}
                    main>
                    <div
                      className="Collection__name">
                      {collection.name}
                    </div>
                  </FlexItem>
                </Flex>
              </div>
            </FlexItem>

            <FlexItem
              spacing={1}>
              <div className="Collection__side">
                <div className="Collection__actions">
                  <Button
                    link
                    disabled={isUpdating}
                    onClick={this.startEditing}>
                    edit
                  </Button>
                </div>

                <div className="Collection__info">
                  {collection.imagesCount} images
                </div>
              </div>
            </FlexItem>
          </Flex>
        </div>
      )
    }
  }
}

export default compose(
  connect(
    (state, ownProps) => {
      const {collection} = ownProps

      return {
        userId: state.user.id,
        checkedImages: state.ui.checkedImages,
        isUpdating: state.history.isUpdating,
        isChecked: state.ui.checkedCollections.indexOf(collection._id) !== -1
      }
    },
    (dispatch, ownProps) => {
      const {collection} = ownProps

      return {
        toggleCheckCollection: () => {
          dispatch(toggleCheckCollection(collection))
        },
        updateCollection: (userId, collectionId, collection, callback) => {
          dispatch(updateCollection(userId, collectionId, collection, callback))
        },
        addImagesToCollection: (userId, collectionId, imageIds) => {
          dispatch(addImagesToCollection(userId, collectionId, imageIds))
        }
      }
    }
  ),
  DropTarget(
    constants.IMAGE,
    {
      drop (props, monitor) {
        props.addImagesToCollection(props.userId, props.collection._id, props.checkedImages)
      }
    },
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    }
  ))
)(Collection)
