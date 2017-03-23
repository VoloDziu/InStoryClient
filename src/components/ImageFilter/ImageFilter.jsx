import React from 'react'

import ResolutionPicker from '../ResolutionPicker'
import ColorPicker from '../ColorPicker'
import Filter from '../Filter'
import FilterHeader from '../FilterHeader'
import {FilterBody, FilterBodySection} from '../FilterBody'

import './ImageFilter.css'

const ImageFilter = () => {
  return (
    <Filter
      value="image"
      header={
        <FilterHeader
          value="image"
          title="Image" />
      }
      body={
        <FilterBody>
          <FilterBodySection>
            <ResolutionPicker />
          </FilterBodySection>

          <FilterBodySection>
            <ColorPicker />
          </FilterBodySection>
        </FilterBody>
      } />
  )
}

export default ImageFilter
