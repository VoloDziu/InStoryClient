import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {DragSource} from 'react-dnd'

import constants from '../../constants'
import {Flex, FlexItem} from '../../Layouts/Flex'
import {toggleSelectImage} from '../../store/uiActions'
import {deleteImage} from '../../store/historyActions'

import './CollectionImage.css'
import deleteIcon from './delete.svg'

const CollectionImageSource = {
  beginDrag (props) {
    console.log('beging dragging image', props)

    return {}
  }
}

const CollectionImage = ({
  connectDragSource,
  isDragging,
  img,
  userId,
  deleteImage,
  toggleSelectImage,
  isSelected
}) => {
  const classes = classnames('collection-image', {
    'collection-image--collected': img.isCollected,
    'collection-image--selected': isSelected,
    'collection-image--dragged': isDragging
  })

  return connectDragSource(
    <div
      className={classes}>
      <Flex
        alignItems="center"
        justifyContent="center">
        <FlexItem>
          <div
            className="ci-image">
            <div
              onClick={toggleSelectImage}
              className="ci-image__thumb">
              <img
                src={img.thumbSrc} />
            </div>

            <button
              style={{
                backgroundImage: `url(${deleteIcon})`
              }}
              onClick={() => deleteImage(userId)}
              className="ci-image__delete" />
          </div>
        </FlexItem>
      </Flex>
    </div>
  )
}

export default compose(
  connect(
    (state, ownProps) => {
      const {img} = ownProps

      return {
        userId: state.user.id,
        isSelected: state.ui.selectedImage && state.ui.selectedImage._id === img._id
      }
    },
    (dispatch, ownState) => {
      const {img} = ownState

      return {
        toggleSelectImage: () => {
          dispatch(toggleSelectImage(img))
        },
        deleteImage: (userId) => {
          dispatch(deleteImage(userId, img._id))
        }
      }
    }
  ),
  DragSource(constants.IMAGE, CollectionImageSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(CollectionImage)
