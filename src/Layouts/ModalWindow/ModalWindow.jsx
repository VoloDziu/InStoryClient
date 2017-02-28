import React from 'react'
import classnames from 'classnames'
import {Flex} from '../../Layouts/Flex'

import './ModalWindow.css'

const Modal = ({
  children,
  overlay = false
}) => {
  const classes = classnames('ui-modal', {
    'ui-modal--overlay': overlay
  })

  return (
    <div className={classes}>
      <Flex alignItems="center" justifyContent="center">
        {children}
      </Flex>
    </div>
  )
}

const ModalWindow = ({
  children,
  body,
  header = null,
  footer = null,
  width = 40,
  border = true,
  borderHeader = true,
  borderFooter = true
}) => {
  let headerEl = null
  if (header) {
    const headerClasses = classnames('ui-modal-window__header', {
      'ui-modal-window__header--border': borderHeader
    })

    headerEl = (
      <div className={headerClasses}>
        {header}
      </div>
    )
  }

  let footerEl = null
  if (footer) {
    const footerClasses = classnames('ui-modal-window__footer', {
      'ui-modal-window__footer--border': borderFooter
    })

    footerEl = (
      <div className={footerClasses}>
        {footer}
      </div>
    )
  }

  const classes = classnames('ui-modal-window', {
    'ui-modal-window--border': border
  })

  return (
    <div
      style={{
        width: `${width}rem`
      }}
      className={classes}>
      {headerEl}
      <div className="ui-modal-window__body">
        {body}
      </div>
      {footerEl}
    </div>
  )
}

export {Modal, ModalWindow}
