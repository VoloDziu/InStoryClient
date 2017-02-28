import React from 'react'
import {connect} from 'react-redux'

import Button from '../../UI/Button'

import './selectedImageView.css'

const SelectedImageView = ({
  selectedImage
}) => {
  return (
    <div className="selected-image-view">
      <a
        href={selectedImage.url}
        className="selected-image-view__img">
        <img src={selectedImage.src} />
      </a>
    </div>
  )
}

export default connect(
  state => {
    return {
      selectedImage: state.ui.selectedImage
    }
  }
)(SelectedImageView)
