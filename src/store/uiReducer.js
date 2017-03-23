import {
  SET_FILTER,
  SET_DRAGGING_IMAGES,
  SET_SCROLL_TOP
} from './uiActions'

const uiReducer = (
  state = {
    isDraggingImages: false,
    selectedFilter: 'history',
    scrollTop: 0
  },
  action
) => {
  switch (action.type) {
    case SET_SCROLL_TOP:
      return Object.assign({}, state, {
        scrollTop: action.value
      })
    case SET_DRAGGING_IMAGES:
      return Object.assign({}, state, {
        isDraggingImages: action.value
      })
    case SET_FILTER:
      return Object.assign({}, state, {
        selectedFilter: action.filter
      })
    default:
      return state
  }
}

export default uiReducer
