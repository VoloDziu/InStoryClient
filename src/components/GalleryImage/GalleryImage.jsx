import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {DragSource} from 'react-dnd'

import constants from '../../constants'
import {Flex, FlexItem} from '../../Layouts/Flex'
import Checkbox from '../Checkbox'
import {
  toggleSelectImage,
  toggleCheckImage,
  setDraggingImages
} from '../../store/uiActions'

import './GalleryImage.css'

const GalleryImage = ({
  connectDragSource,
  isDraggingImages,
  img,
  userId,
  toggleSelectImage,
  toggleCheckImage,
  isSelected,
  isChecked
}) => {
  const classes = classnames('GalleryImage', {
    'GalleryImage--collected': img.isCollected,
    'GalleryImage--selected': isSelected,
    'GalleryImage--checked': isChecked,
    'GalleryImage--dragged': isDraggingImages && isChecked
  })

  return connectDragSource(
    <div
      className={classes}>
      <Flex
        alignItems="center"
        justifyContent="center">
        <FlexItem>
          <div
            className="GI-image">
            <div
              onClick={toggleSelectImage}
              className="GI-image__thumb">
              <img
                src={img.thumbSrc} />
            </div>

            <div
              className="GI-image__checkbox">
              <Checkbox
                onClick={toggleCheckImage}
                checked={isChecked} />
            </div>
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
        isDraggingImages: state.ui.isDraggingImages,
        isSelected: state.ui.selectedImage ? state.ui.selectedImage._id === img._id : false,
        isChecked: state.ui.checkedImages.indexOf(img._id) !== -1
      }
    },
    (dispatch, ownProps) => {
      const {img} = ownProps

      return {
        toggleCheckImage: () => {
          dispatch(toggleCheckImage(img))
        },
        toggleSelectImage: () => {
          dispatch(toggleSelectImage(img))
        },
        setDraggingImages: (value) => {
          dispatch(setDraggingImages(value))
        }
      }
    }
  ),
  DragSource(
    constants.IMAGE,
    {
      beginDrag (props) {
        if (!props.isChecked) {
          props.toggleCheckImage()
        }
        props.setDraggingImages(true)
        return {}
      },
      endDrag (props) {
        props.setDraggingImages(false)
        return {}
      }
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview()
    }
  ))
)(GalleryImage)
