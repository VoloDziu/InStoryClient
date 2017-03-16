import React from 'react'
import {connect} from 'react-redux'

import {setWidth, setHeight} from '../../store/uiActions'
import {Flex} from '../../Layouts/Flex'
import Box from '../../Layouts/Box'
import Slider from '../Slider'

import './ResolutionPicker.css'

const ResolutionPicker = ({
  heightRange,
  maxHeight,
  maxWidth,
  widthRange,
  setHeight,
  setWidth
}) => {
  return (
    <div className="ResolutionPicker">
      <Box b={1}>
        <Box b={1} t={1}>
          <Flex
            alignItems="center"
            justifyContent="space-between">
            <div
              className="ResolutionPicker__header">
              Height:
            </div>

            <div
              className="ResolutionPicker__info">
              {heightRange[0]}px – {heightRange[1]}px
            </div>
          </Flex>
        </Box>

        <Slider
          onChange={range => setHeight(range)}
          max={maxHeight}
          range={heightRange} />
      </Box>

      <Box b={1} t={1}>
        <Flex
          alignItems="center"
          justifyContent="space-between">
          <div
            className="ResolutionPicker__header">
            Width:
          </div>

          <div
            className="ResolutionPicker__info">
            {widthRange[0]}px – {widthRange[1]}px
          </div>
        </Flex>
      </Box>

      <Slider
        onChange={range => setWidth(range)}
        max={maxWidth}
        range={widthRange} />
    </div>
  )
}

export default connect(
  state => {
    return {
      heightRange: state.ui.heightRange,
      widthRange: state.ui.widthRange,
      maxWidth: state.history.maxWidth,
      maxHeight: state.history.maxHeight
    }
  },
  dispatch => ({
    setWidth: range => {
      dispatch(setWidth(range))
    },
    setHeight: range => {
      dispatch(setHeight(range))
    }
  })
)(ResolutionPicker)
