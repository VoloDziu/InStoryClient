export const REQUEST_HISTORY = 'REQUEST_HISTORY'
export const RECEIVE_HISTORY = 'RECEIVE_HISTORY'
export const UPDATE_HISTORY = 'UPDATE_HISTORY'

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

export const deleteQuery = (
  userId,
  queryId
) => {
  return dispatch => {
    dispatch(updateHistory())

    fetch(`${SERVER_URL}/histories/${userId}/queries/${queryId}`, {
      method: 'DELETE',
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

export const deleteImage = (
  userId,
  imageId
) => {
  return dispatch => {
    dispatch(updateHistory())

    fetch(`${SERVER_URL}/histories/${userId}/images/${imageId}`, {
      method: 'DELETE',
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
          console.log(callback)
          callback()
        } else {
          console.error(json.data)
        }
      })
  }
}

export const deleteCollection = (
  userId,
  collectionId
) => {
  return dispatch => {
    dispatch(updateHistory())

    fetch(`${SERVER_URL}/histories/${userId}/collections/${collectionId}`, {
      method: 'DELETE',
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
