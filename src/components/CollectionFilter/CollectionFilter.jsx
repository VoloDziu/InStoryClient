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

import './CollectionFilter.css'

const CollectionFilter = ({
  collections,
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
                collection={c} />
            )}
          </FilterBodySection>
        </FilterBody>
      } />
  )
}

export default connect(
  state => {
    return {
      userId: state.user.id,
      isUpdating: state.history.isUpdating,
      selectedCollectionId: state.selected.collectionId,
      collections: state.history.collections
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
