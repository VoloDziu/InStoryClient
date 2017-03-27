import {
  FETCH_HISTORY,
  RECEIVE_HISTORY,
  UPDATE_HISTORY
} from './historyActions'

const historyReducer = (
  state = {
    isFetching: true,
    isUpdating: false,
    dates: [],
    images: [],
    queries: [],
    collections: [],
    colors: [
      {
        id: 'orange',
        images: []
      },
      {
        id: 'yellow',
        images: []
      },
      {
        id: 'green',
        images: []
      },
      {
        id: 'turqoise',
        images: []
      },
      {
        id: 'aquamarine',
        images: []
      },
      {
        id: 'blue',
        images: []
      },
      {
        id: 'purple',
        images: []
      },
      {
        id: 'pink',
        images: []
      },
      {
        id: 'red',
        images: []
      },
      {
        id: 'grey',
        images: []
      },
      {
        id: 'black',
        images: []
      },
      {
        id: 'white',
        images: []
      }
    ],
    maxWidth: 0,
    maxHeight: 0
  },
  action
) => {
  switch (action.type) {
    case FETCH_HISTORY:
      return Object.assign({}, state, {
        isFetching: true
      })
    case UPDATE_HISTORY:
      return Object.assign({}, state, {
        isUpdating: true
      })
    case RECEIVE_HISTORY:
      return Object.assign({}, state, {
        isFetching: false,
        isUpdating: false,
        images: action.images,
        queries: action.queries,
        collections: action.collections
      })
    default:
      return state
  }
}

export default historyReducer
