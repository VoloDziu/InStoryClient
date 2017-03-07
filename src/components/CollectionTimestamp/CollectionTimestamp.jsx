import React from 'react'
import moment from 'moment'
import constants from '../../constants'

import './CollectionTimestamp.css'

const CollectionTimestamp = ({
  timestamp
}) => {
  let time = timestamp
  if (timestamp === moment().format(constants.TIME_FORMAT)) {
    time = 'Today'
  } else if (timestamp === moment().subtract(1, 'days').format(constants.TIME_FORMAT)) {
    time = 'Yesterday'
  }

  return (
    <div className="collection-timestamp">
      <div className="collection-timestamp__date">
        {time}
      </div>
    </div>
  )
}

export default CollectionTimestamp
