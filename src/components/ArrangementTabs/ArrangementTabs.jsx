import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'

import {Grid, GridItem} from '../../Layouts/Grid'

import {setCollectionArrangement} from '../../store/configActions'

import './ArrangementTabs.css'

const ArrangementTabs = ({
  collectionArrangement,
  setCollectionArrangement
}) => {
  return (
    <div className="arrangement-tabs">
      <Grid>
        <GridItem
          span={1}
          outOf={2}
          gutter={0}>
          <button
            onClick={() => setCollectionArrangement('time')}
            className={classnames(
              'arrangement-tabs__tab',
              {
                'arrangement-tabs__tab--active': collectionArrangement === 'time'
              }
            )}>Time</button>
        </GridItem>

        <GridItem
          span={1}
          outOf={2}
          gutter={0}>
          <button
            onClick={() => setCollectionArrangement('topic')}
            className={classnames(
              'arrangement-tabs__tab',
              'arrangement-tabs__tab--last',
              {
                'arrangement-tabs__tab--active': collectionArrangement === 'topic'
              }
            )}>Collections</button>
        </GridItem>
      </Grid>
    </div>
  )
}

export default connect(
  state => {
    return {
      collectionArrangement: state.config.collectionArrangement
    }
  },
  dispatch => {
    return {
      setCollectionArrangement: (value) => {
        dispatch(setCollectionArrangement(value))
      }
    }
  }
)(ArrangementTabs)
