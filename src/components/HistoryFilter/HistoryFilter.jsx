import React from 'react'
import {connect} from 'react-redux'
import DayPicker from 'react-day-picker'
import moment from 'moment'

import constants from '../../constants'
import {deleteQueries} from '../../store/historyActions'
import {toggleSelectDate, resetcheckedQueries} from '../../store/uiActions'
import SearchHistory from '../SearchHistory'
import {Flex, FlexItem} from '../../Layouts/Flex'
import Button from '../../UI/Button'
import Filter from '../Filter'
import FilterHeader from '../FilterHeader'

import './DatePicker.css'
import './HistoryFilter.css'

const HistoryFilter = ({
  selectedDate,
  checkedQueries,
  highlightedDates,
  toggleSelectDate,
  isUpdating,
  deleteQueries,
  userId,
  resetcheckedQueries
}) => {
  const body = (
    <div className="HistoryFilter">
      <div className="HistoryFilter__calendar">
        <DayPicker
          enableOutsideDays
          modifiers={{
            selected: selectedDate,
            highlighted: highlightedDates
          }}
          onDayClick={toggleSelectDate} />
      </div>

      <div className="HistoryFilter__history">
        <SearchHistory />
      </div>
    </div>
  )

  return (
    <Filter
      value="history"
      header={
        <FilterHeader
          value="history"
          title="Search History"
          selection={checkedQueries}
          selectionActions={
            <Flex>
              <FlexItem>
                <Button
                  color="white"
                  disabled={isUpdating}
                  onClick={resetcheckedQueries}
                  link>
                  clear
                </Button>
              </FlexItem>

              <FlexItem
                spacing={1}>
                <Button
                  color="red"
                  disabled={isUpdating}
                  onClick={() => {
                    deleteQueries(userId, checkedQueries)
                  }}
                  link>
                  delete
                </Button>
              </FlexItem>
            </Flex>
          } />
      }
      body={body} />
  )
}

export default connect(
  state => {
    let dates = []

    if (state.history.history) {
      const queryDates = {}

      for (let q of state.history.history.queries) {
        const qTimestamp = moment(q.timestamp).format(constants.TIME_FORMAT)

        queryDates[qTimestamp] = true
      }

      dates = Object.keys(queryDates)
    }

    return {
      isUpdating: state.history.isUpdating,
      userId: state.user.id,
      checkedQueries: state.ui.checkedQueries,
      selectedDate: state.ui.selectedDate
        ? moment(state.ui.selectedDate, constants.TIME_FORMAT).toDate()
        : null,
      highlightedDates: dates.map(d => moment(d, constants.TIME_FORMAT).toDate())
    }
  },
  dispatch => ({
    toggleSelectDate: (date) => {
      dispatch(toggleSelectDate(moment(date).format(constants.TIME_FORMAT)))
    },
    deleteQueries: (userId, queryIds) => {
      dispatch(deleteQueries(userId, queryIds))
    },
    resetcheckedQueries: () => {
      dispatch(resetcheckedQueries())
    }
  })
)(HistoryFilter)
