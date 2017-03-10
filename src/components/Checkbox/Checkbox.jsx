import React from 'react'
import classnames from 'classnames'

import './Checkbox.css'

const Checkbox = ({
  checked
}) => {
  return (
    <div
      className={classnames(
        'Checkbox',
        {
          'Checkbox--checked': checked
        }
      )} />
  )
}

export default Checkbox
