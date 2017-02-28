import { combineReducers } from 'redux'
import user from './userReducer'
import config from './configReducer'
import history from './historyReducer'
import ui from './uiReducer'

const rootReducer = combineReducers({
  user,
  config,
  history,
  ui
})

export default rootReducer
