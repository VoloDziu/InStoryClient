import {toDay} from '../constants'
import {
  FETCH_HISTORY,
  RECEIVE_HISTORY,
  UPDATE_HISTORY
} from './historyActions'

const historyReducer = (
  state = {
    isFetching: true,
    isUpdating: false,
    dates: [],
    images: [],
    queries: [],
    collections: [],
    maxWidth: 0,
    maxHeight: 0
  },
  action
) => {
  switch (action.type) {
    case FETCH_HISTORY:
      return Object.assign({}, state, {
        isFetching: true
      })
    case UPDATE_HISTORY:
      return Object.assign({}, state, {
        isUpdating: true
      })
    case RECEIVE_HISTORY:
      const dates = []
      const images = []
      const queries = []
      const collections = []

      const dateIdMap = {}
      const queryIdMap = {}
      const collectionIdMap = {}
      const imageIdMap = {}

      let maxHeight = 0
      let maxWidth = 0

      for (let collection of action.collections) {
        const newCollection = Object.assign({}, collection, {
          images: []
        })
        collectionIdMap[collection._id] = newCollection
        collections.push(newCollection)
      }

      for (let query of action.queries) {
        const newQuery = Object.assign({}, query, {
          images: [],
          date: null
        })
        queryIdMap[query._id] = newQuery

        const queryDate = toDay(newQuery.timestamp)
        if (dateIdMap[queryDate]) {
          dateIdMap[queryDate].queries.push(newQuery)
          newQuery.date = dateIdMap[queryDate]
        } else {
          const newDate = {
            _id: queryDate,
            queries: [newQuery]
          }

          dates.push(newDate)
          dateIdMap[queryDate] = newDate
          newQuery.date = newDate
        }

        queries.push(newQuery)
      }

      for (let image of action.images) {
        const newImage = Object.assign({}, image, {
          query: queryIdMap[image.queryId],
          collections: []
        })

        for (let collectionId of newImage.collectionIds) {
          newImage.collections.push(collectionIdMap[collectionId])

          if (collectionIdMap[collectionId]) {
            collectionIdMap[collectionId].images.push(newImage)
          }
        }

        imageIdMap[newImage._id] = newImage

        if (queryIdMap[newImage.queryId]) {
          queryIdMap[newImage.queryId].images.push(newImage)
        }

        if (newImage.height && newImage.height > maxHeight) {
          maxHeight = newImage.height
        }

        if (newImage.width && newImage.width > maxWidth) {
          maxWidth = newImage.width
        }

        images.push(newImage)
      }

      return Object.assign({}, state, {
        isFetching: false,
        isUpdating: false,
        dates,
        images,
        queries,
        collections,
        maxWidth,
        maxHeight
      })
    default:
      return state
  }
}

export default historyReducer
