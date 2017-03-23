import React from 'react'
import classnames from 'classnames'

import './Flex.css'

const Flex = ({
  flexDirection = 'row',
  alignItems = 'center',
  justifyContent = 'flex-start',
  flexWrap = 'nowrap',
  offset = 0,
  vOffset = 0,
  children
}) => {
  const style = {
    flexDirection,
    alignItems,
    justifyContent,
    flexWrap,
    marginLeft: `-${offset * 0.750}rem`,
    marginBottom: `-${vOffset * 0.750}rem`
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
  alignSelf = 'auto',
  main = false,
  spacing = 0,
  vspacing = 0
}) => {
  const style = {
    marginLeft: `${spacing * 0.750}rem`,
    marginBottom: `${vspacing * 0.750}rem`,
    alignSelf
  }

  return (
    <div
      style={style}
      className={classnames(
        'l-flex__item',
        {
          'l-flex__item--main': main
        }
      )}>
      {children}
    </div>
  )
}

export {Flex, FlexItem}
