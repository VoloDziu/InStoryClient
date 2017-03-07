import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {DropTarget} from 'react-dnd'

import constants from '../../constants'
import {Flex, FlexItem} from '../../Layouts/Flex'
import Button from '../../UI/Button'
import Icon from '../../UI/Icon'
import TextInput from '../../UI/TextInput'

import icon from './icon-folder.svg'

import {updateCollection, deleteCollection} from '../../store/historyActions'
import {toggleSelectCollection} from '../../store/uiActions'

import './SidebarCollection.css'

class SidebarCollection extends React.Component {
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

  saveEditing () {
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
      imagesCount,
      isUpdating,
      toggleSelectCollection,
      connectDropTarget,
      isOver,
      isSelected
    } = this.props

    let body = ''
    let actions = ''

    const classes = classnames('sidebar-collection', {
      'sidebar-collection--interactive': !this.state.isEditing,
      'sidebar-collection--is-over': isOver,
      'sidebar-collection--selected': isSelected
    })

    if (this.state.isEditing) {
      body = (
        <Flex>
          <FlexItem>
            <div
              className="sc-icon">
              <Icon icon={icon} />

              <div
                className="sc-icon__counter">
                {imagesCount}
              </div>
            </div>
          </FlexItem>

          <FlexItem
            spacing={1}
            main>
            <TextInput
              changeCallback={v => this.changeName(v)}
              value={this.state.newName}
              error={this.state.error}
              disabled={isUpdating}
               />
          </FlexItem>
        </Flex>
      )

      actions = (
        <div className="sidebar-collection__actions">
          <Flex
            alignItems="center">
            <FlexItem>
              <Button
                color="green"
                link
                disabled={isUpdating}
                onClick={this.saveEditing}>save</Button>
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
      body = (
        <div
          className="sidebar-collection__body"
          onClick={toggleSelectCollection}>
          <Flex>
            <FlexItem>
              <div
                className="sc-icon">
                <Icon icon={icon} />

                <div
                  className="sc-icon__counter">
                  {imagesCount}
                </div>
              </div>
            </FlexItem>

            <FlexItem
              spacing={1}
              main>
              <div
                className="sidebar-collection__name">
                {collection.name}
              </div>
            </FlexItem>
          </Flex>
        </div>
      )

      actions = (
        <div className="sidebar-collection__actions">
          <Flex
            alignItems="center">
            <FlexItem>
              <Button
                link
                disabled={isUpdating}
                onClick={this.startEditing}>edit</Button>
            </FlexItem>

            <FlexItem
              spacing={1}>
              <Button
                link
                disabled={isUpdating}
                color="red"
                onClick={this.deleteCollection}>delete</Button>
            </FlexItem>
          </Flex>
        </div>
      )
    }

    return connectDropTarget(
      <div
        className={classes}>
        <Flex>
          <FlexItem
            main>
            {body}
          </FlexItem>

          <FlexItem
            spacing={1.5}>
            {actions}
          </FlexItem>
        </Flex>
      </div>
    )
  }
}

const CollectionTarget = {
  drop (targetProps, monitor) {
    const sourceProps = monitor.getItem()

    console.log('drop', sourceProps, targetProps)
  }
}

export default compose(
  connect(
    (state, ownProps) => {
      const {collection} = ownProps

      return {
        userId: state.user.id,
        isUpdating: state.history.isUpdating,
        isSelected: state.ui.selectedCollection === collection,
        imagesCount: state.history.history.images
          .filter(img => img.collectionIds.indexOf(collection._id) !== -1)
          .length
      }
    },
    (dispatch, ownProps) => {
      const {collection} = ownProps

      return {
        toggleSelectCollection: () => {
          dispatch(toggleSelectCollection(collection))
        },
        updateCollection: (userId, collectionId, collection, callback) => {
          dispatch(updateCollection(userId, collectionId, collection, callback))
        },
        deleteCollection: (userId, collectionId) => {
          dispatch(deleteCollection(userId, collectionId))
        }
      }
    }
  ),
  DropTarget(constants.IMAGE, CollectionTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }))
)(SidebarCollection)
