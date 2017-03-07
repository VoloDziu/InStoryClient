import React from 'react'

import './SidebarBody.css'

const SidebarBody = ({
  children
}) => {
  return (
    <div className="sidebar-body">
      {children}
    </div>
  )
}

const SidebarBodyItem = ({
  children
}) => {
  return (
    <div className="sidebar-body__item">
      {children}
    </div>
  )
}

export {SidebarBody, SidebarBodyItem}
