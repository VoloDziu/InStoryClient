import React from 'react'
import classnames from 'classnames'
// import {Link} from 'react-router'

import './Button.css'

const Button = ({
  children,
  onClick,
  to = null,
  href = null,
  link = false,
  disabled = false,
  color = 'blue',
  hasPrefix = false,
  hasSuffix = false
}) => {
  const classes = classnames({
    'ui-button': !link,
    [`ui-button--${color}`]: !link,
    'ui-button--has-prefix': !link && hasPrefix,
    'ui-button--has-suffix': !link && hasSuffix,
    'ui-link': link,
    [`ui-link--${color}`]: link
  })

  if (to) {
    // return (
    //   <Link
    //     className={classes}
    //     to={to}>{children}</Link>
    // )
  } else if (href) {
    return (
      <a
        className={classes}
        disabled={disabled}
        href={href}
        target="_blank">{children}</a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        onClick={onClick}>{children}</button>
    )
  }
}

export default Button
