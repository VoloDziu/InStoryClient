import moment from 'moment'

import constants from '../constants'

import {
  TOGGLE_SELECT_QUERY,
  TOGGLE_SELECT_DATE,
  TOGGLE_SELECT_IMAGE,
  TOGGLE_SELECT_COLLECTION
} from './uiActions'

const uiReducer = (
  state = {
    selectedQueries: [],
    selectedDate: null,
    selectedImage: null,
    selectedCollection: null
  },
  action
) => {
  switch (action.type) {
    case TOGGLE_SELECT_QUERY:
      const queryIndex = state.selectedQueries.indexOf(action.query)

      if (queryIndex === -1) {
        if (action.forceValue !== false) {
          return Object.assign({}, state, {
            selectedQueries: [...state.selectedQueries, action.query]
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
    default:
      return state
  }
}

export default uiReducer
