import React from 'react'
import {connect} from 'react-redux'
import DayPicker from 'react-day-picker'
import moment from 'moment'

import constants from '../../constants'
import {deleteQueries} from '../../store/historyActions'
import {toggleSelectDate, resetSelectedQueries} from '../../store/uiActions'
import SearchHistory from '../SearchHistory'
import {Flex, FlexItem} from '../../Layouts/Flex'
import Button from '../../UI/Button'

import './DatePicker.css'
import './HistoryFilter.css'

const HistoryFilter = ({
  selectedDate,
  selectedQueries,
  highlightedDates,
  toggleSelectDate,
  isUpdating,
  deleteQueries,
  userId,
  resetSelectedQueries
}) => {
  return (
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

      {selectedQueries.length
        ? <div className="HistoryFilter__actions">
          <Flex>
            <FlexItem
              main>
              {selectedQueries.length} selected
            </FlexItem>

            <FlexItem
              spacing={1}>
              <Flex>
                <FlexItem>
                  <Button
                    disabled={isUpdating}
                    onClick={resetSelectedQueries}
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
                      deleteQueries(userId, selectedQueries)
                    }}
                    link>
                    delete
                  </Button>
                </FlexItem>
              </Flex>
            </FlexItem>
          </Flex>
        </div>
        : ''
      }
    </div>
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
      userId: state.user.id,
      selectedQueries: state.ui.selectedQueries,
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
    resetSelectedQueries: () => {
      dispatch(resetSelectedQueries())
    }
  })
)(HistoryFilter)
