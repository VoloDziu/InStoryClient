export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'

const requestUser = () => {
  return {
    type: REQUEST_USER
  }
}

const receiveUser = (
  userId
) => {
  return {
    type: RECEIVE_USER,
    userId
  }
}

export const getUserId = (
  extensionId
) => {
  return dispatch => {
    dispatch(requestUser())

    console.log(extensionId)

    chrome.runtime.sendMessage(extensionId,
      {
        event: 'getInStoryUser'
      },
      response => {
        dispatch(receiveUser(response.userId))
      }
    )
  }
}

export const setUserId = (
  extensionId,
  userId
) => {
  return dispatch => {
    dispatch(requestUser())

    chrome.runtime.sendMessage(extensionId,
      {
        event: 'setInStoryUser',
        userId
      },
      response => {
        dispatch(receiveUser(response.userId))
      }
    )
  }
}
