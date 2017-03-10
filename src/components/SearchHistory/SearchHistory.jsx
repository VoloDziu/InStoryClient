import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import constants from '../../constants'
import Timestamp from '../Timestamp'
import SearchQuery from '../SearchQuery'

const SearchHistory = ({
  queries
}) => {
  let elements = []
  let lastQueryTimestamp = null

  for (let query of queries) {
    const queryTimestamp = moment(query.timestamp).format(constants.TIME_FORMAT)

    if (queryTimestamp !== lastQueryTimestamp) {
      lastQueryTimestamp = queryTimestamp
      elements.push(
        <Timestamp date={queryTimestamp} key={query.timestamp} />
      )
    }

    elements.push(
      <SearchQuery query={query} key={query._id} />
    )
  }

  return (
    <div>
      {elements}
    </div>
  )
}

export default connect(
  state => {
    let queries = state.history.history
      ? state.history.history.queries
      : []

    if (state.ui.selectedDate) {
      queries = queries.filter(q => moment(q.timestamp).format(constants.TIME_FORMAT) === state.ui.selectedDate)
    }

    return {
      queries
    }
  }
)(SearchHistory)
