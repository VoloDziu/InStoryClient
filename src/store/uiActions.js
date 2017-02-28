export const TOGGLE_SELECT_QUERY = 'TOGGLE_SELECT_QUERY'
export const TOGGLE_SELECT_QUERIES = 'TOGGLE_SELECT_QUERIES'
export const TOGGLE_SELECT_IMAGE = 'TOGGLE_SELECT_IMAGE'

export const toggleSelectQueries = (
  queries
) => {
  return {
    type: TOGGLE_SELECT_QUERIES,
    queries
  }
}

export const toggleSelectQuery = (
  query
) => {
  return {
    type: TOGGLE_SELECT_QUERY,
    query
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
