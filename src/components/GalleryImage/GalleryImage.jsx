import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {DragSource} from 'react-dnd'

import {IMAGE} from '../../constants'
import Checkbox from '../Checkbox'
import {
  setDraggingImages
} from '../../store/uiActions'
import {
  toggleSelectImage,
  toggleCheckImage
} from '../../store/filterActions'

import './GalleryImage.css'

class GalleryImage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      // imageVisible: false
      imageVisible: true
    }
  }

  // componentDidMount () {
  //   const elementPosition = this._element.getBoundingClientRect()
  //
  //   if (elementPosition.top >= 0 && elementPosition.top <= window.innerHeight) {
  //     this.setState({
  //       imageVisible: true
  //     })
  //   } else {
  //     this.setState({
  //       imageVisible: false
  //     })
  //   }
  // }

  // componentWillReceiveProps (newProps) {
  //   const {scrollTop: newScrollTop} = newProps
  //   const {scrollTop} = this.props
  //
  //   if (newScrollTop !== scrollTop) {
  //     const elementPosition = this._element.getBoundingClientRect()
  //     if (elementPosition.top >= -200 && elementPosition.top <= window.innerHeight + 200) {
  //       this.setState({
  //         imageVisible: true
  //       })
  //     } else {
  //       this.setState({
  //         imageVisible: false
  //       })
  //     }
  //   }
  // }

  render () {
    const {
      connectDragSource,
      isDraggingImages,
      img,
      toggleSelectImage,
      toggleCheckImage,
      isSelected,
      isChecked
    } = this.props

    const classes = classnames('GalleryImage', {
      'GalleryImage--collected': img.isCollected,
      'GalleryImage--selected': isSelected,
      'GalleryImage--checked': isChecked,
      'GalleryImage--dragged': isDraggingImages && isChecked
    })

    return connectDragSource(
      <div
        ref={el => { this._element = el }}
        className={classes}>
        <div
          className="GalleryImage__body">
          {this.state.imageVisible
            ? <div
              className="GI-image">
              <img
                onClick={toggleSelectImage}
                className="GI-image__thumb"
                src={img.thumbSrc} />

              <div
                className="GI-image__checkbox">
                <Checkbox
                  onClick={toggleCheckImage}
                  checked={isChecked} />
              </div>
            </div>
            : <div
              className="GI-dummy" />
          }
        </div>
      </div>
    )
  }
}

export default compose(
  connect(
    (state, ownProps) => {
      const {img} = ownProps

      return {
        scrollTop: state.ui.scrollTop,
        isDraggingImages: state.ui.isDraggingImages,
        isSelected: state.selected.imageId === img._id,
        isChecked: state.checked.images[img._id]
      }
    },
    (dispatch, ownProps) => {
      const {img} = ownProps

      return {
        toggleCheckImage: () => {
          dispatch(toggleCheckImage(img._id))
        },
        toggleSelectImage: () => {
          dispatch(toggleSelectImage(img._id))
        },
        setDraggingImages: (value) => {
          dispatch(setDraggingImages(value))
        }
      }
    }
  ),
  DragSource(
    IMAGE,
    {
      beginDrag (props) {
        if (!props.isChecked) {
          props.toggleCheckImage()
        }
        props.setDraggingImages(true)
        return {}
      },
      endDrag (props) {
        props.setDraggingImages(false)
        return {}
      }
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview()
    }
  ))
)(GalleryImage)
