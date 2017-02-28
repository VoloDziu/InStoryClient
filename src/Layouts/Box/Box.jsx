import React from 'react'
import './Box.css'

const baseline = 0.750

const Box = ({
  t = 0,
  r = 0,
  b = 1,
  l = 0,
  children
}) => {
  const style = {
    paddingTop: `${baseline * t}rem`,
    paddingRight: `${baseline * r}rem`,
    paddingBottom: `${baseline * b}rem`,
    paddingLeft: `${baseline * l}rem`
  }

  return (
    <div style={style}
      className="l-box">
      {children}
    </div>
  )
}

export default Box
