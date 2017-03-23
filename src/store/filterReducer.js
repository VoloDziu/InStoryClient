import {
  TOGGLE_SELECT_IMAGE,
  TOGGLE_SELECT_DATE,
  TOGGLE_SELECT_COLLECTION,
  RESET_SELECTED_IMAGE,
  RESET_SELECTED_COLLECTION,
  TOGGLE_CHECK_IMAGE,
  TOGGLE_CHECK_QUERY,
  UNCHECK_OTHER_QUERIES,
  UNCHECK_OTHER_IMAGES,
  UNCHECK_ALL_QUERIES,
  UNCHECK_ALL_IMAGES,
  UNCHECK_IMAGES,
  SET_WIDTH,
  SET_HEIGHT
} from './filterActions'

const toggle = (
  obj,
  key
) => {
  const res = Object.assign({}, obj)

  if (res[key]) {
    delete res[key]
  } else {
    res[key] = true
  }

  return res
}

const removeOthers = (
  obj,
  keys
) => {
  const res = Object.assign({}, obj)

  for (let key of Object.keys(res)) {
    if (keys.indexOf(key) === -1) {
      delete res[key]
    }
  }

  return res
}

const removeAll = (
  obj,
  keys
) => {
  const res = Object.assign({}, obj)

  for (let key of keys) {
    if (res[key]) {
      delete res[key]
    }
  }

  return res
}

export const selected = (
  state = {
    imageId: null,
    date: null,
    collectionId: null
  },
  action
) => {
  switch (action.type) {
    case TOGGLE_SELECT_IMAGE:
      if (action.imageId === state.imageId) {
        return Object.assign({}, state, {
          imageId: null
        })
      } else {
        return Object.assign({}, state, {
          imageId: action.imageId
        })
      }
    case TOGGLE_SELECT_DATE:
      if (action.date === state.date) {
        return Object.assign({}, state, {
          date: null
        })
      } else {
        return Object.assign({}, state, {
          date: action.date
        })
      }
    case TOGGLE_SELECT_COLLECTION:
      if (action.collectionId === state.collectionId) {
        return Object.assign({}, state, {
          collectionId: null
        })
      } else {
        return Object.assign({}, state, {
          collectionId: action.collectionId
        })
      }
    case RESET_SELECTED_IMAGE:
      return Object.assign({}, state, {
        imageId: null
      })
    case RESET_SELECTED_COLLECTION:
      return Object.assign({}, state, {
        collectionId: null
      })
    default:
      return state
  }
}

export const checked = (
  state = {
    images: {},
    queries: {}
  },
  action
) => {
  switch (action.type) {
    case TOGGLE_CHECK_IMAGE:
      return Object.assign({}, state, {
        images: toggle(state.images, action.imageId)
      })
    case TOGGLE_CHECK_QUERY:
      return Object.assign({}, state, {
        queries: toggle(state.queries, action.queryId)
      })
    case UNCHECK_OTHER_QUERIES:
      return Object.assign({}, state, {
        queries: removeOthers(state.queries, action.queryIds)
      })
    case UNCHECK_OTHER_IMAGES:
      return Object.assign({}, state, {
        images: removeOthers(state.images, action.imageIds)
      })
    case UNCHECK_ALL_QUERIES:
      return Object.assign({}, state, {
        queries: {}
      })
    case UNCHECK_ALL_IMAGES:
      return Object.assign({}, state, {
        images: {}
      })
    case UNCHECK_IMAGES:
      return Object.assign({}, state, {
        images: removeAll(state.images, action.imageIds)
      })
    default:
      return state
  }
}

export const image = (
  state = {
    widthRange: [],
    heightRange: []
  },
  action
) => {
  switch (action.type) {
    case SET_WIDTH:
      return Object.assign({}, state, {
        widthRange: [...action.range]
      })
    case SET_HEIGHT:
      return Object.assign({}, state, {
        heightRange: [...action.range]
      })
    default:
      return state
  }
}
