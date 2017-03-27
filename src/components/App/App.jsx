import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import {fetchHistory} from '../../store/historyActions'

import Loading from '../Loading'
import HistoryFilter from '../HistoryFilter'
import ImageFilter from '../ImageFilter'
import CollectionFilter from '../CollectionFilter'
import ImageGallery from '../ImageGallery'

import './App.css'

class App extends React.Component {
  componentWillMount () {
    const {userId, fetchHistory} = this.props

    fetchHistory(userId)
  }

  render () {
    const {isFetching} = this.props

    if (isFetching) {
      return <Loading />
    } else {
      return (
        <div className="App">
          <div className="App__sidebar">
            <HistoryFilter />
            <CollectionFilter />
            <ImageFilter />
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
      showHistoryFilters: state.ui.selectedDay !== null || state.ui.checkedQueries.length > 0
    }),
    (dispatch, ownProps) => ({
      fetchHistory: (userId) => {
        dispatch(fetchHistory(userId))
      }
    })
  )
)(App)
