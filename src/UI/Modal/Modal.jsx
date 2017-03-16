import React from 'react'

import {Flex, FlexItem} from '../../Layouts/Flex'

import './Modal.css'

const Modal = ({
  children,
  closeCallback
}) => {
  return (
    <div
      onClick={closeCallback}
      className="Modal">
      <Flex
        alignItems="center"
        justifyContent="center">
        <FlexItem>
          {children}
        </FlexItem>
      </Flex>
    </div>
  )
}

const ModalWindow = ({
  title,
  closeCallback,
  children
}) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="ModalWindow">
      <div className="MW-header">
        <Flex
          justifyContent="space-between"
          alignItems="center">
          <FlexItem>
            <div className="MW-header__title">{title}</div>
          </FlexItem>

          <FlexItem>
            <button
              onClick={closeCallback}
              className="MW-header__close">
              &#215;
            </button>
          </FlexItem>
        </Flex>
      </div>

      <div className="ModalWindow__body">
        {children}
      </div>
    </div>
  )
}

export {Modal, ModalWindow}
