import React from 'react'
import {connect} from 'react-redux'

import Collection from '../Collection'
import Filter from '../Filter'
import FilterHeader from '../FilterHeader'
import {FilterBody, FilterBodySection} from '../FilterBody'
import {Flex, FlexItem} from '../../Layouts/Flex'
import Button from '../../UI/Button'

import {
  toggleSelectCollection,
  resetSelectedCollection
} from '../../store/filterActions'
import {
  deleteCollections,
  createCollection
} from '../../store/historyActions'
import {
  toDay
} from '../../constants'

import './CollectionFilter.css'

const CollectionFilter = ({
  collections,
  availableCollections,
  selectedCollectionId,
  isUpdating,
  userId,
  toggleSelectCollection,
  deleteCollection,
  createCollection
}) => {
  return (
    <Filter
      value="collections"
      header={
        <FilterHeader
          value="collections"
          title="Collections"
          selection={selectedCollectionId ? 1 : 0}
          selectionActions={
            <Flex>
              <FlexItem
                spacing={1}>
                <Button
                  color="red"
                  disabled={isUpdating}
                  onClick={() => {
                    deleteCollection(userId, selectedCollectionId)
                  }}
                  link>
                  delete
                </Button>
              </FlexItem>
            </Flex>
          }
          commonActions={
            <Button
              color="white"
              disabled={isUpdating}
              onClick={() => {
                createCollection(userId)
              }}
              link>
              + new collection
            </Button>
          } />
      }
      body={
        <FilterBody>
          <FilterBodySection
            main>
            {collections.map((c, index) =>
              <Collection
                key={index}
                collection={c}
                available={availableCollections[c._id]} />
            )}
          </FilterBodySection>
        </FilterBody>
      } />
  )
}

export default connect(
  state => {
    let dateCollections = null
    if (state.selected.date) {
      dateCollections = {}

      for (let collection of state.history.collections) {
        for (let image of collection.images) {
          if (toDay(image.timestamp) === state.selected.date) {
            dateCollections[collection._id] = true
          }
        }
      }
    }

    let queryCollecitons = null
    if (Object.keys(state.checked.queries).length > 0) {
      const queries = state.history.queries.filter(q => state.checked.queries[q._id])

      if (queries.length > 0) {
        queryCollecitons = {}

        const combinedImages = queries.reduce((combinedImages, query) => {
          return [...combinedImages, ...query.images]
        }, [])

        for (let image of combinedImages) {
          for (let collectionId of image.collectionIds) {
            queryCollecitons[collectionId] = true
          }
        }
      }
    }

    let availableCollections = {}
    for (let collection of state.history.collections) {
      if (
        (!dateCollections || dateCollections[collection._id]) &&
        (!queryCollecitons || queryCollecitons[collection._id])
      ) {
        availableCollections[collection._id] = true
      }
    }

    return {
      userId: state.user.id,
      isUpdating: state.history.isUpdating,
      selectedCollectionId: state.selected.collectionId,
      collections: state.history.collections,
      availableCollections
    }
  },
  dispatch => ({
    deleteCollection: (userId, collectionId) => {
      dispatch(deleteCollections(userId, [collectionId], () => {
        dispatch(resetSelectedCollection())
      }))
    },
    createCollection: (userId) => {
      dispatch(createCollection(userId))
    },
    toggleSelectCollection: (collectionId) => {
      dispatch(toggleSelectCollection(collectionId))
    }
  })
)(CollectionFilter)
