import {TOGGLE_SELECT_QUERY, TOGGLE_SELECT_QUERIES, TOGGLE_SELECT_IMAGE} from './uiActions'

const includesAll = (arr, objects) => {
  for (let obj of objects) {
    if (arr.indexOf(obj) === -1) {
      return false
    }
  }

  return true
}

const uiReducer = (
  state = {
    selectedQueries: [],
    selectedImage: null,
    selectedDate: null
  },
  action
) => {
  switch (action.type) {
    case TOGGLE_SELECT_QUERY:
      const queryIndex = state.selectedQueries.indexOf(action.query)

      if (queryIndex === -1) {
        return Object.assign({}, state, {
          selectedQueries: [...state.selectedQueries, action.query]
        })
      } else {
        return Object.assign({}, state, {
          selectedQueries: [...state.selectedQueries.slice(0, queryIndex),
                            ...state.selectedQueries.slice(queryIndex + 1)]
        })
      }
    case TOGGLE_SELECT_QUERIES:
      let newState = Object.assign({}, state)

      if (includesAll(newState.selectedQueries, action.queries)) {
        newState.selectedQueries = newState.selectedQueries.filter(q =>
          action.queries.indexOf(q) === -1
        )
      } else {
        newState.selectedQueries = [...newState.selectedQueries,
                                    ...action.queries]
      }

      return newState
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
