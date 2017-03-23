import React from 'react'
import {connect} from 'react-redux'

import {setWidth, setHeight} from '../../store/filterActions'
import {Flex} from '../../Layouts/Flex'
import Box from '../../Layouts/Box'
import {CHANGE_TIMEOUT_DELAY} from '../../constants'
import Slider from '../Slider'

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
      <div className="ResolutionPicker">
        <Box>
          <Box>
            <Flex
              alignItems="center"
              justifyContent="space-between">
              <div
                className="ResolutionPicker__header">
                Height:
              </div>

              <div
                className="ResolutionPicker__info">
                {this.state.heightRange[0]}px – {this.state.heightRange[1]}px
              </div>
            </Flex>
          </Box>

          <Slider
            onChange={range => this.setHeight(range)}
            max={maxHeight}
            range={this.state.heightRange} />
        </Box>

        <Box>
          <Flex
            alignItems="center"
            justifyContent="space-between">
            <div
              className="ResolutionPicker__header">
              Width:
            </div>

            <div
              className="ResolutionPicker__info">
              {this.state.widthRange[0]}px – {this.state.widthRange[1]}px
            </div>
          </Flex>
        </Box>

        <Slider
          onChange={range => this.setWidth(range)}
          max={maxWidth}
          range={this.state.widthRange} />
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      heightRange: state.image.heightRange.length === 0
        ? [0, state.history.maxHeight]
        : state.image.heightRange,
      widthRange: state.image.widthRange.length === 0
        ? [0, state.history.maxWidth]
        : state.image.widthRange,
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
