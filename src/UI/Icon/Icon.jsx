import React from 'react'

import './Icon.css'

const Icon = ({
  children,
  icon
}) => {
  return (
    <div
      style={{
        backgroundImage: `url('${icon}')`
      }}
      className="icon">
      {children}
    </div>
  )
}

export default Icon
