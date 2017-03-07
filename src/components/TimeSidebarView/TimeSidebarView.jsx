import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import Collapse from 'react-collapse'

import {SidebarBody, SidebarBodyItem} from '../SidebarBody'

import Timestamp from '../Timestamp'
import SidebarQuery from '../SidebarQuery'
import constants from '../../constants'

const TimeSidebarView = ({
  queries,
  selectedDate
}) => {
  let queriesByDay = {}

  for (let query of queries) {
    const queryTimestamp = moment(query.timestamp).format(constants.TIME_FORMAT)

    if (queriesByDay[queryTimestamp]) {
      queriesByDay[queryTimestamp].push(query)
    } else {
      queriesByDay[queryTimestamp] = [query]
    }
  }

  const days = Object.keys(queriesByDay)
    .sort((a, b) => {
      if (moment(a, constants.TIME_FORMAT) > moment(b, constants.TIME_FORMAT)) {
        return -1
      } else {
        return 1
      }
    })

  return (
    <SidebarBody>
      {days.map((day, i) =>
        <SidebarBodyItem key={i}>
          <Timestamp
            timestamp={day} />

          <Collapse
            isOpened={!selectedDate || selectedDate === day}>
            {queriesByDay[day].map((q, i) =>
              <SidebarQuery
                key={i}
                query={q} />
            )}
          </Collapse>
        </SidebarBodyItem>
      )}
    </SidebarBody>
  )
}

export default connect(
  state => {
    return {
      selectedDate: state.ui.selectedDate,
      queries: state.history.history
        ? state.history.history.queries
        : []
    }
  }
)(TimeSidebarView)
