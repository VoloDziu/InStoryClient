import moment from 'moment'

export const IMAGE = 'IMAGE'
export const TIME_FORMAT = 'MMM Do YY'
export const IMAGES_PER_ROW = 5
export const CHANGE_TIMEOUT_DELAY = 300

export const toDate = (
  day
) => {
  if (day) {
    return moment(day, TIME_FORMAT).toDate()
  } else {
    return null
  }
}

export const toDay = (
  date
) => {
  if (date) {
    return moment(date).format(TIME_FORMAT)
  } else {
    return date
  }
}
