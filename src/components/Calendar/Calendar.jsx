import React from 'react'
import {connect} from 'react-redux'
import DayPicker from 'react-day-picker'

import {
  toDate,
  toDay
} from '../../constants'
import {
  toggleSelectDate,
  uncheckOtherQueries,
  uncheckOtherImages,
  uncheckAllQueries,
  uncheckAllImages,
  resetSelectedImage
} from '../../store/filterActions'

import './Calendar.css'

const Calendar = ({
  dates,
  availableDates,
  selectedDate,
  toggleSelectDate
}) => {
  return (
    <div className="Calendar">
      <DayPicker
        enableOutsideDays
        modifiers={{
          highlighted: dates.map(d => toDate(d._id)),
          selected: toDate(selectedDate),
          unavailable: dates.filter(d => !availableDates[d._id]).map(d => toDate(d._id))
        }}
        onDayClick={d => toggleSelectDate(toDay(d), dates)} />
    </div>
  )
}

export default connect(
  state => {
    let collectionDates = null
    if (state.selected.collectionId) {
      const selectedCollection = state.history.collections.find(c => c._id === state.selected.collectionId)

      if (selectedCollection) {
        collectionDates = {}

        for (let img of selectedCollection.images) {
          collectionDates[toDay(img.timestamp)] = true
        }
      }
    }

    let availableDates = {}
    for (let date of state.history.dates) {
      if (!collectionDates || collectionDates[date._id]) {
        availableDates[date._id] = true
      }
    }

    return {
      availableDates,
      dates: state.history.dates,
      selectedDate: state.selected.date
    }
  },
  dispatch => ({
    toggleSelectDate: (date, dates) => {
      dispatch(resetSelectedImage())
      dispatch(toggleSelectDate(date))

      const targetDate = dates.find(d => d._id === date)
      if (targetDate) {
        dispatch(uncheckOtherQueries(targetDate.queries.map(q => q._id)))
        dispatch(uncheckOtherImages(targetDate.queries.reduce((acc, item) => {
          return [...acc, item.images.map(i => i._id)]
        }, [])))
      } else {
        dispatch(uncheckAllQueries())
        dispatch(uncheckAllImages())
      }
    }
  })
)(Calendar)
