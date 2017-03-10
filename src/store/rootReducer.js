import { combineReducers } from 'redux'
import user from './userReducer'
import history from './historyReducer'
import ui from './uiReducer'

const rootReducer = combineReducers({
  user,
  history,
  ui
})

export default rootReducer
