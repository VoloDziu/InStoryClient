import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'

import FilterHeader from '../FilterHeader'

import './Filter.css'

const Filter = ({
  value,
  title,
  body,
  isOpened,
  filters,
  showFilters
}) => {
  return (
    <div
      className={classnames(
        'Filter',
        {
          'Filter--opened': isOpened
        }
      )}>
      <div className="Filter__header">
        <FilterHeader
          value={value}
          title={title}
          filters={filters}
          showFilters={showFilters} />
      </div>

      {isOpened
        ? <div className="Filter__body">
          {body}
        </div>
        : ''
      }
    </div>
  )
}

export default connect(
  (state, ownProps) => ({
    isOpened: state.ui.selectedFilter === ownProps.value
  })
)(Filter)
