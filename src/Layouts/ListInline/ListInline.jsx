import React from 'react'
import './ListInline.css'

const baseline = 0.750

const ListInline = ({
  n = 1,
  children,
  alignItems = 'center',
  justifyContent = 'flex-start'
}) => {
  const style = {
    marginBottom: `-${baseline * n}rem`,
    marginLeft: `-${baseline * n}rem`,
    alignItems,
    justifyContent
  }

  return (
    <ul style={style}
      className="l-list-inline">
      {children}
    </ul>
  )
}

const ListInlineItem = ({
  n = 1,
  children
}) => {
  const style = {
    marginBottom: `${baseline * n}rem`,
    marginLeft: `${baseline * n}rem`
  }

  return (
    <li style={style} className="l-list-inline__item">
      {children}
    </li>
  )
}

export {ListInline, ListInlineItem}
