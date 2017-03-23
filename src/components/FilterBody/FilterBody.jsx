import React from 'react'
import classnames from 'classnames'

import './FilterBody.css'

const FilterBody = ({
  children
}) => {
  return (
    <div
      className="FilterBody">
      {children}
    </div>
  )
}

const FilterBodySection = ({
  children,
  main = false
}) => {
  return (
    <div
      className={classnames(
        'FilterBody__section',
        {
          'FilterBody__section--main': main
        }
      )}>
      {children}
    </div>
  )
}

export {FilterBody, FilterBodySection}
