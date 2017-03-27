import React from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import {
  IMAGES_PER_ROW,
  toDay,
  intersect,
  getColorNames
} from '../../constants'
import GalleryRow from '../GalleryRow'
import FiltersPreview from '../FiltersPreview'
import ImageGroupActions from '../ImageGroupActions'
import Timestamp from '../Timestamp'
import Box from '../../Layouts/Box'

import './ImageGallery.css'

class ImageGallery extends React.Component {
  render () {
    const {
      images,
      checkedImages
    } = this.props

    const elements = []

    let imageRow = []
    let lastImage = null
    let i = 0

    while (i < images.length) {
      let image = images[i]

      if (!lastImage || toDay(lastImage.timestamp) !== toDay(image.timestamp)) {
        elements.push(
          <GalleryRow
            key={i}
            images={imageRow} />
        )
        elements.push(
          <Box
            key={image.timestamp}
            l={2.5} r={2.5} b={0}>
            <Timestamp
              date={toDay(image.timestamp)} />
          </Box>
        )

        imageRow = []
      }

      imageRow.push(image)
      lastImage = image

      if (imageRow.length === IMAGES_PER_ROW) {
        elements.push(
          <GalleryRow
            key={i}
            images={imageRow} />
        )

        imageRow = []
      }

      i++
    }

    if (imageRow.length) {
      elements.push(
        <GalleryRow
          key={i}
          images={imageRow} />
      )
    }

    return (
      <div
        className="ImageGallery">
        <div
          className="ImageGallery__header">
          {checkedImages.length > 0
            ? <ImageGroupActions />
            : <FiltersPreview />
          }
        </div>

        <div
          ref={el => { this._bodyElement = el }}
          className="ImageGallery__body">
          {elements}
        </div>
      </div>
    )
  }
}

const getImages = createSelector(
  [
    (state) => state.history.images,
    (state) => state.selected.day,
    (state) => state.selected.collectionId,
    (state) => state.checked.queries,
    (state) => state.checked.colors,
    (state) => state.image.widthRange,
    (state) => state.image.heightRange
  ],
  (images, selectedDay, selectedCollectionId, checkedQueries, checkedColors, widthRange, heightRange) => {
    let matchingImages = []

    for (let image of images) {
      if (
        (!selectedDay || toDay(image.timestamp) === selectedDay) &&
        (!selectedCollectionId || image.collectionIds.indexOf(selectedCollectionId) !== -1) &&
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

export default connect(
  state => ({
    images: getImages(state),
    checkedImages: Object.keys(state.checked.images)
  })
)(ImageGallery)
