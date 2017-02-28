import React from 'react'

const LayoutDummy = ({
  children
}) => {
  const style = {
    flex: 1,
    padding: '12px',
    minHeight: '120px',
    background: '#' + Math.random().toString(16).substr(-6)
  }

  return (
    <div
      className="l-layout-dummy"
      style={style}>
      {children}
    </div>
  )
}

export default LayoutDummy
