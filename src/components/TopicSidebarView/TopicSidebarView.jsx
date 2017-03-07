import React from 'react'
import {connect} from 'react-redux'

import SidebarCollection from '../SidebarCollection'
import {SidebarBody, SidebarBodyItem} from '../SidebarBody'
import CreateCollection from '../CreateCollection'

const TopicSidebarView = ({
  collections
}) => {
  return (
    <SidebarBody>
      <SidebarBodyItem>
        <CreateCollection />
      </SidebarBodyItem>

      {collections.map((c, index) =>
        <SidebarBodyItem
          key={index}>
          <SidebarCollection
            collection={c} />
        </SidebarBodyItem>
      )}
    </SidebarBody>
  )
}

export default connect(
  state => {
    return {
      collections: state.history.history
        ? state.history.history.collections
        : []
    }
  }
)(TopicSidebarView)
