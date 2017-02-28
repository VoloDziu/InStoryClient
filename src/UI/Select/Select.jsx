import React from 'react'
import classnames from 'classnames'

import './Select.css'

class Select extends React.Component {
  render () {
    const {
      options,
      onChange,
      value,
      inverse = false,
      disabled = false
    } = this.props

    const selectedOption = options.find(o => o.id === value)
    const inputLabel = selectedOption ? selectedOption.label : 'None'

    const classes = classnames('ui-select', {
      'ui-select--inverse': inverse
    })

    return (
      <div className={classes}>
        <div className="ui-select__fake">{inputLabel}</div>

        <select className="ui-select__input"
          ref={el => { this._element = el }}
          value={value}
          disabled={disabled}
          onChange={(v) => onChange(v.target.value)}>
          {options.map((o, index) =>
            <option key={index} value={o.id}>{o.label}</option>
          )}
        </select>
      </div>
    )
  }
}

export default Select
