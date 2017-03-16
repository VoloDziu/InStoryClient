import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'

import constants from '../../constants'
import GalleryRow from '../GalleryRow'
import GalleryHeader from '../GalleryHeader'
import Timestamp from '../Timestamp'
import Box from '../../Layouts/Box'

import './ImageGallery.css'

const format = (timestamp) => moment(timestamp).format(constants.TIME_FORMAT)

const intersect = (arr1, arr2) => {
  return arr1.filter(item => arr2.indexOf(item) !== -1)
}

const ImageGallery = ({
  userId,
  images,
  checkedQueries,
  selectedDate,
  checkedImages,
  resetCheckedImages,
  deleteImages,
  heightRange,
  widthRange,
  checkedCollections
}) => {
  const elements = []

  let imageRow = []
  let lastImage = null
  let i = 0

  while (i < images.length) {
    let image = images[i]

    if (
      (checkedCollections.length === 0 || intersect(checkedCollections, image.collectionIds).length !== 0) &&
      (!selectedDate || format(image.timestamp) === selectedDate) &&
      (checkedQueries.length === 0 || checkedQueries.indexOf(image.queryId) !== -1) &&
      (!image.height || (image.height >= heightRange[0] && image.height <= heightRange[1])) &&
      (!image.width || (image.width >= widthRange[0] && image.width <= widthRange[1]))
    ) {
      if (!lastImage || format(lastImage.timestamp) !== format(image.timestamp)) {
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
              date={format(image.timestamp)} />
          </Box>
        )

        imageRow = []
      }

      imageRow.push(image)
      lastImage = image

      if (imageRow.length === constants.IMAGES_PER_ROW) {
        elements.push(
          <GalleryRow
            key={i}
            images={imageRow} />
        )

        imageRow = []
      }
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
    <div className="ImageGallery">
      <div className="ImageGallery__header">
        <GalleryHeader />
      </div>

      <div className="ImageGallery__body">
        {elements}
      </div>
    </div>
  )
}

export default connect(
  state => ({
    images: state.history.history
      ? state.history.history.images
      : [],
    checkedQueries: state.ui.checkedQueries,
    selectedDate: state.ui.selectedDate,
    checkedImages: state.ui.checkedImages,
    checkedCollections: state.ui.checkedCollections,
    heightRange: state.ui.heightRange.length
      ? state.ui.heightRange
      : [0, 10000],
    widthRange: state.ui.widthRange.length
      ? state.ui.widthRange
      : [0, 10000]
  })
)(ImageGallery)
