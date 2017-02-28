import React from 'react'
import {connect} from 'react-redux'

import {ViewSplit, ViewSplitSection} from '../../Layouts/ViewSplit'
import Sidebar from '../Sidebar'
import Main from '../Main'
import TimeSidebarView from '../TimeSidebarView'
import TopicSidebarView from '../TopicSidebarView'
import TimeCollectionView from '../TimeCollectionView'
import TopicCollectionView from '../TopicCollectionView'

import {fetchHistory} from '../../store/historyActions'

class InStory extends React.Component {
  componentWillMount () {
    const {userId, fetchHistory} = this.props

    fetchHistory(userId)
  }

  render () {
    const {collectionArrangement} = this.props

    let collection = null
    let sidebar = null
    switch (collectionArrangement) {
      case 'time':
        sidebar = <TimeSidebarView />
        collection = <TimeCollectionView />
        break
      case 'topics':
        sidebar = <TopicSidebarView />
        collection = <TopicCollectionView />
        break
      default:
        console.error(`unknown collection view config ${collectionArrangement}`)
    }

    return (
      <ViewSplit
        horizontal
        fixed>
        <ViewSplitSection>
          <Sidebar>
            {sidebar}
          </Sidebar>
        </ViewSplitSection>

        <ViewSplitSection
          main>
          {collection}
        </ViewSplitSection>
      </ViewSplit>
    )
  }
}

export default connect(
  state => {
    return {
      isFetching: state.history.isFetching,
      userId: state.user.id,
      collectionArrangement: state.config.collectionArrangement
    }
  },
  (dispatch, ownProps) => {
    return {
      fetchHistory: (userId) => {
        dispatch(fetchHistory(userId))
      }
    }
  }
)(InStory)
