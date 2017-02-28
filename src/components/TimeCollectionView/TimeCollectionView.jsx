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

          <Box t={0} b={0} l={1} r={1}>
            <CollectionImagesList images={imagesByDate[d]
                .sort((imgA, imgB) => {
                  if (imgA.timestamp > imgB.timestamp) {
                    return -1
                  } else {
                    return 1
                  }
                })
              } />
          </Box>
        </div>
      )}
    </div>
  )
}

export default connect(
  state => {
    const images = state.history.history
      ? state.history.history.topics
        .reduce((acc, topic) => {
          let topicQueries = []

          for (let query of topic.queries) {
            let images = query.images
              .map(i => {
                return Object.assign({}, i, {
                  query
                })
              })

            if (state.ui.selectedQueries.length) {
              images = images.filter(i => state.ui.selectedQueries.indexOf(i.query) !== -1)
            }
            topicQueries = [...topicQueries, ...images]
          }

          return [...topicQueries, ...acc]
        }, [])
      : []

    return {
      images
    }
  }
)(TimeCollectionView)
