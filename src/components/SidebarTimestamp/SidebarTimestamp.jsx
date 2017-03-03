import React from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux'
import moment from 'moment'

import {toggleSelectQueries} from '../../store/uiActions'

import './SidebarTimestamp.css'

const SidebarTimestamp = ({
  timestamp,
  isSelected,
  isUpdating,
  toggleSelectQueries
}) => {
  let time = timestamp
  if (timestamp === moment().format('MMM Do YY')) {
    time = 'Today'
  } else if (timestamp === moment().subtract(1, 'days').format('MMM Do YY')) {
    time = 'Yesterday'
  }

  const classes = classnames('sidebar-timestamp', {
    'sidebar-timestamp--selected': isSelected
  })

  return (
    <div className={classes}>
      <div
        className="sidebar-timestamp__date"
        onClick={() => {
          if (isUpdating) {
            return
          } else {
            toggleSelectQueries()
          }
        }}>{time}</div>
    </div>
  )
}

export default connect(
  (state, ownProps) => {
    const {timestamp} = ownProps

    const selectedQueriesDates = state.ui.selectedQueries.map(q => moment(q.timestamp).format('MMM Do YY'))

    return {
      isSelected: state.ui.selectedQueries.length === 0 || selectedQueriesDates.indexOf(timestamp) !== -1,
      isUpdating: state.ui.isUpdating
    }
  },
  (dispatch, ownProps) => {
    const {queries} = ownProps

    return {
      toggleSelectQueries: () => {
        dispatch(toggleSelectQueries(queries))
      }
    }
  }
)(SidebarTimestamp)
