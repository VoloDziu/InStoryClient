import React from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import {
  setWidth,
  setHeight,
  resetSelectedImage,
  uncheckAllImages
} from '../../store/filterActions'
import {Flex, FlexItem} from '../../Layouts/Flex'
import Box from '../../Layouts/Box'
import {CHANGE_TIMEOUT_DELAY} from '../../constants'
import Slider from '../Slider'
import Timestamp from '../Timestamp'

import './ResolutionPicker.css'

class ResolutionPicker extends React.Component {
  constructor (props) {
    super(props)

    this.setWidth = this.setWidth.bind(this)
    this.setHeight = this.setHeight.bind(this)

    this.state = {
      widthRange: this.props.widthRange,
      heightRange: this.props.heightRange,
      widthChangeTimeout: null,
      heightChangeTimeout: null
    }
  }

  componentWillReceiveProps (newProps) {
    const {
      heightRange: newHeightRange,
      widthRange: newWidthRange
    } = newProps

    const {
      heightRange,
      widthRange
    } = this.props

    if (heightRange[0] !== newHeightRange[0] || heightRange[1] !== newHeightRange[1]) {
      this.setState({
        heightRange: newHeightRange
      })
    }

    if (widthRange[0] !== newWidthRange[0] || widthRange[1] !== newWidthRange[1]) {
      this.setState({
        widthRange: newWidthRange
      })
    }
  }

  setWidth (range) {
    clearTimeout(this.state.widthChangeTimeout)

    const {setWidth} = this.props
    const widthChangeTimeout = setTimeout(() => {
      setWidth(range)
    }, CHANGE_TIMEOUT_DELAY)

    this.setState({
      widthRange: range,
      widthChangeTimeout
    })
  }

  setHeight (range) {
    clearTimeout(this.state.heightChangeTimeout)

    const {setHeight} = this.props
    const heightChangeTimeout = setTimeout(() => {
      setHeight(range)
    }, CHANGE_TIMEOUT_DELAY)

    this.setState({
      heightRange: range,
      heightChangeTimeout
    })
  }

  render () {
    const {
      maxHeight,
      maxWidth
    } = this.props

    return (
      <div
        className="ResolutionPicker">
        <div
          className="ResolutionPicker__header">
          <Timestamp
            date="Image Resolution" />
        </div>

        <div
          className="ResolutionPicker__body">
          <Box>
            <Flex
              alignItems="flex-start">
              <FlexItem>
                <div
                  className="ResolutionPicker__name">Height:</div>
              </FlexItem>

              <FlexItem
                main>
                <Slider
                  onChange={range => this.setHeight(range)}
                  max={maxHeight}
                  range={this.state.heightRange} />
              </FlexItem>
            </Flex>
          </Box>

          <Flex
            alignItems="flex-start">
            <FlexItem>
              <div
                className="ResolutionPicker__name">Width:</div>
            </FlexItem>

            <FlexItem
              main>
              <Slider
                onChange={range => this.setWidth(range)}
                max={maxWidth}
                range={this.state.widthRange} />
            </FlexItem>
          </Flex>
        </div>
      </div>
    )
  }
}

const getMaxDimensions = createSelector(
  (state) => {
    return state.history.images
  },
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

export default connect(
  state => {
    const {
      maxHeight,
      maxWidth
    } = getMaxDimensions(state)

    return {
      heightRange: state.image.heightRange.length === 0
        ? [0, maxHeight]
        : state.image.heightRange,
      widthRange: state.image.widthRange.length === 0
        ? [0, maxWidth]
        : state.image.widthRange,
      maxWidth,
      maxHeight
    }
  },
  dispatch => ({
    setWidth: range => {
      dispatch(resetSelectedImage())
      dispatch(uncheckAllImages())
      dispatch(setWidth(range))
    },
    setHeight: range => {
      dispatch(resetSelectedImage())
      dispatch(uncheckAllImages())
      dispatch(setHeight(range))
    }
  })
)(ResolutionPicker)
