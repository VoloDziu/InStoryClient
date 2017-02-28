import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'

import {toggleSelectImage} from '../../store/uiActions'

import './CollectionImage.css'

const CollectionImage = ({
  img,
  toggleSelectImage,
  isSelected
}) => {
  const classes = classnames('collection-image', {
    'collection-image--collected': img.isCollected,
    'collection-image--selected': isSelected
  })

  return (
    <div
      className={classes}
      onClick={toggleSelectImage}>
      <div
        className="collection-image__img">
        <img
          src={img.thumbSrc} />
      </div>

      {img.isCollected
        ? <div className="collection-image__badge" />
        : ''
      }
    </div>
  )
}

export default connect(
  (state, ownProps) => {
    const {img} = ownProps

    return {
      isSelected: state.ui.selectedImage && state.ui.selectedImage._id === img._id
    }
  },
  (dispatch, ownState) => {
    const {img} = ownState

    return {
      toggleSelectImage: () => {
        dispatch(toggleSelectImage(img))
      }
    }
  }
)(CollectionImage)
