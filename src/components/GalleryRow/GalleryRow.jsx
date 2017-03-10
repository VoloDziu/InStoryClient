import React from 'react'
import {connect} from 'react-redux'

import constants from '../../constants'
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
              outOf={constants.IMAGES_PER_ROW}
              gutter={0}
              gutterBottom={0}>
              <GalleryImage
                img={img} />
            </GridItem>
          )}
        </Grid>
      </Box>

      {selectedImage && images.map(i => i._id).indexOf(selectedImage._id) !== -1
        ? <SelectedImageView />
        : ''
      }
    </div>
  )
}

export default connect(
  state => ({
    selectedImage: state.ui.selectedImage
  })
)(GalleryRow)
