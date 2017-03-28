import React from 'react'

import './ColorSquare.css'

const ColorSquare = ({
  color
}) => {
  return (
    <div
      style={{
        backgroundColor: color.hex
      }}
      className="ColorSquare" />
  )
}

export default ColorSquare
