#!/bin/bash

echo -n "Current component's name: "
read currentName

echo -n "New name: "
read newName

sed -i "" -e "s/$currentName/$newName/g" "./src/components/$currentName/package.json"
sed -i "" -e "s/$currentName/$newName/g" "./src/components/$currentName/$currentName.jsx"
sed -i "" -e "s/$currentName/$newName/g" "./src/components/$currentName/$currentName.css"

mv "./src/components/$currentName/$currentName.jsx" "./src/components/$currentName/$newName.jsx"
mv "./src/components/$currentName/$currentName.css" "./src/components/$currentName/$newName.css"
mv "./src/components/$currentName" "./src/components/$newName"

echo "renamed component $currentName to $newName"

exit 0
