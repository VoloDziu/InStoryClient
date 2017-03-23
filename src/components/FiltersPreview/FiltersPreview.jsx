import React from 'react'
import {connect} from 'react-redux'

import {Flex, FlexItem} from '../../Layouts/Flex'
import {
  resetSelectedCollection,
  uncheckAllQueries,
  toggleSelectDate,
  setHeight,
  setWidth
} from '../../store/filterActions'
import FilterPreview from '../FilterPreview'

import './FiltersPreview.css'

const truncate = (str, length) => {
  if (str.length > length) {
    return str.slice(0, length - 3) + '...'
  } else {
    return str
  }
}

const FiltersPreview = ({
  selectedCollection,
  selectedDate,
  checkedQueries,
  resetSelectedCollection,
  uncheckAllQueries,
  toggleSelectDate,
  heightRange,
  widthRange,
  hasHeightRange,
  hasWidthRange,
  setHeightRange,
  setWidthRange
}) => {
  let filterElements = []
  if (selectedCollection) {
    filterElements.push(
      <FilterPreview
        type="C:"
        name={truncate(selectedCollection.name, 15)}
        removeCallback={resetSelectedCollection} />
    )
  }
  if (selectedDate) {
    filterElements.push(
      <FilterPreview
        type="D:"
        name={selectedDate}
        removeCallback={() => toggleSelectDate(selectedDate)} />
    )
  }
  if (checkedQueries.length > 0) {
    filterElements.push(
      <FilterPreview
        type="Q:"
        name={checkedQueries.length === 1 ? '1 query' : `${checkedQueries.length} queries`}
        removeCallback={uncheckAllQueries} />
    )
  }
  if (hasHeightRange) {
    filterElements.push(
      <FilterPreview
        type="H:"
        name={`${heightRange[0]}-${heightRange[1]}px`}
        removeCallback={setHeightRange} />
    )
  }
  if (hasWidthRange) {
    filterElements.push(
      <FilterPreview
        type="W:"
        name={`${widthRange[0]}-${widthRange[1]}px`}
        removeCallback={setWidthRange} />
    )
  }

  return (
    <div className="FiltersPreview">
      <Flex
        offset={1}
        flexWrap="wrap">
        <FlexItem
          spacing={1}>
          <div
            className="FiltersPreview__title">
            Filters:
          </div>
        </FlexItem>

        {filterElements.length > 0
          ? filterElements.map((filter, index) =>
            <FlexItem
              spacing={1}
              key={index}>
              {filter}
            </FlexItem>
          )
          : <FlexItem
            spacing={1}>
            <div
              className="FiltersPreview__empty">
              No filters
            </div>
          </FlexItem>
        }
      </Flex>
    </div>
  )
}

export default connect(
  state => ({
    selectedDate: state.selected.date,
    selectedCollection: state.history.collections.find(c => c._id === state.selected.collectionId),
    checkedQueries: state.history.queries.filter(q => state.checked.queries[q._id]),
    heightRange: state.image.heightRange.length
      ? state.image.heightRange
      : [0, state.history.maxHeight],
    widthRange: state.image.widthRange.length
      ? state.image.widthRange
      : [0, state.history.maxWidth],
    hasWidthRange: state.image.widthRange.length &&
      (state.image.widthRange[0] > 0 || state.image.widthRange[1] < state.history.maxWidth),
    hasHeightRange: state.image.heightRange.length &&
      (state.image.heightRange[0] > 0 || state.image.heightRange[1] < state.history.maxHeight)
  }),
  dispatch => ({
    resetSelectedCollection: () => {
      dispatch(resetSelectedCollection())
    },
    uncheckAllQueries: () => {
      dispatch(uncheckAllQueries())
    },
    toggleSelectDate: (date) => {
      dispatch(toggleSelectDate(date))
    },
    setHeightRange: () => {
      dispatch(setHeight([]))
    },
    setWidthRange: () => {
      dispatch(setWidth([]))
    }
  })
)(FiltersPreview)
