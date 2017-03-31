import React from 'react'
import {connect} from 'react-redux'

import {toggleSelectDate, resetcheckedQueries} from '../../store/uiActions'
import {ListInline, ListInlineItem} from '../../Layouts/ListInline'
import FilterPreview from '../FilterPreview'
import {
  logSelectedDay,
  logCheckedQueries
} from '../../logger'

const HistoryFilterPreview = ({
  selectedDate,
  toggleSelectDate,
  checkedQueries,
  resetcheckedQueries,
  userId
}) => {
  return (
    <ListInline>
      {selectedDate
        ? <ListInlineItem>
          <FilterPreview
            name={selectedDate}
            removeCallback={() => toggleSelectDate(userId, selectedDate)} />
        </ListInlineItem>
        : ''
      }

      {checkedQueries.length
        ? <ListInlineItem>
          <FilterPreview
            name={`${checkedQueries.length} queries`}
            removeCallback={() => resetcheckedQueries(userId)} />
        </ListInlineItem>
        : ''
      }
    </ListInline>
  )
}

export default connect(
  state => ({
    selectedDate: state.ui.selectedDate,
    checkedQueries: state.ui.checkedQueries,
    userId: state.user.id
  }),
  dispatch => ({
    toggleSelectDate: (userId, date) => {
      logSelectedDay(userId, null)
      dispatch(toggleSelectDate(date))
    },
    resetcheckedQueries: (userId) => {
      logCheckedQueries(userId, [])
      dispatch(resetcheckedQueries())
    }
  })
)(HistoryFilterPreview)
