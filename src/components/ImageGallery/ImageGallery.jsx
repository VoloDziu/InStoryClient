import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'

import constants from '../../constants'
import {Flex, FlexItem} from '../../Layouts/Flex'
import GalleryRow from '../GalleryRow'
import Timestamp from '../Timestamp'
import Button from '../../UI/Button'
import {resetCheckedImages} from '../../store/uiActions'
import {deleteImages} from '../../store/historyActions'

import './ImageGallery.css'

const format = (timestamp) => moment(timestamp).format(constants.TIME_FORMAT)

const ImageGallery = ({
  userId,
  images,
  selectedQueries,
  selectedDate,
  checkedImages,
  resetCheckedImages,
  deleteImages
}) => {
  const elements = []

  let imageRow = []
  let lastImage = null
  let i = 0

  while (i < images.length) {
    let image = images[i]

    if (
      (!selectedDate || format(image.timestamp) === selectedDate) &&
      (selectedQueries.length === 0 || selectedQueries.indexOf(image.queryId) !== -1)
    ) {
      if (!lastImage || format(lastImage.timestamp) !== format(image.timestamp)) {
        elements.push(
          <GalleryRow
            key={i}
            images={imageRow} />
        )
        elements.push(
          <Timestamp
            key={image.timestamp}
            date={format(image.timestamp)} />
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
      <div className="ImageGallery__body">
        {elements}
      </div>

      {checkedImages.length
        ? <div className="ImageGallery__actions">
          <Flex>
            <FlexItem
              main>
              {checkedImages.length} selected
            </FlexItem>

            <FlexItem
              spacing={1}>
              <Button
                onClick={resetCheckedImages}
                link>
                clear
              </Button>
            </FlexItem>

            <FlexItem
              spacing={1}>
              <Button
                onClick={() => deleteImages(userId, checkedImages)}
                color="red"
                link>
                delete
              </Button>
            </FlexItem>
          </Flex>
        </div>
        : ''
      }
    </div>
  )
}

export default connect(
  state => ({
    userId: state.user.id,
    images: state.history.history
      ? state.history.history.images
      : [],
    selectedQueries: state.ui.selectedQueries,
    selectedDate: state.ui.selectedDate,
    checkedImages: state.ui.checkedImages
  }),
  dispatch => ({
    deleteImages: (userId, images) => {
      dispatch(deleteImages(userId, images))
    },
    resetCheckedImages: () => {
      dispatch(resetCheckedImages())
    }
  })
)(ImageGallery)
