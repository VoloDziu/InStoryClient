import React from 'react'

import {ListInline, ListInlineItem} from '../../Layouts/ListInline'
import Icon from '../../UI/Icon'

import './FilterPreview.css'
import icon from './icon-close.svg'

const FilterPreview = ({
  name,
  removeCallback
}) => {
  return (
    <div
      onClick={removeCallback}
      className="FilterPreview">
      <ListInline
        alignItems="center"
        n={1}>
        <ListInlineItem n={1}>
          {name}
        </ListInlineItem>

        <ListInlineItem n={1}>
          <Icon
            small
            icon={icon} />
        </ListInlineItem>
      </ListInline>
    </div>
  )
}

export default FilterPreview
