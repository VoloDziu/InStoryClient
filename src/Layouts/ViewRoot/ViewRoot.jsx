import React from 'react'
import classnames from 'classnames'

import './ViewRoot.css'

const ViewRoot = ({
  fixed = false,
  children
}) => {
  const classes = classnames('view-root', {
    'view-root--fixed': fixed
  })

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default ViewRoot
