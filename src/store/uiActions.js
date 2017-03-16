export const SET_DRAGGING_IMAGES = 'SET_DRAGGING_IMAGES'

export const setDraggingImages = (
  value
) => {
  return {
    type: SET_DRAGGING_IMAGES,
    value
  }
}

export const SET_FILTER = 'SET_FILTER'

export const setFilter = (
  filter
) => {
  return {
    type: SET_FILTER,
    filter
  }
}

export const RESET_CHECKED_COLLECTIONS = 'RESET_CHECKED_COLLECTIONS'
export const TOGGLE_CHECK_COLLECTION = 'TOGGLE_CHECK_COLLECTION'
export const TOGGLE_SELECT_COLLECTION = 'TOGGLE_SELECT_COLLECTION'

export const resetCheckedCollections = () => {
  return {
    type: RESET_CHECKED_COLLECTIONS
  }
}

export const toggleCheckCollection = (
  collection
) => {
  return {
    type: TOGGLE_CHECK_COLLECTION,
    collection
  }
}

export const toggleSelectCollection = (
  collection
) => {
  return {
    type: TOGGLE_SELECT_COLLECTION,
    collection
  }
}

export const TOGGLE_CHECK_QUERY = 'TOGGLE_CHECK_QUERY'
export const RESET_SELECTED_QUERIES = 'RESET_SELECTED_QUERIES'

export const toggleSelectQuery = (
  query,
  forceValue = null
) => {
  return {
    type: TOGGLE_CHECK_QUERY,
    query,
    forceValue
  }
}

export const resetcheckedQueries = () => {
  return {
    type: RESET_SELECTED_QUERIES
  }
}

export const TOGGLE_SELECT_DATE = 'TOGGLE_SELECT_DATE'

export const toggleSelectDate = (
  date
) => {
  return {
    type: TOGGLE_SELECT_DATE,
    date
  }
}

export const TOGGLE_SELECT_IMAGE = 'TOGGLE_SELECT_IMAGE'
export const TOGGLE_CHECK_IMAGE = 'TOGGLE_CHECK_IMAGE'
export const RESET_CHECKED_IMAGES = 'RESET_CHECKED_IMAGES'
export const SET_DRAGGED_IMAGE = 'DRAGGED_IMAGE'

export const toggleSelectImage = (
  image
) => {
  return {
    type: TOGGLE_SELECT_IMAGE,
    image
  }
}

export const toggleCheckImage = (
  image
) => {
  return {
    type: TOGGLE_CHECK_IMAGE,
    image
  }
}

export const resetCheckedImages = () => {
  return {
    type: RESET_CHECKED_IMAGES
  }
}

export const setDragImage = (
  image
) => {
  return {
    type: SET_DRAGGED_IMAGE,
    image
  }
}

export const SET_HEIGHT = 'SET_HEIGHT'
export const SET_WIDTH = 'SET_WIDTH'

export const setHeight = (
  range
) => {
  return {
    type: SET_HEIGHT,
    range
  }
}

export const setWidth = (
  range
) => {
  return {
    type: SET_WIDTH,
    range
  }
}
