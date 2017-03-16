import {
  REQUEST_HISTORY,
  RECEIVE_HISTORY,
  UPDATE_HISTORY,
  UPDATE_IMAGE_DIMENSIONS
} from './historyActions'

const historyReducer = (
  state = {
    history: null,
    isFetching: false,
    isUpdating: false,
    maxWidth: 0,
    maxHeight: 0
  },
  action
) => {
  switch (action.type) {
    case REQUEST_HISTORY:
      return Object.assign({}, state, {
        isFetching: true
      })
    case UPDATE_IMAGE_DIMENSIONS:
      return Object.assign({}, state, {
        maxHeight: action.maxHeight,
        maxWidth: action.maxWidth
      })
    case RECEIVE_HISTORY:
      return Object.assign({}, state, {
        isFetching: false,
        isUpdating: false,
        history: action.history
      })
    case UPDATE_HISTORY:
      return Object.assign({}, state, {
        isUpdating: true
      })
    default:
      return state
  }
}

export default historyReducer
