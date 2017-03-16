import {
  setHeight,
  setWidth,
  resetcheckedQueries,
  resetCheckedImages,
  resetCheckedCollections
} from './uiActions'

export const REQUEST_HISTORY = 'REQUEST_HISTORY'
export const RECEIVE_HISTORY = 'RECEIVE_HISTORY'
export const UPDATE_HISTORY = 'UPDATE_HISTORY'
export const UPDATE_IMAGE_DIMENSIONS = 'UPDATE_IMAGE_DIMENSIONS'

const requestHistory = () => {
  return {
    type: REQUEST_HISTORY
  }
}

const receiveHistory = (
  history
) => {
  return {
    type: RECEIVE_HISTORY,
    history
  }
}

const updateHistory = () => {
  return {
    type: UPDATE_HISTORY
  }
}

const updateImageDimensions = (
  maxHeight,
  maxWidth
) => {
  return {
    type: UPDATE_IMAGE_DIMENSIONS,
    maxHeight,
    maxWidth
  }
}

const postprocessHistory = (
  history
) => {
  const queryIdMap = {}
  const collectionIdMap = {}

  let maxHeight = 0
  let maxWidth = 0

  for (let collection of history.collections) {
    collection.imagesCount = 0
    collectionIdMap[collection._id] = collection
  }

  for (let query of history.queries) {
    query.imagesCount = 0
    queryIdMap[query._id] = query
  }

  for (let image of history.images) {
    if (queryIdMap[image.queryId]) {
      queryIdMap[image.queryId].imagesCount ++
    }

    for (let collectionId of image.collectionIds) {
      if (collectionIdMap[collectionId]) {
        collectionIdMap[collectionId].imagesCount ++
      }
    }

    if (image.height && image.height > maxHeight) {
      maxHeight = image.height
    }

    if (image.width && image.width > maxWidth) {
      maxWidth = image.width
    }
  }

  return {
    history,
    maxWidth,
    maxHeight
  }
}

export const fetchHistory = (
  userId
) => {
  return dispatch => {
    dispatch(requestHistory())

    fetch(`${SERVER_URL}/histories/${userId}/`, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        const {
          history,
          maxHeight,
          maxWidth
        } = postprocessHistory(json.data.history)

        dispatch(receiveHistory(history))
        dispatch(updateImageDimensions(maxHeight, maxWidth))
        dispatch(setHeight([0, maxHeight]))
        dispatch(setWidth([0, maxWidth]))
      } else {
        console.error(json.data)
      }
    })
  }
}

export const deleteQueries = (
  userId,
  queryIds
) => {
  return dispatch => {
    dispatch(updateHistory())

    fetch(`${SERVER_URL}/histories/${userId}/queries/`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        queryIds
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          const {
            history,
            maxHeight,
            maxWidth
          } = postprocessHistory(json.data.history)

          dispatch(resetcheckedQueries())
          dispatch(receiveHistory(history))
          dispatch(updateImageDimensions(maxHeight, maxWidth))
        } else {
          console.error(json.data)
        }
      })
  }
}

export const deleteImages = (
  userId,
  imageIds
) => {
  return dispatch => {
    dispatch(updateHistory())

    fetch(`${SERVER_URL}/histories/${userId}/images/`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imageIds
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          const {
            history,
            maxHeight,
            maxWidth
          } = postprocessHistory(json.data.history)

          dispatch(resetCheckedImages())
          dispatch(receiveHistory(history))
          dispatch(updateImageDimensions(maxHeight, maxWidth))
        } else {
          console.error(json.data)
        }
      })
  }
}

export const updateCollection = (
  userId,
  collectionId,
  collection,
  callback
) => {
  return dispatch => {
    dispatch(updateHistory())

    fetch(`${SERVER_URL}/histories/${userId}/collections/${collectionId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        collection
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          dispatch(receiveHistory(json.data.history))
          callback()
        } else {
          console.error(json.data)
        }
      })
  }
}

export const deleteCollections = (
  userId,
  collectionIds
) => {
  return dispatch => {
    dispatch(updateHistory())

    fetch(`${SERVER_URL}/histories/${userId}/collections/`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        collectionIds
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          const {
            history
          } = postprocessHistory(json.data.history)

          dispatch(resetCheckedCollections())
          dispatch(receiveHistory(history))
        } else {
          console.error(json.data)
        }
      })
  }
}

export const createCollection = (
  userId
) => {
  return dispatch => {
    dispatch(updateHistory())

    fetch(`${SERVER_URL}/histories/${userId}/collections/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        collection: {
          name: 'New collection'
        }
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          dispatch(receiveHistory(json.data.history))
        } else {
          console.error(json.data)
        }
      })
  }
}

export const addImagesToCollection = (
  userId,
  collectionId,
  imageIds,
  remove = false
) => {
  return dispatch => {
    dispatch(updateHistory())

    fetch(`${SERVER_URL}/histories/${userId}/collections/${collectionId}/images/`, {
      method: remove ? 'DELETE' : 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imageIds
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          const {
            history
          } = postprocessHistory(json.data.history)

          dispatch(receiveHistory(history))
        } else {
          console.error(json.data)
        }
      })
  }
}
