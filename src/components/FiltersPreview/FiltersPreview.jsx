import React from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import {Flex, FlexItem} from '../../Layouts/Flex'
import {
  resetSelectedCollection,
  uncheckAllQueries,
  toggleSelectDay,
  setHeight,
  setWidth,
  uncheckAllColors
} from '../../store/filterActions'
import FilterPreview from '../FilterPreview'
import ColorSquare from '../ColorSquare'
import {COLORS} from '../../constants'

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
  selectedDay,
  checkedQueries,
  resetSelectedCollection,
  uncheckAllQueries,
  toggleSelectDay,
  heightRange,
  widthRange,
  hasHeightRange,
  hasWidthRange,
  setHeightRange,
  setWidthRange,
  checkedColors,
  uncheckAllColors
}) => {
  let filterElements = []
  if (selectedCollection) {
    filterElements.push(
      <FilterPreview
        name={truncate(selectedCollection.name, 15)}
        removeCallback={resetSelectedCollection} />
    )
  }
  if (selectedDay) {
    filterElements.push(
      <FilterPreview
        name={selectedDay}
        removeCallback={() => toggleSelectDay(selectedDay)} />
    )
  }
  if (checkedQueries.length > 0) {
    filterElements.push(
      <FilterPreview
        name={checkedQueries.length === 1 ? '1 query' : `${checkedQueries.length} queries`}
        removeCallback={uncheckAllQueries} />
    )
  }
  if (checkedColors.length > 0) {
    filterElements.push(
      <FilterPreview
        type="Colors:"
        name={
          <Flex
            offset={0.25}>
            {checkedColors.map((c, index) =>
              <FlexItem
                spacing={0.25}
                key={index}>
                <ColorSquare
                  color={c} />
              </FlexItem>
            )}
          </Flex>
        }
        removeCallback={uncheckAllColors}
        />
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

const getSelectedCollection = createSelector(
  [
    (state) => state.selected.collectionId,
    (state) => state.history.collections
  ],
  (selectedId, collections) => {
    return collections.find(c => c._id === selectedId)
  }
)

const getMaxDimensions = createSelector(
  (state) => state.history.images,
  (images) => {
    let maxHeight = 0
    let maxWidth = 0

    for (let image of images) {
      if (image.height > maxHeight) {
        maxHeight = image.height
      }

      if (image.width > maxWidth) {
        maxWidth = image.width
      }
    }

    return {maxHeight, maxWidth}
  }
)

const getCheckedColors = createSelector(
  (state) => state.checked.colors,
  (colors) => COLORS.filter(c => colors[c.name] === true)
)

export default connect(
  state => {
    const {
      maxHeight,
      maxWidth
    } = getMaxDimensions(state)

    return {
      selectedDay: state.selected.day,
      selectedCollection: getSelectedCollection(state),
      checkedQueries: Object.keys(state.checked.queries),
      checkedColors: getCheckedColors(state),
      heightRange: state.image.heightRange.length === 0
        ? [0, maxHeight]
        : state.image.heightRange,
      widthRange: state.image.widthRange.length === 0
        ? [0, maxWidth]
        : state.image.widthRange,
      hasWidthRange: state.image.widthRange.length &&
        (state.image.widthRange[0] > 0 || state.image.widthRange[1] < maxWidth),
      hasHeightRange: state.image.heightRange.length &&
        (state.image.heightRange[0] > 0 || state.image.heightRange[1] < maxHeight)
    }
  },
  dispatch => ({
    resetSelectedCollection: () => {
      dispatch(resetSelectedCollection())
    },
    uncheckAllQueries: () => {
      dispatch(uncheckAllQueries())
    },
    uncheckAllColors: () => {
      dispatch(uncheckAllColors())
    },
    toggleSelectDay: (day) => {
      dispatch(toggleSelectDay(day))
    },
    setHeightRange: () => {
      dispatch(setHeight([]))
    },
    setWidthRange: () => {
      dispatch(setWidth([]))
    }
  })
)(FiltersPreview)
