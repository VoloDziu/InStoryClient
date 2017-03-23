import React from 'react'

import {Flex, FlexItem} from '../../Layouts/Flex'
import './FilterPreview.css'

const FilterPreview = ({
  type,
  name,
  removeCallback
}) => {
  return (
    <div
      className="FilterPreview">
      <div
        className="FP-body">
        <Flex>
          <FlexItem>
            <div
              className="FP-body__type">
              {type}
            </div>
          </FlexItem>

          <FlexItem
            spacing={0.25}
            main>
            <div
              className="FP-body__name">
              {name}
            </div>
          </FlexItem>
        </Flex>
      </div>

      <button
        onClick={removeCallback}
        className="FilterPreview__action">
        remove
      </button>
    </div>
  )
}

export default FilterPreview
