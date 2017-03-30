import React from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import Box from '../../Layouts/Box'
import {ListInline, ListInlineItem} from '../../Layouts/ListInline'
import {List, ListItem} from '../../Layouts/List'
import {Grid, GridItem} from '../../Layouts/Grid'
import ColorSquare from '../ColorSquare'
import {
  truncate,
  toDay
} from '../../constants'

import './selectedImageView.css'

const SelectedImageView = ({
  image,
  queryName,
  collectionNames
}) => {
  return (
    <div className="SelectedImageView">
      <div className="SelectedImageView__body">
        <Grid
          gutter={2}
          alignItems="center">
          <GridItem
            span={2}
            outOf={3}
            gutter={2}>
            <img
              className="SelectedImageView__image"
              src={image.src} />
          </GridItem>

          <GridItem
            span={1}
            outOf={3}
            gutter={2}>
            <Box>
              <ListInline>
                <ListInlineItem>
                  <div
                    className="SelectedImageView__title">Search Query:</div>
                </ListInlineItem>

                <ListInlineItem>
                  <div
                    className="SelectedImageView__attr">
                    {queryName}
                  </div>
                </ListInlineItem>
              </ListInline>
            </Box>

            <Box>
              <ListInline>
                <ListInlineItem>
                  <div
                    className="SelectedImageView__title">Image source:</div>
                </ListInlineItem>

                <ListInlineItem>
                  <a
                    href={image.url}
                    className="SelectedImageView__attr SelectedImageView__attr--link">
                    {truncate(image.src, 20)}
                  </a>
                </ListInlineItem>
              </ListInline>
            </Box>

            <Box>
              <ListInline>
                <ListInlineItem>
                  <div
                    className="SelectedImageView__title">Image size:</div>
                </ListInlineItem>

                <ListInlineItem>
                  <div
                    className="SelectedImageView__attr">
                    {`${image.width}px x ${image.height}px`}
                  </div>
                </ListInlineItem>
              </ListInline>
            </Box>

            <Box>
              <ListInline>
                <ListInlineItem>
                  <div
                    className="SelectedImageView__title">Collected on: </div>
                </ListInlineItem>

                <ListInlineItem>
                  <div
                    className="SelectedImageView__attr">
                    {toDay(image.timestamp)}
                  </div>
                </ListInlineItem>
              </ListInline>
            </Box>

            <Box>
              <ListInline
                alignItems="flex-start">
                <ListInlineItem>
                  <div
                    className="SelectedImageView__title">Collections: </div>
                </ListInlineItem>

                <ListInlineItem>
                  {image.collectionIds.length
                    ? <List>
                      {collectionNames.map(name =>
                        <ListItem
                          key={name}>
                          <div
                            className="SelectedImageView__attr">
                            {name}
                          </div>
                        </ListItem>
                      )}
                    </List>
                    : <div
                      className="SelectedImageView__attr">
                      None
                    </div>
                  }
                </ListInlineItem>
              </ListInline>
            </Box>

            <ListInline>
              <ListInlineItem>
                <div
                  className="SelectedImageView__title">Colors: </div>
              </ListInlineItem>

              <ListInlineItem>
                <ListInline>
                  {image.colors.map((c, index) =>
                    <ListInlineItem
                      key={index}>
                      <ColorSquare
                        color={`hsla(${c[0]}, ${Math.floor(c[1] * 100)}%, ${Math.floor(c[2] * 100)}%, 1)`} />
                    </ListInlineItem>
                  )}
                </ListInline>
              </ListInlineItem>
            </ListInline>
          </GridItem>
        </Grid>
      </div>
    </div>
  )
}

const makeGetQueryName = () => {
  return createSelector(
    (state, props) => state.history.queries.find(q => q._id === props.image.queryId),
    (query) => query.q
  )
}

const makeGetCollectionNames = () => {
  return createSelector(
    (state, props) => state.history.collections.filter(c => props.image.collectionIds.indexOf(c._id) !== -1),
    (collections) => collections.map(c => c.name)
  )
}

export default connect(
  (state, ownProps) => {
    const getQueryName = makeGetQueryName()
    const getCollectionNames = makeGetCollectionNames()

    return {
      queryName: getQueryName(state, ownProps),
      collectionNames: getCollectionNames(state, ownProps)
    }
  }
)(SelectedImageView)
