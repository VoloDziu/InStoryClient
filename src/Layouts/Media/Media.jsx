import React from 'react'
import './Media.css'

const baseline = 0.750

const Media = ({
  alignItems = 'flex-start',
  children
}) => {
  const style = {
    alignItems
  }

  return (
    <div style={style}
      className="l-media">
      {children}
    </div>
  )
}

const MediaBody = ({
  children
}) => {
  return (
    <div className="l-media__body">
      {children}
    </div>
  )
}

const MediaFigure = ({
  n = 1,
  reversed = false,
  children
}) => {
  const style = {}

  if (reversed) {
    style.marginRight = `${baseline * n}rem`
  } else {
    style.marginLeft = `${baseline * n}rem`
  }

  return (
    <div style={style}
      className="l-media__figure">
      {children}
    </div>
  )
}

export {Media, MediaBody, MediaFigure}
