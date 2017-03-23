import React from 'react'
import {connect} from 'react-redux'

import {toDay} from '../../constants'
import Timestamp from '../Timestamp'
import SearchQuery from '../SearchQuery'

const SearchHistory = ({
  queries,
  availableQueries
}) => {
  let elements = []
  let lastQueryTimestamp = null

  for (let query of queries) {
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
        available={availableQueries[query._id]}
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

export default connect(
  state => {
    let queries = []
    if (state.selected.date) {
      const selectedDate = state.history.dates.find(d => d._id === state.selected.date)

      if (selectedDate) {
        queries = selectedDate.queries
      }
    } else {
      queries = state.history.queries
    }

    let collectionQueries = null
    if (state.selected.collectionId) {
      const selectedCollection = state.history.collections.find(c => c._id === state.selected.collectionId)

      if (selectedCollection) {
        collectionQueries = {}
        for (let img of selectedCollection.images) {
          collectionQueries[img.queryId] = true
        }
      }
    }

    let availableQueries = {}
    for (let query of queries) {
      if (!collectionQueries || collectionQueries[query._id]) {
        availableQueries[query._id] = true
      }
    }

    return {
      queries,
      availableQueries
    }
  }
)(SearchHistory)
