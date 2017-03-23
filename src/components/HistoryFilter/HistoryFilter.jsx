import React from 'react'
import {connect} from 'react-redux'

import Filter from '../Filter'
import FilterHeader from '../FilterHeader'
import {FilterBody, FilterBodySection} from '../FilterBody'
import SearchHistory from '../SearchHistory'
import Calendar from '../Calendar'
import QueryGroupActions from '../QueryGroupActions'

import './DatePicker.css'
import './HistoryFilter.css'

const HistoryFilter = ({
  checkedQueriesCount
}) => {
  return (
    <Filter
      value="history"
      header={
        <FilterHeader
          value="history"
          title="Search History"
          selection={checkedQueriesCount}
          selectionActions={
            <QueryGroupActions />
          } />
      }
      body={
        <FilterBody>
          <FilterBodySection>
            <Calendar />
          </FilterBodySection>

          <FilterBodySection
            main>
            <SearchHistory />
          </FilterBodySection>
        </FilterBody>
      } />
  )
}

export default connect(
  state => ({
    checkedQueriesCount: Object.keys(state.checked.queries).length
  })
)(HistoryFilter)
