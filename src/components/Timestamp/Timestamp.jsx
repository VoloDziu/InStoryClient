import React from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux'
import moment from 'moment'

import {toggleSelectDate} from '../../store/uiActions'
import constants from '../../constants'

import './Timestamp.css'

const Timestamp = ({
  timestamp,
  isSelected,
  isUpdating,
  toggleSelectDate
}) => {
  let time = timestamp
  if (timestamp === moment().format(constants.TIME_FORMAT)) {
    time = 'Today'
  } else if (timestamp === moment().subtract(1, 'days').format(constants.TIME_FORMAT)) {
    time = 'Yesterday'
  }

  const classes = classnames('timestamp', {
    'timestamp--selected': isSelected
  })

  return (
    <div className={classes}>
      <div
        className="timestamp__date"
        onClick={() => {
          if (isUpdating) {
            return
          } else {
            toggleSelectDate()
          }
        }}>{time}</div>
    </div>
  )
}

export default connect(
  (state, ownProps) => {
    const {timestamp} = ownProps

    return {
      isUpdating: state.history.isUpdating,
      isSelected: state.ui.selectedDate === null || state.ui.selectedDate === timestamp
    }
  },
  (dispatch, ownProps) => {
    const {timestamp} = ownProps

    return {
      toggleSelectDate: () => {
        dispatch(toggleSelectDate(timestamp))
      }
    }
  }
)(Timestamp)
