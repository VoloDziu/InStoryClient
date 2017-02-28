import React from 'react'
import classnames from 'classnames'
import {Flex} from '../Flex'
import {Media, MediaBody, MediaFigure} from '../Media'

import './InputGroup.css'

const InputGroup = ({
  body,
  label,
  error,
  inline = false
}) => {
  const classes = classnames('l-input-group', {
    'l-input-group--error': error,
    'l-input-group--inline': inline
  })

  if (inline) {
    return (
      <label className={classes}>
        <Media alignItems="center">
          <MediaFigure>
            <div className="l-input-group__label">
              {label}
            </div>
          </MediaFigure>

          <MediaBody>
            <div className="l-input-group__body">
              {body}
            </div>
          </MediaBody>
        </Media>

        <div className="l-input-group__error">{error}</div>
      </label>
    )
  } else {
    return (
      <label className={classes}>
        <Flex
          justifyContent="space-between"
          alignItems="center">
          <div className="l-input-group__label">
            {label}
          </div>

          <div className="l-input-group__error">{error}</div>
        </Flex>

        <div className="l-input-group__body">
          {body}
        </div>
      </label>
    )
  }
}

export default InputGroup
