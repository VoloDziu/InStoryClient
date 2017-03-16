import moment from 'moment'

import constants from '../constants'

import {
  TOGGLE_CHECK_QUERY,
  TOGGLE_SELECT_DATE,
  TOGGLE_SELECT_IMAGE,
  TOGGLE_CHECK_IMAGE,
  TOGGLE_CHECK_COLLECTION,
  RESET_CHECKED_COLLECTIONS,
  RESET_SELECTED_QUERIES,
  RESET_CHECKED_IMAGES,
  SET_FILTER,
  SET_WIDTH,
  SET_HEIGHT,
  SET_DRAGGING_IMAGES
} from './uiActions'

const uiReducer = (
  state = {
    isDraggingImages: false,
    selectedFilter: 'history',
    checkedQueries: [],
    selectedDate: null,
    selectedImage: null,
    checkedImages: [],
    checkedCollections: [],
    widthRange: [],
    heightRange: []
  },
  action
) => {
  switch (action.type) {
    case SET_DRAGGING_IMAGES:
      return Object.assign({}, state, {
        isDraggingImages: action.value
      })
    case SET_WIDTH:
      return Object.assign({}, state, {
        widthRange: [...action.range]
      })
    case SET_HEIGHT:
      return Object.assign({}, state, {
        heightRange: [...action.range]
      })
    case SET_FILTER:
      return Object.assign({}, state, {
        selectedFilter: action.filter
      })
    case TOGGLE_CHECK_QUERY:
      const queryIndex = state.checkedQueries.indexOf(action.query._id)

      if (queryIndex === -1) {
        if (action.forceValue !== false) {
          return Object.assign({}, state, {
            checkedQueries: [...state.checkedQueries, action.query._id]
          })
        }
      } else {
        if (action.forceValue !== true) {
          return Object.assign({}, state, {
            checkedQueries: [...state.checkedQueries.slice(0, queryIndex),
              ...state.checkedQueries.slice(queryIndex + 1)]
          })
        }
      }
      return state
    case RESET_SELECTED_QUERIES:
      return Object.assign({}, state, {
        checkedQueries: []
      })
    case RESET_CHECKED_IMAGES:
      return Object.assign({}, state, {
        checkedImages: []
      })
    case RESET_CHECKED_COLLECTIONS:
      return Object.assign({}, state, {
        checkedCollections: []
      })
    case TOGGLE_SELECT_DATE:
      if (state.selectedDate === action.date) {
        return Object.assign({}, state, {
          selectedDate: null
        })
      } else {
        return Object.assign({}, state, {
          selectedDate: action.date,
          checkedQueries: state.checkedQueries.filter(q => moment(q.timestamp).format(constants.TIME_FORMAT) === action.date)
        })
      }
    case TOGGLE_SELECT_IMAGE:
      if (state.selectedImage && action.image._id === state.selectedImage._id) {
        return Object.assign({}, state, {
          selectedImage: null
        })
      } else {
        return Object.assign({}, state, {
          selectedImage: action.image
        })
      }
    case TOGGLE_CHECK_IMAGE:
      const imageIndex = state.checkedImages.indexOf(action.image._id)

      if (imageIndex === -1) {
        return Object.assign({}, state, {
          checkedImages: [...state.checkedImages, action.image._id]
        })
      } else {
        return Object.assign({}, state, {
          checkedImages: [...state.checkedImages.slice(0, imageIndex),
            ...state.checkedImages.slice(imageIndex + 1)]
        })
      }
    case TOGGLE_CHECK_COLLECTION:
      const collectionIndex = state.checkedCollections.indexOf(action.collection._id)

      if (collectionIndex === -1) {
        return Object.assign({}, state, {
          // checkedCollections: [...state.checkedCollections, action.collection._id]
          checkedCollections: [action.collection._id]
        })
      } else {
        return Object.assign({}, state, {
          // checkedCollections: [...state.checkedCollections.slice(0, collectionIndex),
          //   ...state.checkedCollections.slice(collectionIndex + 1)]
          checkedCollections: []
        })
      }
    default:
      return state
  }
}

export default uiReducer
