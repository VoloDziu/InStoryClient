import React from 'react'
import classnames from 'classnames'
import './TextInput.css'

class TextInput extends React.Component {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange () {
    const value = this._element.value
    const {changeCallback} = this.props

    changeCallback(value)
  }

  render () {
    const {
      error,
      value,
      placeholder,
      hasPrefix = false,
      hasSuffix = false,
      disabled = false,
      inverse = false,
      type = 'text'
    } = this.props

    const classes = classnames('ui-text-input', {
      'ui-text-input--error': error,
      'ui-text-input--inverse': inverse,
      'ui-text-input--with-prefix': hasPrefix,
      'ui-text-input--with-suffix': hasSuffix
    })

    return (
      <input ref={el => { this._element = el }}
        value={value || ''}
        className={classes}
        disabled={disabled}
        type={type}
        onChange={this.onChange}
        placeholder={placeholder} />
    )
  }
}

export default TextInput
