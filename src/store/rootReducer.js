import { combineReducers } from 'redux'
import user from './userReducer'
import history from './historyReducer'
import ui from './uiReducer'
import {
  selected,
  checked,
  image
} from './filterReducer'

const rootReducer = combineReducers({
  user,
  history,
  selected,
  checked,
  ui,
  image
})

export default rootReducer
