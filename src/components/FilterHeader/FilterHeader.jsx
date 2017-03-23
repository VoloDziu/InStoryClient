import React from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux'

import {Flex, FlexItem} from '../../Layouts/Flex'
import {setFilter} from '../../store/uiActions'

import './FilterHeader.css'

const FilterHeader = ({
  isOpen = false,
  title = '',
  selection = 0,
  selectionActions = '',
  commonActions = '',
  setFilter
}) => {
  if (isOpen) {
    return (
      <div
        className="FilterHeader">
        <Flex
          alignItems={selection > 0
            ? 'center'
            : 'flex-start'
          }>
          <FlexItem
            main>
            <div
              className={classnames(
                'FilterHeader__title',
                {
                  'FilterHeader__title--small': selection > 0
                }
              )}>
              {title}
            </div>

            <div
              className="FilterHeader__selection">
              {selection} selected
            </div>
          </FlexItem>

          <FlexItem
            alignSelf="center">
            {selection > 0
              ? selectionActions
              : commonActions
            }
          </FlexItem>
        </Flex>
      </div>
    )
  } else {
    return (
      <div
        onClick={setFilter}
        className="FilterHeader FilterHeader--collapsed">
        <div
          className="FilterHeader__title">
          {title}
        </div>
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    isOpen: state.ui.selectedFilter === ownProps.value
  }),
  (dispatch, ownProps) => ({
    setFilter: () => {
      dispatch(setFilter(ownProps.value))
    }
  })
)(FilterHeader)
