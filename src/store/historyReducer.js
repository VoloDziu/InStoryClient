import {REQUEST_HISTORY, RECEIVE_HISTORY} from './historyActions'

const historyReducer = (
  state = {
    history: null,
    isFetching: false
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
        history: action.history
      })
    default:
      return state
  }
}

export default historyReducer
