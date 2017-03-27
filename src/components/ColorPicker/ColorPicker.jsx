import React from 'react'

import Color from '../Color'
import Timestamp from '../Timestamp'
import {COLORS} from '../../constants'

import './ColorPicker.css'

const ColorPicker = () => {
  return (
    <div
      className="ColorPicker">
      <div
        className="ColorPicker__header">
        <Timestamp
          date="Image Colors" />
      </div>

      <div className="ColorPicker__body">
        {COLORS.map(c =>
          <Color
            key={c.name}
            color={c} />
        )}
      </div>
    </div>
  )
}

export default ColorPicker
