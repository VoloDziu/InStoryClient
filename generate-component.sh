#!/bin/bash

echo -n "Component's name: "
read componentName

mkdir -p "./src/components/$componentName"

# package.json
echo "{
  \"name\": \"$componentName\",
  \"main\": \"$componentName.jsx\"
}" >> "./src/components/$componentName/package.json"

# jsx module
echo "import React from 'react'

import './$componentName.css'

const $componentName = () => {
  return (
    <div
      className=\"$componentName\">
      I am $componentName component!
    </div>
  )
}

export default $componentName
" >> "./src/components/$componentName/$componentName.jsx"

# css
echo "@import '../../variables.css';

.$componentName {
  /**/
}
" >> "./src/components/$componentName/$componentName.css"


echo "created component $componentName"

exit 0
