import React from 'react'
import {connect} from 'react-redux'

const CollectionView = ({
  config
}) => {
  return (
    <div></div>
  )
}

export default connect(
  state => {
    return {
      topics: state.history.topics,

    }
  }
)(CollectionView)
