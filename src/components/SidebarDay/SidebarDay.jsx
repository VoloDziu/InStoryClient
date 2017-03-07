import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import Collapse from 'react-collapse'

import constants from '../../constants'
import Timestamp from '../Timestamp'
import SidebarQuery from '../SidebarQuery'

const SidebarDay = ({
  day,
  timestamp,
  queries,
  isOpen
}) => {
  return (
    <div>
      <Timestamp
        timestamp={day} />

      <Collapse
        isOpened={isOpen}>
        {queries.map((q, i) =>
          <SidebarQuery
            key={i}
            query={q} />
        )}
      </Collapse>
    </div>
  )
}

export default connect(
  (state, ownProps) => {
    const {day} = ownProps

    return {
      isOpen: state.ui.selectedDate === null || state.ui.selectedDate === day,
      queries: state.history.history
        ? state.history.history.queries
          .filter(q => moment(q.timestamp).format(constants.TIME_FORMAT) === day)
          .sort((a, b) => a.timestamp - b.timestamp)
        : []
    }
  }
)(SidebarDay)
