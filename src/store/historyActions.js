export const REQUEST_HISTORY = 'REQUEST_HISTORY'
export const RECEIVE_HISTORY = 'RECEIVE_HISTORY'

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

export const fetchHistory = (
  userId
) => {
  return dispatch => {
    dispatch(requestHistory())

    fetch(`${SERVER_URL}/histories/${userId}`, {
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
