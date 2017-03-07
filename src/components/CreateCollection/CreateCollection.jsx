import React from 'react'
import {connect} from 'react-redux'

import {Flex, FlexItem} from '../../Layouts/Flex'
import Button from '../../UI/Button'
import Icon from '../../UI/Icon'

import {createCollection} from '../../store/historyActions'

import './CreateCollection.css'
import icon from './icon-plus.svg'

const CreateCollection = ({
  userId,
  isUpdating,
  createCollection
}) => {
  return (
    <div className="create-collection">
      <Button
        link
        disabled={isUpdating}
        onClick={() => createCollection(userId)}>
        <Flex>
          <FlexItem>
            <Icon icon={icon} />
          </FlexItem>

          <FlexItem
            spacing={1}>
            create new collection
          </FlexItem>
        </Flex>
      </Button>
    </div>
  )
}

export default connect(
  state => {
    return {
      userId: state.user.id,
      isUpdating: state.history.isUpdating
    }
  },
  dispatch => {
    return {
      createCollection: (userId) => {
        dispatch(createCollection(userId))
      }
    }
  }
)(CreateCollection)
