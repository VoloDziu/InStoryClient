export const FETCH_HISTORY = 'FETCH_HISTORY'
export const RECEIVE_HISTORY = 'RECEIVE_HISTORY'
export const UPDATE_HISTORY = 'UPDATE_HISTORY'

const requestHistory = () => {
  return {
    type: FETCH_HISTORY
  }
}

const receiveHistory = ({
  images,
  queries,
  collections
}) => {
  return {
    type: RECEIVE_HISTORY,
    images,
    queries,
    collections
  }
}

const updateHistory = () => {
  return {
    type: UPDATE_HISTORY
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
        dispatch(receiveHistory(json.data.history))
      } else {
        console.error(json.data)
      }
    })
  }
}

export const deleteQueries = (
  userId,
  queryIds,
  callback
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
          dispatch(receiveHistory(json.data.history))
          callback()
        } else {
          console.error(json.data)
        }
      })
  }
}

export const deleteImages = (
  userId,
  imageIds,
  callback
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
          dispatch(receiveHistory(json.data.history))
          callback()
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
  collectionIds,
  callback
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
          dispatch(receiveHistory(json.data.history))
          callback()
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
  remove = false,
  callback
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
          dispatch(receiveHistory(json.data.history))
          if (callback) {
            callback()
          }
        } else {
          console.error(json.data)
        }
      })
  }
}
