import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import {fetchHistory} from '../../store/historyActions'

import Loading from '../Loading'
import Filter from '../Filter'
import HistoryFilter from '../HistoryFilter'
import HistoryFilterPreview from '../HistoryFilterPreview'
import ImageGallery from '../ImageGallery'

import './App.css'

class App extends React.Component {
  componentWillMount () {
    const {userId, fetchHistory} = this.props

    fetchHistory(userId)
  }

  render () {
    const {isFetching, showHistoryFilters} = this.props

    if (isFetching) {
      return <Loading />
    } else {
      const body = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

      return (
        <div className="App">
          <div className="App__sidebar">
            <Filter
              title="Search History"
              value="history"
              body={
                <HistoryFilter />
              }
              filters={
                <HistoryFilterPreview />
              }
              showFilters={showHistoryFilters}
              />
            <Filter
              title="Collections"
              value="collection"
              body={body}
              filters={null} />
            <Filter
              title="Resolution"
              value="resolution"
              body={body}
              filters={null} />
            <Filter
              title="Color"
              value="color"
              body={body}
              filters={null} />
          </div>

          <div className="App__body">
            <ImageGallery />
          </div>
        </div>
      )
    }
  }
}

export default compose(
  DragDropContext(HTML5Backend),
  connect(
    state => ({
      isFetching: state.history.isFetching,
      userId: state.user.id,
      showHistoryFilters: state.ui.selectedDate !== null || state.ui.selectedQueries.length > 0
    }),
    (dispatch, ownProps) => ({
      fetchHistory: (userId) => {
        dispatch(fetchHistory(userId))
      }
    })
  )
)(App)
