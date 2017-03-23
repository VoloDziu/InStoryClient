import React from 'react'
import {connect} from 'react-redux'

import {Flex, FlexItem} from '../../Layouts/Flex'
import Button from '../../UI/Button'

import {
  uncheckAllQueries
} from '../../store/filterActions'

import {deleteQueries} from '../../store/historyActions'

import './QueryGroupActions.css'

const QueryGroupActions = ({
  userId,
  isUpdating,
  checkedQueryIds,
  uncheckAllQueries,
  deleteQueries
}) => {
  return (
    <Flex>
      <FlexItem>
        <Button
          color="white"
          disabled={isUpdating}
          onClick={uncheckAllQueries}
          link>
          clear
        </Button>
      </FlexItem>

      <FlexItem
        spacing={1}>
        <Button
          color="red"
          disabled={isUpdating}
          onClick={() => {
            deleteQueries(userId, checkedQueryIds)
          }}
          link>
          delete
        </Button>
      </FlexItem>
    </Flex>
  )
}

export default connect(
  state => ({
    userId: state.user.id,
    isUpdating: state.history.isUpdating,
    checkedQueryIds: Object.keys(state.checked.queries)
  }),
  dispatch => ({
    uncheckAllQueries: () => {
      dispatch(uncheckAllQueries())
    },
    deleteQueries: (userId, queryIds) => {
      dispatch(deleteQueries(userId, queryIds, () => {
        dispatch(uncheckAllQueries())
      }))
    }
  })
)(QueryGroupActions)
