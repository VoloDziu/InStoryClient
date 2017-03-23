import React from 'react'
import {connect} from 'react-redux'

import {IMAGES_PER_ROW} from '../../constants'
import Box from '../../Layouts/Box'
import {Grid, GridItem} from '../../Layouts/Grid'
import GalleryImage from '../GalleryImage'
import SelectedImageView from '../SelectedImageView'

const GalleryRow = ({
  images,
  selectedImage
}) => {
  return (
    <div>
      <Box l={1.5} r={1.5} t={0} b={0}>
        <Grid
          alignItems="stretch"
          justifyContent="flex-start"
          gutterBottom={0}>
          {images.map((img, j) =>
            <GridItem
              key={j}
              span={1}
              outOf={IMAGES_PER_ROW}
              gutter={0}
              gutterBottom={0}>
              <GalleryImage
                img={img} />
            </GridItem>
          )}
        </Grid>
      </Box>

      {selectedImage
        ? <SelectedImageView image={selectedImage} />
        : ''
      }
    </div>
  )
}

export default connect(
  (state, ownProps) => ({
    selectedImage: ownProps.images.find(i => i._id === state.selected.imageId)
  })
)(GalleryRow)
