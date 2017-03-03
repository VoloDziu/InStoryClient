import React from 'react'
import {connect} from 'react-redux'

import {fetchHistory} from '../../store/historyActions'

import {ViewSplit, ViewSplitSection} from '../../Layouts/ViewSplit'
import TimeCollectionView from '../TimeCollectionView'
import TopicCollectionView from '../TopicCollectionView'
import TimeSidebarView from '../TimeSidebarView'
import TopicSidebarView from '../TopicSidebarView'
import Loading from '../Loading'
import ArrangementTabs from '../ArrangementTabs'

import './App.css'

class App extends React.Component {
  componentWillMount () {
    const {userId, fetchHistory} = this.props

    fetchHistory(userId)
  }

  render () {
    const {isFetching, collectionArrangement} = this.props

    if (isFetching) {
      return <Loading />
    } else {
      let content = ''
      let sidebar = ''
      if (collectionArrangement === 'time') {
        sidebar = <TimeSidebarView />
        content = <TimeCollectionView />
      } else if (collectionArrangement === 'topic') {
        sidebar = <TopicSidebarView />
        content = <TopicCollectionView />
      }

      return (
        <div className="app">
          <ViewSplit
            horizontal
            fixed>
            <ViewSplitSection>
              <div className="app__sidebar">
                <ViewSplit
                  fixed>
                  <ViewSplitSection>
                    <ArrangementTabs />
                  </ViewSplitSection>

                  <ViewSplitSection
                    main>
                    {sidebar}
                  </ViewSplitSection>
                </ViewSplit>
              </div>
            </ViewSplitSection>

            <ViewSplitSection
              main>
              {content}
            </ViewSplitSection>
          </ViewSplit>
        </div>
      )
    }
  }
}

export default connect(
  state => {
    return {
      collectionArrangement: state.config.collectionArrangement,
      isFetching: state.history.isFetching,
      userId: state.user.id
    }
  },
  (dispatch, ownProps) => {
    return {
      fetchHistory: (userId) => {
        dispatch(fetchHistory(userId))
      }
    }
  }
)(App)
