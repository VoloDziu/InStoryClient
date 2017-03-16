import React from 'react'
import {connect} from 'react-redux'

import {Flex, FlexItem} from '../../Layouts/Flex'
import Button from '../../UI/Button'
import {
  resetCheckedImages,
  resetCheckedCollections,
  resetcheckedQueries,
  toggleSelectDate
} from '../../store/uiActions'
import {
  deleteImages,
  addImagesToCollection
} from '../../store/historyActions'
import FilterPreview from '../FilterPreview'

import './GalleryHeader.css'

const truncate = (str, length) => {
  if (str.length > length) {
    return str.slice(0, length - 3) + '...'
  } else {
    return str
  }
}

const GalleryHeader = ({
  userId,
  checkedImages,
  checkedCollections,
  selectedDate,
  checkedQueries,
  deleteImages,
  resetCheckedImages,
  resetCheckedCollections,
  resetcheckedQueries,
  toggleSelectDate,
  addImagesToCollection
}) => {
  let filterElements = []
  if (checkedCollections.length > 0) {
    filterElements.push(
      <FilterPreview
        name={truncate(checkedCollections[0].name, 20)}
        removeCallback={resetCheckedCollections} />
    )
  }
  if (selectedDate) {
    filterElements.push(
      <FilterPreview
        name={selectedDate}
        removeCallback={() => toggleSelectDate(selectedDate)} />
    )
  }
  if (checkedQueries.length > 0) {
    filterElements.push(
      <FilterPreview
        name={checkedQueries.length === 1 ? truncate(checkedQueries[0].q.replace(/\+/g, ' '), 20) : `${checkedQueries.length} queries`}
        removeCallback={resetcheckedQueries} />
    )
  }

  return (
    <div
      className="GalleryHeader">
      <Flex
        justifyContent="space-between">
        <FlexItem>
          <Flex>
            {filterElements.length > 0
              ? filterElements.map((filter, index) =>
                <FlexItem
                  spacing={index > 0 ? 1 : 0}
                  key={index}>
                  {filter}
                </FlexItem>
              )
              : <FlexItem>
                <div
                  className="GalleryHeader__status">
                  No filters
                </div>
              </FlexItem>
            }
          </Flex>
        </FlexItem>

        <FlexItem>
          <Flex>
            <FlexItem>
              <div
                className="GalleryHeader__status">
                {checkedImages.length} selected
              </div>
            </FlexItem>

            {checkedImages.length > 0
              ? <FlexItem
                spacing={1}>
                <Flex>
                  <FlexItem
                    spacing={1}>
                    <Button
                      onClick={resetCheckedImages}
                      link>
                      Clear
                    </Button>
                  </FlexItem>

                  {checkedCollections.length > 0
                    ? <FlexItem
                      spacing={1}>
                      <Button
                        onClick={() => addImagesToCollection(userId, checkedCollections[0]._id, checkedImages)}
                        link>
                        Remove from collection
                      </Button>
                    </FlexItem>
                    : ''
                  }

                  <FlexItem
                    spacing={1}>
                    <Button
                      onClick={() => deleteImages(userId, checkedImages)}
                      color="red"
                      link>
                      Delete
                    </Button>
                  </FlexItem>
                </Flex>
              </FlexItem>
              : ''
            }
          </Flex>
        </FlexItem>
      </Flex>
    </div>
  )
}

export default connect(
  state => ({
    userId: state.user.id,
    images: state.history.history
      ? state.history.history.images
      : [],
    checkedQueries: state.ui.checkedQueries.map(id =>
      state.history.history.queries.find(q => q._id === id)
    ),
    selectedDate: state.ui.selectedDate,
    checkedImages: state.ui.checkedImages,
    checkedCollections: state.ui.checkedCollections.map(id =>
      state.history.history.collections.find(c => c._id === id)
    ),
    heightRange: state.ui.heightRange.length
      ? state.ui.heightRange
      : [0, 10000],
    widthRange: state.ui.widthRange.length
      ? state.ui.widthRange
      : [0, 10000]
  }),
  dispatch => ({
    deleteImages: (userId, images) => {
      dispatch(deleteImages(userId, images))
    },
    resetCheckedImages: () => {
      dispatch(resetCheckedImages())
    },
    resetCheckedCollections: () => {
      dispatch(resetCheckedCollections())
    },
    resetcheckedQueries: () => {
      dispatch(resetcheckedQueries())
    },
    toggleSelectDate: (date) => {
      dispatch(toggleSelectDate(date))
    },
    addImagesToCollection: (userId, collectionId, imageIds) => {
      dispatch(addImagesToCollection(userId, collectionId, imageIds, true))
    }
  })
)(GalleryHeader)
