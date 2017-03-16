import React from 'react'

import ResolutionPicker from '../ResolutionPicker'

import './ImageFilter.css'

const ImageFilter = () => {
  return (
    <div className="ImageFilter">
      <div className="ImageFilter__size">
        <ResolutionPicker />
      </div>
    </div>
  )
}

export default ImageFilter
