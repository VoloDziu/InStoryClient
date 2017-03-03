import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'

import CollectionImagesList from '../CollectionImagesList'
import Box from '../../Layouts/Box'
import CollectionTimestamp from '../CollectionTimestamp'

const TIME_FORMAT = 'MMM Do YY'

const TimeCollectionView = ({
  images
}) => {
  const imagesByDate = {}

  for (let image of images) {
    const timestampDay = moment(image.timestamp).format(TIME_FORMAT)
    if (imagesByDate[timestampDay]) {
      imagesByDate[timestampDay].push(image)
    } else {
      imagesByDate[timestampDay] = [image]
    }
  }

  const orderedDays = Object.keys(imagesByDate).sort((a, b) => {
    if (moment(a, TIME_FORMAT) > moment(b, TIME_FORMAT)) {
      return -1
    } else {
      return 1
    }
  })

  return (
    <div>
      {orderedDays.map((d, i) =>
        <div key={i}>
          <Box t={2.5} b={1.5} l={1.5} r={1.5}>
            <CollectionTimestamp timestamp={d} />
          </Box>

          <CollectionImagesList images={imagesByDate[d]
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
    const {ui: {selectedQueries}, history: {history}} = state
    let images = history ? history.images : []

    console.log(selectedQueries, history)

    if (selectedQueries.length) {
      images = images.filter(img => selectedQueries.map(q => q._id).indexOf(img.queryId) !== -1)
    }

    return {
      images
    }
  }
)(TimeCollectionView)
