import moment from 'moment'

export const IMAGE = 'IMAGE'
export const TIME_FORMAT = 'MMM Do YY'
export const IMAGES_PER_ROW = 5
export const CHANGE_TIMEOUT_DELAY = 300

export const COLORS = [
  {
    name: 'Orange',
    attributeIndex: 0,
    range: [0, 50],
    hex: '#ff661a'
  },
  {
    name: 'Yellow',
    attributeIndex: 0,
    range: [45, 75],
    hex: '#ffff00'
  },
  {
    name: 'Green',
    attributeIndex: 0,
    range: [65, 150],
    hex: '#25e000'
  },
  {
    name: 'Turqoise',
    attributeIndex: 0,
    range: [140, 170],
    hex: '#00ffb7'
  },
  {
    name: 'Aquamarine',
    attributeIndex: 0,
    range: [170, 190],
    hex: '#00fffb'
  },
  {
    name: 'Blue',
    attributeIndex: 0,
    range: [190, 250],
    hex: '#0056e0'
  },
  {
    name: 'Purple',
    attributeIndex: 0,
    range: [250, 300],
    hex: '#bc1fff'
  },
  {
    name: 'Pink',
    attributeIndex: 0,
    range: [295, 335],
    hex: '#ff3db1'
  },
  {
    name: 'Red',
    attributeIndex: 0,
    range: [330, 360],
    hex: '#ff1a1a'
  },
  {
    name: 'Grey',
    attributeIndex: 1,
    range: [0, 0.05],
    hex: '#878787'
  },
  {
    name: 'Black',
    attributeIndex: 2,
    range: [0, 0.05],
    hex: '#000000'
  },
  {
    name: 'White',
    attributeIndex: 2,
    range: [0.095, 1],
    hex: '#ffffff'
  }
]

export const intersect = (
  arr1,
  arr2
) => {
  let shortArray = []
  let longArray = []

  if (arr1.length < arr2.length) {
    shortArray = arr1
    longArray = arr2
  } else {
    shortArray = arr2
    longArray = arr1
  }

  for (let item of shortArray) {
    if (longArray.indexOf(item) !== -1) {
      return true
    }
  }

  return false
}

export const getColorNames = (
  colors
) => {
  const colorNames = {}

  for (let color of colors) {
    for (let c of COLORS) {
      const colorAttribute = color[c.attributeIndex]

      if (colorAttribute >= c.range[0] && colorAttribute <= c.range[1]) {
        colorNames[c.name] = true
      }
    }
  }

  return Object.keys(colorNames)
}

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
