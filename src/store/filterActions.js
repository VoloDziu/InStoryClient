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

export const TOGGLE_SELECT_IMAGE = 'TOGGLE_SELECT_IMAGE'
export const TOGGLE_SELECT_DAY = 'TOGGLE_SELECT_DAY'
export const TOGGLE_SELECT_COLLECTION = 'TOGGLE_SELECT_COLLECTION'
export const RESET_SELECTED_IMAGE = 'RESET_SELECTED_IMAGE'
export const RESET_SELECTED_COLLECTION = 'RESET_SELECTED_COLLECTION'

export const toggleSelectImage = (
  imageId
) => ({
  type: TOGGLE_SELECT_IMAGE,
  imageId
})

export const toggleSelectDay = (
  day
) => ({
  type: TOGGLE_SELECT_DAY,
  day
})

export const toggleSelectCollection = (
  collectionId
) => ({
  type: TOGGLE_SELECT_COLLECTION,
  collectionId
})

export const resetSelectedImage = (
) => ({
  type: RESET_SELECTED_IMAGE
})

export const resetSelectedCollection = (
) => ({
  type: RESET_SELECTED_COLLECTION
})

export const TOGGLE_CHECK_COLOR = 'TOGGLE_CHECK_COLOR'
export const TOGGLE_CHECK_IMAGE = 'TOGGLE_CHECK_IMAGE'
export const TOGGLE_CHECK_QUERY = 'TOGGLE_CHECK_QUERY'
export const UNCHECK_ALL_QUERIES = 'UNCHECK_ALL_QUERIES'
export const UNCHECK_ALL_QUERIES_EXCEPT = 'UNCHECK_ALL_QUERIES_EXCEPT'
export const UNCHECK_ALL_IMAGES = 'UNCHECK_ALL_IMAGES'
export const UNCHECK_IMAGES = 'UNCHECK_IMAGES'
export const UNCHECK_ALL_IMAGES_EXCEPT = 'UNCHECK_ALL_IMAGES_EXCEPT'
export const UNCHECK_ALL_COLORS = 'UNCHECK_ALL_COLORS'

export const uncheckAllColors = (
) => ({
  type: UNCHECK_ALL_COLORS
})

export const toggleCheckColor = (
  colorId
) => ({
  type: TOGGLE_CHECK_COLOR,
  colorId
})

export const toggleCheckImage = (
  imageId
) => ({
  type: TOGGLE_CHECK_IMAGE,
  imageId
})

export const toggleCheckQuery = (
  queryId
) => ({
  type: TOGGLE_CHECK_QUERY,
  queryId
})

export const uncheckAllQueries = (
) => ({
  type: UNCHECK_ALL_QUERIES
})

export const uncheckAllQueriesExcept = (
  queryIds
) => ({
  type: UNCHECK_ALL_QUERIES_EXCEPT,
  queryIds
})

export const uncheckAllImages = (
) => ({
  type: UNCHECK_ALL_IMAGES
})

export const uncheckAllImagesExcept = (
  imageIds
) => ({
  type: UNCHECK_ALL_IMAGES_EXCEPT,
  imageIds
})

export const uncheckImages = (
  imageIds
) => ({
  type: UNCHECK_IMAGES,
  imageIds
})
