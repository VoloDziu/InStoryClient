import moment from 'moment'

export const IMAGE = 'IMAGE'
export const TIME_FORMAT = 'MMM Do YY'
export const IMAGES_PER_ROW = 5
export const CHANGE_TIMEOUT_DELAY = 300

export const COLORS = [
  {
    name: 'Red',
    hex: '#ff1a1a',
    match: (hsl) => {
      const hue = hsl[0]
      const saturation = hsl[1]
      const lightness = hsl[2]

      return ((hue >= 0 && hue <= 10) || (hue >= 345 && hue <= 360)) &&
        lightness >= 0.25 && lightness <= 0.85 &&
        saturation >= 0.4
    }
  },
  {
    name: 'Orange',
    hex: '#ff661a',
    match: (hsl) => {
      const hue = hsl[0]
      const saturation = hsl[1]
      const lightness = hsl[2]

      return hue >= 20 && hue <= 40 &&
        lightness >= 0.40 && lightness <= 0.85 &&
        saturation >= 0.4
    }
  },
  {
    name: 'Yellow',
    hex: '#ffff00',
    match: (hsl) => {
      const hue = hsl[0]
      const saturation = hsl[1]
      const lightness = hsl[2]

      return hue >= 35 && hue <= 60 &&
        lightness >= 0.40 && lightness <= 0.85 &&
        saturation >= 0.4
    }
  },
  {
    name: 'Green',
    hex: '#25e000',
    match: (hsl) => {
      const hue = hsl[0]
      const saturation = hsl[1]
      const lightness = hsl[2]

      return hue >= 75 && hue <= 160 &&
        lightness >= 0.15 && lightness <= 0.85 &&
        saturation >= 0.4
    }
  },
  {
    name: 'Teal',
    hex: '#00fffb',
    match: (hsl) => {
      const hue = hsl[0]
      const saturation = hsl[1]
      const lightness = hsl[2]

      return hue >= 165 && hue <= 195 &&
        lightness >= 0.40 && lightness <= 0.70 &&
        saturation >= 0.40
    }
  },
  {
    name: 'Blue',
    hex: '#0056e0',
    match: (hsl) => {
      const hue = hsl[0]
      const saturation = hsl[1]
      const lightness = hsl[2]

      return hue >= 190 && hue <= 230 &&
        lightness >= 0.30 && lightness <= 0.60 &&
        saturation >= 0.4
    }
  },
  {
    name: 'Purple',
    hex: '#bc1fff',
    match: (hsl) => {
      const hue = hsl[0]
      const saturation = hsl[1]
      const lightness = hsl[2]

      return hue >= 265 && hue <= 270 &&
        lightness >= 0.25 && lightness <= 0.75 &&
        saturation >= 0.4
    }
  },
  {
    name: 'Pink',
    hex: '#ff3db1',
    match: (hsl) => {
      const hue = hsl[0]
      const saturation = hsl[1]
      const lightness = hsl[2]

      return hue >= 305 && hue <= 330 &&
        lightness >= 0.50 && lightness <= 0.70 &&
        saturation >= 0.4
    }
  },
  {
    name: 'White',
    hex: '#ffffff',
    match: (hsl) => {
      const saturation = hsl[1]
      const lightness = hsl[2]

      return lightness >= 0.90 &&
        saturation <= 0.10
    }
  },
  {
    name: 'Grey',
    hex: '#878787',
    match: (hsl) => {
      const saturation = hsl[1]
      const lightness = hsl[2]

      return lightness >= 0.20 && lightness <= 0.50 &&
        saturation <= 0.10
    }
  },
  {
    name: 'Black',
    hex: '#000000',
    match: (hsl) => {
      const saturation = hsl[1]
      const lightness = hsl[2]

      return lightness <= 0.15 &&
        saturation <= 0.10
    }
  },
  {
    name: 'Brown',
    hex: '#974317',
    match: (hsl) => {
      const hue = hsl[0]
      const saturation = hsl[1]
      const lightness = hsl[2]

      return hue >= 6 && hue <= 20 &&
        lightness >= 0.10 && lightness <= 0.35 &&
        saturation >= 0.40
    }
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
      if (c.match(color)) {
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

export const truncate = (str, length) => {
  if (str.length > length) {
    return str.slice(0, length - 3) + '...'
  } else {
    return str
  }
}
