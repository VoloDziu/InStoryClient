import React from 'react'
import {connect} from 'react-redux'

import {Grid, GridItem} from '../../Layouts/Grid'
import Box from '../../Layouts/Box'
import SelectedImageView from '../SelectedImageView'
import CollectionImage from '../CollectionImage'

const CollectionImagesList = ({
  images,
  selectedImage
}) => {
  const imageRows = []
  let currentRow = []
  for (let i = 0; i < images.length; i++) {
    if (i !== 0 && i % 5 === 0) {
      imageRows.push(currentRow)
      currentRow = []
    }

    currentRow.push(images[i])
  }
  if (currentRow.length > 0) {
    imageRows.push(currentRow)
  }

  return (
    <div className="collection-images-list">
      {imageRows.map((row, index) =>
        <div
          key={index}>
          <Box t={0} b={0} l={1} r={1}>
            <Grid
              alignItems="stretch"
              justifyContent="flex-start"
              gutterBottom={0}>
              {row.map((img, j) =>
                <GridItem
                  key={j}
                  span={1}
                  outOf={5}
                  gutter={0}
                  gutterBottom={0}>
                  <CollectionImage
                    img={img} />
                </GridItem>
              )}
            </Grid>
          </Box>

          {selectedImage && row.map(i => i._id).indexOf(selectedImage._id) !== -1
            ? <SelectedImageView />
          : ''}
        </div>
      )}
    </div>
  )
}

export default connect(
  state => {
    return {
      selectedImage: state.ui.selectedImage
    }
  }
)(CollectionImagesList)
