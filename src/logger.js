export const logStartApp = (
  userId
) => {
  fetch(`${SERVER_URL}/log/${userId}/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: {message: 'started app'}
    })
  })
}

export const logSelectedDay = (
  userId,
  day
) => {
  fetch(`${SERVER_URL}/log/${userId}/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: {message: `selected day: ${day}`}
    })
  })
}

export const logSelectedCollection = (
  userId,
  collectionName
) => {
  fetch(`${SERVER_URL}/log/${userId}/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: {message: `selected collection: ${collectionName}`}
    })
  })
}

export const logSelectedImage = (
  userId,
  imageId
) => {
  fetch(`${SERVER_URL}/log/${userId}/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: {message: `selected image: ${imageId}`}
    })
  })
}

export const logWidthRange = (
  userId,
  widthRange
) => {
  fetch(`${SERVER_URL}/log/${userId}/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: {message: `width range: ${widthRange[0]} - ${widthRange[1]}`}
    })
  })
}

export const logHeightRange = (
  userId,
  heightRange
) => {
  fetch(`${SERVER_URL}/log/${userId}/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: {message: `height range: ${heightRange[0]} - ${heightRange[1]}`}
    })
  })
}

export const logCheckedQueries = (
  userId,
  queries
) => {
  fetch(`${SERVER_URL}/log/${userId}/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: {message: `checked queries: ${queries}`}
    })
  })
}

export const logCheckedColors = (
  userId,
  colors
) => {
  fetch(`${SERVER_URL}/log/${userId}/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: {message: `checked colors: ${colors}`}
    })
  })
}

export const logCreateCollection = (
  userId
) => {
  fetch(`${SERVER_URL}/log/${userId}/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: {message: 'create new collection'}
    })
  })
}

export const logEditCollection = (
  userId,
  collectionName
) => {
  fetch(`${SERVER_URL}/log/${userId}/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: {message: `edit collection ${collectionName}`}
    })
  })
}

export const logDeleteCollection = (
  userId,
  collectionName
) => {
  fetch(`${SERVER_URL}/log/${userId}/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: {message: `delete collection ${collectionName}`}
    })
  })
}

export const logAddImagesToCollection = (
  userId,
  images,
  collection
) => {
  fetch(`${SERVER_URL}/log/${userId}/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: {message: `add images to collection ${collection}: ${images}`}
    })
  })
}

export const logRemoveImagesFromCollection = (
  userId,
  images,
  collection
) => {
  fetch(`${SERVER_URL}/log/${userId}/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: {message: `remove images from collection ${collection.name}: ${images.map(i => i._id)}`}
    })
  })
}

export const logDeleteImages = (
  userId,
  imageIds
) => {
  fetch(`${SERVER_URL}/log/${userId}/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: {message: `delete image ${imageIds}`}
    })
  })
}
