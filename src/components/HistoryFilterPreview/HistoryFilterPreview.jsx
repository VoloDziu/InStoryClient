import React from 'react'
import {connect} from 'react-redux'

import {toggleSelectDate, resetSelectedQueries} from '../../store/uiActions'
import {ListInline, ListInlineItem} from '../../Layouts/ListInline'
import FilterPreview from '../FilterPreview'

const HistoryFilterPreview = ({
  selectedDate,
  toggleSelectDate,
  selectedQueries,
  resetSelectedQueries
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

      {selectedQueries.length
        ? <ListInlineItem>
          <FilterPreview
            name={`${selectedQueries.length} queries`}
            removeCallback={() => resetSelectedQueries()} />
        </ListInlineItem>
        : ''
      }
    </ListInline>
  )
}

export default connect(
  state => ({
    selectedDate: state.ui.selectedDate,
    selectedQueries: state.ui.selectedQueries
  }),
  dispatch => ({
    toggleSelectDate: (date) => {
      dispatch(toggleSelectDate(date))
    },
    resetSelectedQueries: () => {
      dispatch(resetSelectedQueries())
    }
  })
)(HistoryFilterPreview)
