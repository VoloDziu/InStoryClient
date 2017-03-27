import React from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import DayPicker from 'react-day-picker'

import {
  toDate,
  toDay,
  intersect,
  getColorNames
} from '../../constants'
import {
  toggleSelectDay,
  resetSelectedImage,
  uncheckAllImages,
  uncheckAllQueriesExcept,
  uncheckAllQueries
} from '../../store/filterActions'

import './Calendar.css'

const Calendar = ({
  days,
  unavailableDays,
  selectedDay,
  toggleSelectDay,
  dayQueries
}) => {
  return (
    <div className="Calendar">
      <DayPicker
        enableOutsideDays
        modifiers={{
          highlighted: days.map(d => toDate(d)),
          selected: toDate(selectedDay),
          unavailable: unavailableDays.map(d => toDate(d))
        }}
        onDayClick={d => toggleSelectDay(toDay(d), selectedDay, dayQueries)} />
    </div>
  )
}

const getDays = createSelector(
  [
    (state) => state.history.images,
    (state) => state.selected.collectionId,
    (state) => state.checked.colors,
    (state) => state.image.widthRange,
    (state) => state.image.heightRange
  ],
  (images, selectedCollectionId, checkedColors, widthRange, heightRange) => {
    const days = {}
    const availableDays = {}
    const dayQueries = {}

    for (let image of images) {
      const imageDay = toDay(image.timestamp)

      if (
        (!selectedCollectionId || image.collectionIds.indexOf(selectedCollectionId) !== -1) &&
        (Object.keys(checkedColors).length === 0 || intersect(getColorNames(image.colors), Object.keys(checkedColors))) &&
        (widthRange.length === 0 || (image.width >= widthRange[0] && image.width <= widthRange[1])) &&
        (heightRange.length === 0 || (image.height >= heightRange[0] && image.height <= heightRange[1]))
      ) {
        availableDays[imageDay] = true

        if (!dayQueries[imageDay]) {
          dayQueries[imageDay] = {}
        }
        dayQueries[imageDay][image.queryId] = true
      }

      days[imageDay] = true
    }

    return {
      days: Object.keys(days),
      unavailableDays: Object.keys(days).filter(d => !availableDays[d]),
      dayQueries
    }
  }
)

export default connect(
  state => {
    const {
      days,
      unavailableDays,
      dayQueries
    } = getDays(state)

    return {
      days,
      unavailableDays,
      selectedDay: state.selected.day,
      checkedQueries: Object.keys(state.checked.queries),
      dayQueries
    }
  },
  dispatch => {
    return {
      toggleSelectDay: (day, selectedDay, dayQueries) => {
        console.log(day, selectedDay, dayQueries)
        dispatch(resetSelectedImage())
        dispatch(uncheckAllImages())

        if (day !== selectedDay) {
          if (dayQueries[day]) {
            dispatch(uncheckAllQueriesExcept(Object.keys(dayQueries[day])))
          } else {
            dispatch(uncheckAllQueries())
          }
        }

        dispatch(toggleSelectDay(day))
      }
    }
  }
)(Calendar)
