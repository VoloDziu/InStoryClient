import {SET_COLLECTION_ARRANGEMENT} from './configActions'

const configReducer = (
  state = {
    collectionArrangement: localStorage.getItem('InStoryConfig-collectionArrangement')
  },
  action
) => {
  switch (action.type) {
    case SET_COLLECTION_ARRANGEMENT:
      return Object.assign({}, state, {
        collectionArrangement: action.arrangement
      })
    default:
      return state
  }
}

export default configReducer
