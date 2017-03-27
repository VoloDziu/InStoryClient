import React from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import {toDay} from '../../constants'
import Timestamp from '../Timestamp'
import SearchQuery from '../SearchQuery'

import './SearchHistory.css'

const SearchHistory = ({
  vislbleQueries
}) => {
  let elements = []
  let lastQueryTimestamp = null

  for (let query of vislbleQueries) {
    const queryTimestamp = toDay(query.timestamp)

    if (queryTimestamp !== lastQueryTimestamp) {
      lastQueryTimestamp = queryTimestamp
      elements.push(
        <Timestamp
          date={queryTimestamp}
          key={query.timestamp} />
      )
    }

    elements.push(
      <SearchQuery
        query={query}
        key={query._id} />
    )
  }

  return (
    <div
      className="SearchHistory">
      {elements}
    </div>
  )
}

const getVisibleQueries = createSelector(
  [
    (state) => state.selected.day,
    (state) => state.history.queries
  ],
  (day, queries) => {
    if (day) {
      return queries.filter(q => toDay(q.timestamp) === day)
    } else {
      return queries
    }
  }
)

export default connect(
  state => ({
    vislbleQueries: getVisibleQueries(state)
  })
)(SearchHistory)
