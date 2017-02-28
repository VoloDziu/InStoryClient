import React from 'react'
import './List.css'

const baseline = 0.750

const List = ({
  n = 1,
  children
}) => {
  const style = {
    marginBottom: `-${baseline * n}rem`
  }

  return (
    <ul style={style} className="l-list">
      {children}
    </ul>
  )
}

const ListItem = ({
  n = 1,
  children
}) => {
  const style = {
    marginBottom: `${baseline * n}rem`
  }

  return (
    <li style={style} className="l-list__item">
      {children}
    </li>
  )
}

export {List, ListItem}
