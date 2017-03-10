import React from 'react'
import classnames from 'classnames'

import './Icon.css'

const Icon = ({
  icon,
  small = false,
  ...props
}) => {
  return (
    <div
      style={{
        backgroundImage: `url('${icon}')`
      }}
      className={classnames(
        'icon',
        {
          'icon--small': small
        }
      )}
      {...props} />
  )
}

export default Icon
