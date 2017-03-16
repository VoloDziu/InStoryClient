import React from 'react'
import {connect} from 'react-redux'

import Collection from '../Collection'
import Filter from '../Filter'
import FilterHeader from '../FilterHeader'
import {Flex, FlexItem} from '../../Layouts/Flex'
import Button from '../../UI/Button'

import {resetCheckedCollections} from '../../store/uiActions'
import {deleteCollections, createCollection} from '../../store/historyActions'

import './CollectionFilter.css'

const CollectionFilter = ({
  collections,
  checkedCollections,
  isUpdating,
  userId,
  resetCheckedCollections,
  deleteCollections,
  createCollection
}) => {
  const body = (
    <div className="CollectionFilter">
      {collections.map((c, index) =>
        <Collection
          key={index}
          collection={c} />
      )}
    </div>
  )

  return (
    <Filter
      value="collections"
      header={
        <FilterHeader
          value="collections"
          title="Collections"
          selection={checkedCollections}
          selectionActions={
            <Flex>
              <FlexItem
                spacing={1}>
                <Button
                  color="red"
                  disabled={isUpdating}
                  onClick={() => {
                    deleteCollections(userId, checkedCollections)
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
      body={body} />
  )
}

export default connect(
  state => ({
    userId: state.user.id,
    isUpdating: state.history.isUpdating,
    checkedCollections: state.ui.checkedCollections,
    collections: state.history.history
      ? state.history.history.collections
      : []
  }),
  dispatch => ({
    resetCheckedCollections: () => {
      dispatch(resetCheckedCollections())
    },
    deleteCollections: (userId, collectionIds) => {
      dispatch(deleteCollections(userId, collectionIds))
    },
    createCollection: (userId) => {
      dispatch(createCollection(userId))
    }
  })
)(CollectionFilter)
