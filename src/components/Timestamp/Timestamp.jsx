import React from 'react'
import moment from 'moment'

import constants from '../../constants'

import './Timestamp.css'

const Timestamp = ({
  date
}) => {
  let time = date
  if (date === moment().format(constants.TIME_FORMAT)) {
    time = 'Today'
  } else if (date === moment().subtract(1, 'days').format(constants.TIME_FORMAT)) {
    time = 'Yesterday'
  }

  return (
    <div className="Timestamp">
      <div
        className="Timestamp__date">{time}</div>
    </div>
  )
}

export default Timestamp
