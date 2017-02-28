import React from 'react'
import classnames from 'classnames'

import './ViewSplit.css'

const ViewSplit = ({
  horizontal,
  children,
  fixed = false
}) => {
  const classes = classnames('l-view-split', {
    'l-view-split--horizontal': horizontal,
    'l-view-split--vertical': !horizontal,
    'l-view-split--fixed': fixed
  })

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

const ViewSplitSection = ({
  main = false,
  children
}) => {
  const classes = classnames('l-view-split__section', {
    'l-view-split__section--main': main
  })

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export {ViewSplit, ViewSplitSection}
