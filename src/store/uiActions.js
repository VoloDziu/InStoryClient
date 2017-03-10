export const SET_FILTER = 'SET_FILTER'

export const TOGGLE_SELECT_QUERY = 'TOGGLE_SELECT_QUERY'
export const RESET_SELECTED_QUERIES = 'RESET_SELECTED_QUERIES'
export const TOGGLE_SELECT_DATE = 'TOGGLE_SELECT_DATE'
export const TOGGLE_SELECT_IMAGE = 'TOGGLE_SELECT_IMAGE'
export const TOGGLE_CHECK_IMAGE = 'TOGGLE_CHECK_IMAGE'
export const RESET_CHECKED_IMAGES = 'RESET_CHECKED_IMAGES'
export const TOGGLE_SELECT_COLLECTION = 'TOGGLE_SELECT_COLLECTION'
export const SET_DRAGGED_IMAGE = 'DRAGGED_IMAGE'

export const setFilter = (
  filter
) => {
  return {
    type: SET_FILTER,
    filter
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

export const toggleSelectCollection = (
  collection
) => {
  return {
    type: TOGGLE_SELECT_COLLECTION,
    collection
  }
}

export const toggleSelectDate = (
  date
) => {
  return {
    type: TOGGLE_SELECT_DATE,
    date
  }
}

export const toggleSelectQuery = (
  query,
  forceValue = null
) => {
  return {
    type: TOGGLE_SELECT_QUERY,
    query,
    forceValue
  }
}

export const resetSelectedQueries = () => {
  return {
    type: RESET_SELECTED_QUERIES
  }
}

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
