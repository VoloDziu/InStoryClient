import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {createSelector} from 'reselect'

import {
  Flex,
  FlexItem
} from '../../Layouts/Flex'
import {
  toggleCheckColor,
  uncheckImages,
  uncheckAllImagesExcept,
  resetSelectedImage
} from '../../store/filterActions'
import Checkbox from '../Checkbox'
import {
  getColorNames,
  toDay
} from '../../constants'

import './Color.css'

const Color = ({
  color,
  images,
  isChecked,
  checkedColors,
  toggleCheckColor
}) => {
  return (
    <div
      onClick={() => toggleCheckColor(isChecked, checkedColors, images)}
      className={classnames(
        'Color',
        {
          'Color--checked': isChecked
        }
      )}>
      <Flex>
        <FlexItem>
          <Checkbox
            checked={isChecked} />
        </FlexItem>

        <FlexItem
          spacing={1}>
          <div
            style={{
              backgroundColor: color.hex
            }}
            className="Color__hue" />
        </FlexItem>

        <FlexItem
          spacing={0.75}
          main>
          <div
            className="Color__name">
            {color.name}
          </div>
        </FlexItem>

        <FlexItem
          spacing={1}>
          <div
            className="Color__info">
            {images.length} images
          </div>
        </FlexItem>
      </Flex>
    </div>
  )
}

const makeGetImages = () => {
  return createSelector(
    [
      (state, props) => state.history.images.filter(img => {
        return getColorNames(img.colors).indexOf(props.color.name) !== -1
      }),
      (state) => state.selected.day,
      (state) => state.selected.collection,
      (state) => state.checked.queries,
      (state) => state.image.widthRange,
      (state) => state.image.heightRange
    ],
    (images, selectedDay, selectedCollectionId, checkedQueries, widthRange, heightRange) => {
      let matchingImages = []

      for (let image of images) {
        if (
          (!selectedDay || toDay(image.timestamp) === selectedDay) &&
          (!selectedCollectionId || image.collectionIds.indexOf(selectedCollectionId) !== -1) &&
          (Object.keys(checkedQueries).length === 0 || Object.keys(checkedQueries).indexOf(image.queryId) !== -1) &&
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
    const {color} = ownProps
    const getImages = makeGetImages()

    return {
      isChecked: state.checked.colors[color.name],
      checkedColors: state.checked.colors,
      images: getImages(state, ownProps)
    }
  },
  (dispatch, ownProps) => {
    const {color} = ownProps

    return {
      toggleCheckColor: (isChecked, checkedColors, colorImages) => {
        dispatch(resetSelectedImage())

        if (isChecked) {
          if (checkedColors.length > 1) {
            dispatch(uncheckImages(colorImages.map(i => i._id)))
          }
        } else {
          if (checkedColors.length === 0) {
            dispatch(uncheckAllImagesExcept(colorImages.map(i => i._id)))
          }
        }

        dispatch(toggleCheckColor(color.name))
      }
    }
  }
)(Color)
