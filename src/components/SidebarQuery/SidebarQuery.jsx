import React from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux'
import moment from 'moment'

import {toggleSelectQuery, deleteQuery} from '../../store/uiActions'

import {Flex, FlexItem} from '../../Layouts/Flex'
import Button from '../../UI/Button'

import './SidebarQuery.css'

class SidebarQuery extends React.Component {
  render () {
    const {
      query,
      isSelected,
      toggleSelectQuery
    } = this.props

    const classes = classnames('sidebar-query', {
      'sidebar-query--selected': isSelected
    })

    return (
      <div className={classes}>
        <Flex>
          <FlexItem main>
            <div className="sidebar-query__body"
              onClick={toggleSelectQuery}>
              <Flex>
                <FlexItem>
                  <div className="sidebar-query__timestamp">
                    {moment(query.timestamp).format('h:mm a')}
                  </div>
                </FlexItem>

                <FlexItem
                  main>
                  <div
                    className="sidebar-query__query">
                    {query.q.replace(/\+/g, ' ')}
                  </div>
                </FlexItem>
              </Flex>
            </div>
          </FlexItem>

          <FlexItem
            spacing={1}>
            <div className="sidebar-query__counter">
              {query.images.length}
            </div>
          </FlexItem>
        </Flex>
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => {
    const {query} = ownProps

    return {
      isSelected: state.ui.selectedQueries.length === 0 || state.ui.selectedQueries.indexOf(query) !== -1
    }
  },
  (dispatch, ownProps) => {
    const {query} = ownProps

    return {
      toggleSelectQuery: () => {
        dispatch(toggleSelectQuery(query))
      }
    }
  }
)(SidebarQuery)
