import React from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux'
import moment from 'moment'

import {toggleSelectQuery} from '../../store/uiActions'
import {deleteQuery} from '../../store/historyActions'
import constants from '../../constants'
import {Flex, FlexItem} from '../../Layouts/Flex'
import Button from '../../UI/Button'

import './SidebarQuery.css'

class SidebarQuery extends React.Component {
  render () {
    const {
      query,
      imagesCount,
      userId,
      isSelected,
      isUpdating,
      toggleSelectQuery,
      deleteQuery
    } = this.props

    const classes = classnames('sidebar-query', {
      'sidebar-query--selected': isSelected
    })

    return (
      <div className={classes}>
        <Flex>
          <FlexItem main>
            <div className="sidebar-query__body"
              onClick={() => {
                if (isUpdating) {
                  return
                } else {
                  toggleSelectQuery()
                }
              }}>
              <Flex>
                <FlexItem>
                  <div className="sidebar-query__timestamp">
                    {moment(query.timestamp).format('h:mm a')}
                  </div>
                </FlexItem>

                <FlexItem
                  alignSelf="stretch"
                  spacing={1}>
                  <div className="sidebar-query__counter">
                    {imagesCount}
                  </div>
                </FlexItem>

                <FlexItem
                  spacing={1}
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
            spacing={0.5}>
            <div
              className="sidebar-query__actions">
              <Flex
                justifyContent="center">
                <FlexItem>
                  {isUpdating
                    ? ''
                    : <div className="sidebar-query__action">
                      <Button
                        link
                        color="red"
                        onClick={() => deleteQuery(userId)}>delete</Button>
                    </div>
                  }
                </FlexItem>
              </Flex>
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
      imagesCount: state.history.history.images.filter(img => img.queryId === query._id).length,
      userId: state.user.id,
      isUpdating: state.history.isUpdating,
      isSelected: (state.ui.selectedDate === null || state.ui.selectedDate === moment(query.timestamp).format(constants.TIME_FORMAT)) &&
                  (state.ui.selectedQueries.length === 0 || state.ui.selectedQueries.indexOf(query) !== -1)
    }
  },
  (dispatch, ownProps) => {
    const {query} = ownProps

    return {
      toggleSelectQuery: () => {
        dispatch(toggleSelectQuery(query))
      },
      deleteQuery: (userId) => {
        dispatch(deleteQuery(userId, query._id))
      }
    }
  }
)(SidebarQuery)
