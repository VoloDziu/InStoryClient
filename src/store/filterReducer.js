import {
  TOGGLE_SELECT_IMAGE,
  TOGGLE_SELECT_DAY,
  TOGGLE_SELECT_COLLECTION,
  RESET_SELECTED_IMAGE,
  RESET_SELECTED_COLLECTION,
  TOGGLE_CHECK_IMAGE,
  TOGGLE_CHECK_QUERY,
  TOGGLE_CHECK_COLOR,
  UNCHECK_ALL_QUERIES,
  UNCHECK_ALL_QUERIES_EXCEPT,
  UNCHECK_ALL_IMAGES,
  UNCHECK_IMAGES,
  UNCHECK_ALL_IMAGES_EXCEPT,
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

const removeAllExcept = (
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

export const selected = (
  state = {
    imageId: null,
    day: null,
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
    case TOGGLE_SELECT_DAY:
      if (action.day === state.day) {
        return Object.assign({}, state, {
          day: null
        })
      } else {
        return Object.assign({}, state, {
          day: action.day
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
    queries: {},
    colors: {}
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
    case UNCHECK_ALL_QUERIES:
      return Object.assign({}, state, {
        queries: {}
      })
    case UNCHECK_ALL_IMAGES:
      return Object.assign({}, state, {
        images: {}
      })
    case TOGGLE_CHECK_COLOR:
      return Object.assign({}, state, {
        colors: toggle(state.colors, action.colorId)
      })
    case UNCHECK_IMAGES:
      return Object.assign({}, state, {
        images: removeAll(state.images, action.imageIds)
      })
    case UNCHECK_ALL_QUERIES_EXCEPT:
      return Object.assign({}, state, {
        queries: removeAllExcept(state.queries, action.queryIds)
      })
    case UNCHECK_ALL_IMAGES_EXCEPT:
      return Object.assign({}, state, {
        images: removeAllExcept(state.images, action.imageIds)
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
