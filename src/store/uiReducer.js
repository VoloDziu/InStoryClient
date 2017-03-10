import moment from 'moment'

import constants from '../constants'

import {
  TOGGLE_SELECT_QUERY,
  TOGGLE_SELECT_DATE,
  TOGGLE_SELECT_IMAGE,
  TOGGLE_CHECK_IMAGE,
  TOGGLE_SELECT_COLLECTION,
  RESET_SELECTED_QUERIES,
  RESET_CHECKED_IMAGES,
  SET_FILTER
} from './uiActions'

const uiReducer = (
  state = {
    selectedFilter: 'history',
    selectedQueries: [],
    selectedDate: null,
    selectedImage: null,
    checkedImages: [],
    selectedCollection: null
  },
  action
) => {
  switch (action.type) {
    case SET_FILTER:
      return Object.assign({}, state, {
        selectedFilter: action.filter
      })
    case TOGGLE_SELECT_QUERY:
      const queryIndex = state.selectedQueries.indexOf(action.query._id)

      if (queryIndex === -1) {
        if (action.forceValue !== false) {
          return Object.assign({}, state, {
            selectedQueries: [...state.selectedQueries, action.query._id]
          })
        }
      } else {
        if (action.forceValue !== true) {
          return Object.assign({}, state, {
            selectedQueries: [...state.selectedQueries.slice(0, queryIndex),
              ...state.selectedQueries.slice(queryIndex + 1)]
          })
        }
      }
      return state
    case RESET_SELECTED_QUERIES:
      return Object.assign({}, state, {
        selectedQueries: []
      })
    case RESET_CHECKED_IMAGES:
      return Object.assign({}, state, {
        checkedImages: []
      })
    case TOGGLE_SELECT_DATE:
      if (state.selectedDate === action.date) {
        return Object.assign({}, state, {
          selectedDate: null
        })
      } else {
        return Object.assign({}, state, {
          selectedDate: action.date,
          selectedQueries: state.selectedQueries.filter(q => moment(q.timestamp).format(constants.TIME_FORMAT) === action.date)
        })
      }
    case TOGGLE_SELECT_COLLECTION:
      if (state.selectedCollection && action.collection === state.selectedCollection) {
        return Object.assign({}, state, {
          selectedCollection: null
        })
      } else {
        return Object.assign({}, state, {
          selectedCollection: action.collection
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
    default:
      return state
  }
}

export default uiReducer
