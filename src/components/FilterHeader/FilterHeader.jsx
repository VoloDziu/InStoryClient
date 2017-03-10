import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'

import {setFilter} from '../../store/uiActions'

import './FilterHeader.css'

const FilterHeader = ({
  title,
  filters,
  setFilter,
  showFilters
}) => {
  return (
    <div
      className="FilterHeader">
      <div
        onClick={setFilter}
        className="FilterHeader__title">
        {title}
      </div>

      <div className="FilterHeader__filters">
        {filters}
      </div>
    </div>
  )
}

export default connect(
  null,
  (dispatch, ownProps) => ({
    setFilter: () => {
      dispatch(setFilter(ownProps.value))
    }
  })
)(FilterHeader)
