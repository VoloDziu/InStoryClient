import React from 'react'
import classnames from 'classnames'

import './Checkbox.css'

const Checkbox = ({
  checked,
  ...props
}) => {
  return (
    <div
      {...props}
      className={classnames(
        'Checkbox',
        {
          'Checkbox--checked': checked
        }
      )} />
  )
}

export default Checkbox
