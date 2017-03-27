import React from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import classnames from 'classnames'

import {
  toggleCheckQuery,
  resetSelectedImage,
  uncheckAllImagesExcept,
  uncheckImages
} from '../../store/filterActions'
import {
  Flex,
  FlexItem
} from '../../Layouts/Flex'
import Checkbox from '../Checkbox'
import {
  intersect,
  getColorNames
} from '../../constants'

import './SearchQuery.css'

const SearchQuery = ({
  query,
  matchingImages,
  checkedQueries,
  isChecked,
  toggleCheckQuery
}) => {
  return (
    <div
      onClick={() => {
        toggleCheckQuery(query, isChecked, checkedQueries, matchingImages)
      }}
      className={classnames(
        'SearchQuery',
        {
          'SearchQuery--checked': isChecked,
          'SearchQuery--unavailable': matchingImages.length === 0
        }
      )}>
      <Flex>
        <FlexItem>
          <Checkbox
            checked={isChecked} />
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

const makeGetImages = () => {
  return createSelector(
    [
      (state, props) => state.history.images.filter(img => img.queryId === props.query._id),
      (state) => state.selected.collectionId,
      (state) => state.checked.colors,
      (state) => state.image.widthRange,
      (state) => state.image.heightRange
    ],
    (images, selectedCollectionId, checkedColors, widthRange, heightRange) => {
      let matchingImages = []

      for (let image of images) {
        if (
          (!selectedCollectionId || image.collectionIds.indexOf(selectedCollectionId) !== -1) &&
          (Object.keys(checkedColors).length === 0 || intersect(getColorNames(image.colors), Object.keys(checkedColors))) &&
          (widthRange.length === 0 || (image.width >= widthRange[0] && image.width <= widthRange[1])) &&
          (heightRange.length === 0 || (image.height >= heightRange[0] && image.height <= heightRange[1]))
        ) {
          matchingImages.push(image)
        }
      }

      return matchingImages
    }
  )
}

export default connect(
  (state, ownProps) => {
    const {query} = ownProps
    const getImages = makeGetImages()

    return {
      isChecked: state.checked.queries[query._id],
      checkedQueries: Object.keys(state.checked.queries),
      matchingImages: getImages(state, ownProps)
    }
  },
  dispatch => ({
    toggleCheckQuery: (query, isChecked, checkedQueries, queryImages) => {
      dispatch(resetSelectedImage())

      if (isChecked) {
        if (checkedQueries.length > 1) {
          dispatch(uncheckImages(queryImages.map(i => i._id)))
        }
      } else {
        if (checkedQueries.length === 0) {
          dispatch(uncheckAllImagesExcept(queryImages.map(i => i._id)))
        }
      }

      dispatch(toggleCheckQuery(query._id))
    }
  })
)(SearchQuery)
