import React from 'react'
import './Flex.css'

const Flex = ({
  flexDirection = 'row',
  alignItems = 'center',
  justifyContent = 'flex-start',
  children
}) => {
  const style = {
    flexDirection,
    alignItems,
    justifyContent
  }

  return (
    <div
      style={style}
      className="l-flex">
      {children}
    </div>
  )
}

const FlexItem = ({
  children,
  main = false,
  spacing = 0
}) => {
  const style = {
    marginLeft: `${spacing * 0.750}rem`
  }

  if (main) {
    style.flex = 1
  }

  return (
    <div
      style={style}
      className="l-flex__item">
      {children}
    </div>
  )
}

export {Flex, FlexItem}
