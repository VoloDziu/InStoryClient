import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import CollectionImagesList from '../CollectionImagesList'
import Timestamp from '../Timestamp'
import constants from '../../constants'

const CollectionView = ({
  images
}) => {
  const imagesByDate = {}

  for (let image of images) {
    const timestampDay = moment(image.timestamp).format(constants.TIME_FORMAT)

    if (imagesByDate[timestampDay]) {
      imagesByDate[timestampDay].push(image)
    } else {
      imagesByDate[timestampDay] = [image]
    }
  }

  const orderedDays = Object.keys(imagesByDate).sort((a, b) => {
    if (moment(a, constants.TIME_FORMAT) > moment(b, constants.TIME_FORMAT)) {
      return -1
    } else {
      return 1
    }
  })

  return (
    <div>
      {orderedDays.map((d, i) =>
        <div key={i}>
          <Timestamp timestamp={d} />

          <CollectionImagesList
            images={imagesByDate[d]
              .sort((imgA, imgB) => {
                if (imgA.timestamp > imgB.timestamp) {
                  return -1
                } else {
                  return 1
                }
              })
            } />
        </div>
      )}
    </div>
  )
}

export default connect(
  state => {
    const {
      ui: {
        selectedQueries,
        selectedCollection,
        selectedDate
      },
      history: {history}
    } = state

    let images = history ? history.images : []

    images = images.filter(img => {
      return (!selectedCollection || img.collectionIds.indexOf(selectedCollection._id) !== -1) &&
        (!selectedDate || moment(img.timestamp).format(constants.TIME_FORMAT) === selectedDate) &&
        (!selectedQueries.length || selectedQueries.map(q => q._id).indexOf(img.queryId) !== -1)
    })

    return {
      images
    }
  }
)(CollectionView)
