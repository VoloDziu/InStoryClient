import React from 'react'
import './Wrapper.css'

const Wrapper = ({
  children,
  maxWidth = 90,
  width = 90
}) => {
  const style = {
    width: `${width}%`,
    maxWidth: `${maxWidth}rem`
  }

  return (
    <div style={style}
      className="l-wrapper">
      {children}
    </div>
  )
}

export default Wrapper
