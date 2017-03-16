import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'

import './Filter.css'

const Filter = ({
  header,
  body,
  isOpen
}) => {
  return (
    <div
      className={classnames(
        'Filter',
        {
          'Filter--open': isOpen
        }
      )}>
      <div className="Filter__header">
        {header}
      </div>

      {isOpen
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
    isOpen: state.ui.selectedFilter === ownProps.value
  })
)(Filter)
