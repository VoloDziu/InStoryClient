import React from 'react'

import './selectedImageView.css'

const SelectedImageView = ({
  image
}) => {
  return (
    <div className="selected-image-view">
      <a
        href={image.url}
        target="_blank"
        className="selected-image-view__img">
        <img src={image.src} />
      </a>
    </div>
  )
}

export default SelectedImageView
