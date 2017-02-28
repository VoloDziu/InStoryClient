import React from 'react'
import './Grid.css'

const baseline = 0.750

const Grid = ({
  gutterBottom = 3,
  alignItems = 'stretch',
  justifyContent = 'space-between',
  alignContent = 'space-between',
  children
}) => {
  const style = {
    alignItems,
    justifyContent,
    alignContent,
    marginBottom: `-${gutterBottom * baseline}rem`
  }

  return (
    <div style={style}
      className="l-grid">
      {children}
    </div>
  )
}

const GridItem = ({
  span = 0,
  outOf = 12,
  gutter = 3,
  gutterBottom = 3,
  children
}) => {
  let style = {
    flex: '1',
    marginBottom: `${gutterBottom * baseline}rem`
  }

  if (span && outOf) {
    style = Object.assign({}, style, {
      flex: '0 0 auto',
      width: span === outOf ? '100%' : `${100 * span / outOf - gutter}%`
    })
  }

  return (
    <div style={style}
      className="l-grid__item">
      {children}
    </div>
  )
}

export {Grid, GridItem}
