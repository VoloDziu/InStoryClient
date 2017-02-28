import {REQUEST_USER, RECEIVE_USER} from './userActions'

const userReducer = (
  state = {
    id: null,
    isFetching: true
  },
  action
) => {
  switch (action.type) {
    case REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_USER:
      return Object.assign({}, state, {
        isFetching: false,
        id: action.userId
      })
    default:
      return state
  }
}

export default userReducer
