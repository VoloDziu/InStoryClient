import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import classnames from 'classnames'

import {toggleSelectQuery} from '../../store/uiActions'
import {Flex, FlexItem} from '../../Layouts/Flex'
import Checkbox from '../Checkbox'

import './SearchQuery.css'

const SearchQuery = ({
  query,
  isSelected,
  toggleSelectQuery
}) => {
  return (
    <div
      onClick={toggleSelectQuery}
      className={classnames(
        'SearchQuery',
        {
          'SearchQuery--selected': isSelected
        }
      )}>
      <Flex>
        <FlexItem>
          <Checkbox
            checked={isSelected} />
        </FlexItem>

        <FlexItem
          spacing={1}
          main>
          <div
            className="SearchQuery__title">
            {query.q ? query.q.replace(/\+/g, ' ') : ''}
          </div>
        </FlexItem>

        <FlexItem
          spacing={1}>
          <div
            className="SearchQuery__info">
            {query.imagesCount} images
          </div>
        </FlexItem>
      </Flex>
    </div>
  )
}

export default connect(
  (state, ownProps) => {
    const {query} = ownProps

    return {
      isSelected: state.ui.checkedQueries.indexOf(query._id) !== -1
    }
  },
  (dispatch, ownProps) => {
    const {query} = ownProps

    return {
      toggleSelectQuery: () => {
        dispatch(toggleSelectQuery(query))
      }
    }
  }
)(SearchQuery)
