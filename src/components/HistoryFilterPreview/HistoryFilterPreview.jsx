import React from 'react'
import {connect} from 'react-redux'

import {toggleSelectDate, resetcheckedQueries} from '../../store/uiActions'
import {ListInline, ListInlineItem} from '../../Layouts/ListInline'
import FilterPreview from '../FilterPreview'

const HistoryFilterPreview = ({
  selectedDate,
  toggleSelectDate,
  checkedQueries,
  resetcheckedQueries
}) => {
  return (
    <ListInline>
      {selectedDate
        ? <ListInlineItem>
          <FilterPreview
            name={selectedDate}
            removeCallback={() => toggleSelectDate(selectedDate)} />
        </ListInlineItem>
        : ''
      }

      {checkedQueries.length
        ? <ListInlineItem>
          <FilterPreview
            name={`${checkedQueries.length} queries`}
            removeCallback={() => resetcheckedQueries()} />
        </ListInlineItem>
        : ''
      }
    </ListInline>
  )
}

export default connect(
  state => ({
    selectedDate: state.ui.selectedDate,
    checkedQueries: state.ui.checkedQueries
  }),
  dispatch => ({
    toggleSelectDate: (date) => {
      dispatch(toggleSelectDate(date))
    },
    resetcheckedQueries: () => {
      dispatch(resetcheckedQueries())
    }
  })
)(HistoryFilterPreview)
