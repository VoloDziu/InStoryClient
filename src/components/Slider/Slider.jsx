import React from 'react'
import ReactSlider from 'react-slider'

import './Slider.css'

const STEP = 100

const round = number => {
  if (number % STEP === 0) {
    return number
  } else {
    return number - number % STEP + STEP
  }
}

const Slider = ({
  max,
  range,
  onChange
}) => {
  const roundedMax = round(max)
  const roundedRange = range.map(v => round(v))

  return (
    <ReactSlider
      className="Slider"
      handleClassName="S-handle"
      handleActiveClassName="S-handle--active"
      barClassName="Slider__bar"
      withBars
      onChange={onChange}
      min={0}
      step={STEP}
      max={roundedMax}
      value={roundedRange}>
      <div className="S-handle__counter S-handle__counter--low">{roundedRange[0]}</div>
      <div className="S-handle__counter S-handle__counter--high">{roundedRange[1]}</div>
    </ReactSlider>
  )
}

export default Slider
