import React from 'react'
import {connect} from 'react-redux'

import {
  IMAGES_PER_ROW,
  toDay
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
      checkedImages,
      selectedCollectionId,
      selectedDate,
      checkedQueries,
      widthRange,
      heightRange
    } = this.props

    const elements = []

    let imageRow = []
    let lastImage = null
    let i = 0

    while (i < images.length) {
      let image = images[i]

      if (
        (!selectedCollectionId || image.collectionIds.indexOf(selectedCollectionId) !== -1) &&
        (!selectedDate || toDay(image.timestamp) === selectedDate) &&
        (checkedQueries.length === 0 || checkedQueries.indexOf(image.queryId) !== -1) &&
        (!image.width || image.width >= widthRange[0] && image.width <= widthRange[1]) &&
        (!image.height || image.height >= heightRange[0] && image.height <= heightRange[1])
      ) {
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

export default connect(
  state => ({
    images: state.history.images,
    selectedCollectionId: state.selected.collectionId,
    selectedDate: state.selected.date,
    checkedQueries: Object.keys(state.checked.queries),
    checkedImages: Object.keys(state.checked.images),
    widthRange: state.image.widthRange.length
      ? state.image.widthRange
      : [0, state.history.maxWidth],
    heightRange: state.image.heightRange.length
      ? state.image.heightRange
      : [0, state.history.maxHeight]
  })
)(ImageGallery)
