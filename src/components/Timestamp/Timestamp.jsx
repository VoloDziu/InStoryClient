import React from 'react'
import moment from 'moment'

import {
  TIME_FORMAT,
  toDay
} from '../../constants'

import './Timestamp.css'

const Timestamp = ({
  date
}) => {
  let time = date
  if (date === toDay(new Date())) {
    time = 'Today'
  } else if (date === moment().subtract(1, 'days').format(TIME_FORMAT)) {
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
