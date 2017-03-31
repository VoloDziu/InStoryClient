import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {DropTarget} from 'react-dnd'
import {createSelector} from 'reselect'

import {Flex, FlexItem} from '../../Layouts/Flex'
import Button from '../../UI/Button'
import TextInput from '../../UI/TextInput'
import Checkbox from '../Checkbox'
import {
  logSelectedCollection,
  logEditCollection,
  logAddImagesToCollection
} from '../../logger'

import {
  updateCollection,
  addImagesToCollection
} from '../../store/historyActions'
import {
  resetSelectedImage,
  toggleSelectCollection,
  uncheckAllImages,
  uncheckAllImagesExcept
} from '../../store/filterActions'
import {
  IMAGE,
  toDay,
  intersect,
  getColorNames
} from '../../constants'

import './Collection.css'

class Collection extends React.Component {
  constructor (props) {
    super(props)

    this.startEditing = this.startEditing.bind(this)
    this.cancelEditing = this.cancelEditing.bind(this)
    this.saveEditing = this.saveEditing.bind(this)

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

  changeName (value) {
    this.setState({
      error: null,
      newName: value
    })
  }

  render () {
    const {
      collection,
      matchingImages,
      isUpdating,
      connectDropTarget,
      isOver,
      toggleSelectCollection,
      isSelected,
      userId
    } = this.props

    const classes = classnames('Collection', {
      'Collection--interactive': !this.state.isEditing,
      'Collection--is-over': isOver,
      'Collection--selected': isSelected
    })

    if (this.state.isEditing) {
      return (
        <div
          className={classes}>
          <Flex>
            <FlexItem>
              <Checkbox
                onClick={() => toggleSelectCollection(isSelected, matchingImages, userId)}
                checked={isSelected} />
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
                onClick={() => toggleSelectCollection(isSelected, matchingImages, userId)}
                className="Collection__body">
                <Flex>
                  <FlexItem>
                    <Checkbox
                      checked={isSelected} />
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
                  {matchingImages.length} images
                </div>
              </div>
            </FlexItem>
          </Flex>
        </div>
      )
    }
  }
}

const makeGetImages = () => {
  return createSelector(
    [
      (state, props) => state.history.images.filter(img => img.collectionIds.indexOf(props.collection._id) !== -1),
      (state, props) => state.history.collections.find(c => c._id === props.collection._id),
      (state) => state.selected.day,
      (state) => state.checked.queries,
      (state) => state.checked.colors,
      (state) => state.image.widthRange,
      (state) => state.image.heightRange
    ],
    (images, collection, selectedDay, checkedQueries, checkedColors, widthRange, heightRange) => {
      const matchingImages = []

      for (let image of images) {
        if (
          (!selectedDay || toDay(image.timestamp) === selectedDay) &&
          (Object.keys(checkedQueries).length === 0 || Object.keys(checkedQueries).indexOf(image.queryId) !== -1) &&
          (Object.keys(checkedColors).length === 0 || intersect(getColorNames(image.colors), Object.keys(checkedColors))) &&
          (widthRange.length === 0 || (image.width >= widthRange[0] && image.width <= widthRange[1])) &&
          (heightRange.length === 0 || (image.height >= heightRange[0] && image.height <= heightRange[1]))
        ) {
          matchingImages.push(image)
        }
      }

      return matchingImages
    }
  )
}

export default compose(
  connect(
    (state, ownProps) => {
      const {collection} = ownProps
      const getImages = makeGetImages()

      return {
        matchingImages: getImages(state, ownProps),
        userId: state.user.id,
        checkedImages: Object.keys(state.checked.images),
        isUpdating: state.history.isUpdating,
        isSelected: state.selected.collectionId === collection._id
      }
    },
    (dispatch, ownProps) => {
      const {collection} = ownProps

      return {
        toggleSelectCollection: (isSelected, collectionImages, userId) => {
          dispatch(resetSelectedImage())

          if (!isSelected) {
            logSelectedCollection(userId, collection.name)
            dispatch(uncheckAllImagesExcept(collectionImages.map(i => i._id)))
          } else {
            logSelectedCollection(userId, null)
          }

          dispatch(toggleSelectCollection(collection._id))
        },
        updateCollection: (userId, collectionId, collection, callback) => {
          logEditCollection(userId, collection.name)
          dispatch(updateCollection(userId, collectionId, collection, callback))
        },
        addImagesToCollection: (userId, collectionId, imageIds) => {
          logAddImagesToCollection(userId, imageIds, collectionId)
          dispatch(addImagesToCollection(userId, collectionId, imageIds, false, () => {
            dispatch(resetSelectedImage())
            dispatch(uncheckAllImages())
          }))
        }
      }
    }
  ),
  DropTarget(
    IMAGE,
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
