import {REQUEST_HISTORY, RECEIVE_HISTORY, UPDATE_HISTORY} from './historyActions'

const historyReducer = (
  state = {
    history: null,
    isFetching: false,
    isUpdating: false
  },
  action
) => {
  switch (action.type) {
    case REQUEST_HISTORY:
      return Object.assign({}, state, {
        isFetching: true
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
