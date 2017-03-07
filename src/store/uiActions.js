export const TOGGLE_SELECT_QUERY = 'TOGGLE_SELECT_QUERY'
export const TOGGLE_SELECT_DATE = 'TOGGLE_SELECT_DATE'
export const TOGGLE_SELECT_IMAGE = 'TOGGLE_SELECT_IMAGE'
export const TOGGLE_SELECT_COLLECTION = 'TOGGLE_SELECT_COLLECTION'
export const SET_DRAGGED_IMAGE = 'DRAGGED_IMAGE'

export const steDragImage = (
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

export const toggleSelectImage = (
  image
) => {
  return {
    type: TOGGLE_SELECT_IMAGE,
    image
  }
}
