export const logStartApp = (
  userId
) => {
  fetch(`${SERVER_URL}/log/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: 'started app',
      userId
    })
  })
}

export const logSelectedDay = (
  userId,
  day
) => {
  fetch(`${SERVER_URL}/log/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: `selected day: ${day}`,
      userId
    })
  })
}

export const logSelectedCollection = (
  userId,
  collectionName
) => {
  fetch(`${SERVER_URL}/log/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: `selected collection: ${collectionName}`,
      userId
    })
  })
}

export const logSelectedImage = (
  userId,
  imageId
) => {
  fetch(`${SERVER_URL}/log/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: `selected image: ${imageId}`,
      userId
    })
  })
}

export const logWidthRange = (
  userId,
  widthRange
) => {
  fetch(`${SERVER_URL}/log/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: `width range: ${widthRange[0]} - ${widthRange[1]}`,
      userId
    })
  })
}

export const logHeightRange = (
  userId,
  heightRange
) => {
  fetch(`${SERVER_URL}/log/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: `height range: ${heightRange[0]} - ${heightRange[1]}`,
      userId
    })
  })
}

export const logCheckedQueries = (
  userId,
  queries
) => {
  fetch(`${SERVER_URL}/log/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: `checked queries: ${queries}`,
      userId
    })
  })
}

export const logCheckedColors = (
  userId,
  colors
) => {
  fetch(`${SERVER_URL}/log/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: `checked colors: ${colors}`,
      userId
    })
  })
}

export const logCreateCollection = (
  userId
) => {
  fetch(`${SERVER_URL}/log/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: 'create new collection',
      userId
    })
  })
}

export const logEditCollection = (
  userId,
  collectionName
) => {
  fetch(`${SERVER_URL}/log/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: `edit collection ${collectionName}`,
      userId
    })
  })
}

export const logDeleteCollection = (
  userId,
  collectionName
) => {
  fetch(`${SERVER_URL}/log/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: `delete collection ${collectionName}`,
      userId
    })
  })
}

export const logAddImagesToCollection = (
  userId,
  images,
  collection
) => {
  fetch(`${SERVER_URL}/log/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: `add images to collection ${collection}: ${images}`,
      userId
    })
  })
}

export const logRemoveImagesFromCollection = (
  userId,
  images,
  collection
) => {
  fetch(`${SERVER_URL}/log/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: `remove images from collection ${collection.name}: ${images.map(i => i._id)}`,
      userId
    })
  })
}

export const logDeleteImages = (
  userId,
  imageIds
) => {
  fetch(`${SERVER_URL}/log/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      log: `delete image ${imageIds}`,
      userId
    })
  })
}
