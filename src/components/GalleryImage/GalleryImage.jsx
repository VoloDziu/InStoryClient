import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {DragSource} from 'react-dnd'

import constants from '../../constants'
import {Flex, FlexItem} from '../../Layouts/Flex'
import Checkbox from '../Checkbox'
import {toggleSelectImage, toggleCheckImage} from '../../store/uiActions'

import './GalleryImage.css'

const GalleryImageSource = {
  beginDrag (props) {
    console.log('beging dragging image', props)

    return {}
  }
}

const GalleryImage = ({
  connectDragSource,
  isDragging,
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
    'GalleryImage--dragged': isDragging
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
              onClick={toggleCheckImage}
              className="GI-image__checkbox">
              <Checkbox
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
        }
      }
    }
  ),
  DragSource(constants.IMAGE, GalleryImageSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(GalleryImage)
