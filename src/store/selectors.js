import {createSelector} from 'reselect'
import {toDay} from '../constants'

const getQueries = (state) => state.history.queries
const getImages = (state) => state.history.images

const getQueryImages = (state, props) => state.history.images.filter(img => img.queryId === props.query._id)

const getSelectedDay = (state) => state.selected.day

const getDays = createSelector(
  getQueries,
  (queries) => {
    const days = {}

    for (let query of queries) {
      days[toDay(query.timestamp)] = true
    }

    return Object.keys(days)
  }
)

export const getVisibleQueries = createSelector(
  [getSelectedDay, getQueries],
  (day, queries) => queries.filter(q => toDay(q.timestamp) === day)
)

export const makeGetQueryImagesCount = (
) => {
  return createSelector(
    getQueryImages,
    (images) => images.length
  )
}
