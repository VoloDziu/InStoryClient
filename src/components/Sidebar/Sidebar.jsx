import React from 'react'
import Lorem from 'react-lorem-component'

import {ViewSplit, ViewSplitSection} from '../../Layouts/ViewSplit'

import './Sidebar.css'

const Sidebar = ({
  children
}) => {
  return (
    <div className="sidebar">
      {children}
    </div>
  )
}

export default Sidebar
