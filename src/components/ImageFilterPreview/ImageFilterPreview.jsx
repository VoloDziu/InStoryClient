import React from 'react'
import {connect} from 'react-redux'

import {setWidth, setHeight} from '../../store/uiActions'
import {ListInline, ListInlineItem} from '../../Layouts/ListInline'
import FilterPreview from '../FilterPreview'
import {
  logWidthRange,
  logHeightRange
} from '../../logger'

const ImageFilterPreview = ({
  widthRange,
  heightRange,
  maxWidth,
  maxHeight,
  setWidth,
  setHeight,
  userId
}) => {
  return (
    <ListInline>
      {widthRange[0] > 0 || widthRange[1] < maxWidth
        ? <ListInlineItem>
          <FilterPreview
            name={`W: ${widthRange[0]} - ${widthRange[1]}`}
            removeCallback={() => setWidth(userId, maxWidth)} />
        </ListInlineItem>
        : ''
      }

      {heightRange[0] > 0 || heightRange[1] < maxHeight
        ? <ListInlineItem>
          <FilterPreview
            name={`H: ${heightRange[0]} - ${heightRange[1]}`}
            removeCallback={() => setHeight(userId, maxHeight)} />
        </ListInlineItem>
        : ''
      }
    </ListInline>
  )
}

export default connect(
  state => ({
    userId: state.user.id,
    widthRange: state.ui.widthRange,
    heightRange: state.ui.heightRange,
    maxWidth: state.history.maxWidth,
    maxHeight: state.history.maxHeight
  }),
  dispatch => ({
    setWidth: (userId, width) => {
      logWidthRange(userId, [0, width])
      dispatch(setWidth([0, width]))
    },
    setHeight: (userId, height) => {
      logHeightRange(userId, [0, height])
      dispatch(setHeight([0, height]))
    }
  })
)(ImageFilterPreview)
