import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'

import Box from '../../Layouts/Box'
import SidebarTimestamp from '../SidebarTimestamp'
import SidebarQuery from '../SidebarQuery'

const TIME_FORMAT = 'MMM Do YY'

const TimeSidebarView = ({
  queries
}) => {
  const queriesByDate = {}

  for (let query of queries) {
    const timestampDay = moment(query.timestamp).format(TIME_FORMAT)
    if (queriesByDate[timestampDay]) {
      queriesByDate[timestampDay].push(query)
    } else {
      queriesByDate[timestampDay] = [query]
    }
  }

  const orderedDays = Object.keys(queriesByDate).sort((a, b) => {
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
          <Box t={1.5} b={1.5} l={1.5} r={1.5}>
            <SidebarTimestamp
              queries={queriesByDate[d]}
              timestamp={d} />
          </Box>

          {queriesByDate[d]
            .sort((qA, qB) => {
              if (qA.timestamp > qB.timestamp) {
                return -1
              } else {
                return 1
              }
            })
            .map((q, j) =>
              <SidebarQuery query={q} key={j} />
            )
          }
        </div>
      )}
    </div>
  )
}

export default connect(
  state => {
    return {
      queries: state.history.history
        ? state.history.history.queries
        : []
    }
  }
)(TimeSidebarView)
