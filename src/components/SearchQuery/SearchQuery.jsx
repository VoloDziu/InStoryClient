
import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'

import {
  toggleCheckQuery,
  uncheckImages,
  uncheckOtherImages,
  resetSelectedImage
} from '../../store/filterActions'
import {
  Flex,
  FlexItem
} from '../../Layouts/Flex'
import Checkbox from '../Checkbox'

import './SearchQuery.css'

const SearchQuery = ({
  query,
  matchingImages,
  available,
  isSelected,
  checkedQueries,
  toggleCheckQuery
}) => {
  return (
    <div
      onClick={() => {
        if (!available) {
          return
        }
        toggleCheckQuery(query, isSelected, checkedQueries)
      }}
      className={classnames(
        'SearchQuery',
        {
          'SearchQuery--selected': isSelected,
          'SearchQuery--unavailable': !available
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
            {matchingImages.length} images
          </div>
        </FlexItem>
      </Flex>
    </div>
  )
}

export default connect(
  (state, ownProps) => {
    const {query} = ownProps

    let matchingImages = query.images
    if (state.selected.collectionId) {
      matchingImages = matchingImages.filter(i => i.collectionIds.indexOf(state.selected.collectionId) !== -1)
    }

    return {
      isSelected: state.checked.queries[query._id],
      checkedQueries: state.history.queries.filter(q => state.checked.queries[q._id]),
      matchingImages
    }
  },
  dispatch => ({
    toggleCheckQuery: (query, isSelected, checkedQueries) => {
      dispatch(resetSelectedImage())

      if (checkedQueries.length > 0) {
        if (isSelected) {
          dispatch(uncheckImages(query.images.map(i => i._id)))
        }
      } else {
        dispatch(uncheckOtherImages(query.images.map(i => i._id)))
      }

      dispatch(toggleCheckQuery(query._id))
    }
  })
)(SearchQuery)
