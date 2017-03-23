import React from 'react'
import {connect} from 'react-redux'

import {Flex, FlexItem} from '../../Layouts/Flex'
import Button from '../../UI/Button'
import {
  uncheckAllImages,
  resetSelectedImage
} from '../../store/filterActions'
import {
  deleteImages,
  addImagesToCollection
} from '../../store/historyActions'

import './ImageGroupActions.css'

const ImageGroupActions = ({
  userId,
  selectedCollection,
  checkedImages,
  deleteImages,
  uncheckAllImages,
  addImagesToCollection
}) => {
  return (
    <div className="ImageGroupActions">
      <Flex
        justifyContent="space-between">
        <FlexItem>
          <Flex>
            <FlexItem>
              <div
                className="ImageGroupActions__title">
                Selected:
              </div>
            </FlexItem>

            <FlexItem
              spacing={0.5}>
              <div
                className="ImageGroupActions__count">
                {checkedImages.length > 1 ? `${checkedImages.length} images` : '1 image'}
              </div>
            </FlexItem>
          </Flex>
        </FlexItem>

        <FlexItem
          spacing={1}>
          <Flex>
            <FlexItem
              spacing={1}>
              <Button
                onClick={uncheckAllImages}
                link>
                Clear
              </Button>
            </FlexItem>

            {selectedCollection
              ? <FlexItem
                spacing={1}>
                <Button
                  onClick={() => addImagesToCollection(userId, selectedCollection._id, checkedImages)}
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
      </Flex>
    </div>
  )
}

export default connect(
  state => ({
    userId: state.user.id,
    selectedCollection: state.history.collections.find(c => c._id === state.selected.collectionId),
    checkedImages: Object.keys(state.checked.images)
  }),
  dispatch => ({
    deleteImages: (userId, images) => {
      dispatch(deleteImages(userId, images, () => {
        dispatch(uncheckAllImages())
      }))
    },
    uncheckAllImages: () => {
      dispatch(uncheckAllImages())
    },
    addImagesToCollection: (userId, collectionId, imageIds) => {
      dispatch(addImagesToCollection(userId, collectionId, imageIds, true, () => {
        dispatch(uncheckAllImages())
        dispatch(resetSelectedImage())
      }))
    }
  })
)(ImageGroupActions)
