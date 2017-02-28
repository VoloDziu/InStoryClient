import React from 'react'
import moment from 'moment'

import './CollectionTimestamp.css'

const CollectionTimestamp = ({
  timestamp
}) => {
  let time = timestamp
  if (timestamp === moment().format('MMM Do YY')) {
    time = 'Today'
  } else if (timestamp === moment().subtract(1, 'days').format('MMM Do YY')) {
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
