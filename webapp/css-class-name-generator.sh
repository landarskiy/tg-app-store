#!/bin/bash

css_file="style.css"
js_file="css-class-names.js"

class_names=$(grep -o '\.[A-Za-z][A-Za-z0-9_-]*' "$css_file" | awk '{print "" $0 ""}')

echo "// Generated class names from $css_file" > "$js_file"
for class_name in $class_names; do
    class_name="${class_name#.}"
    #make const in snake case
    IFS='-' read -ra parts <<< "$class_name"
    const_name=""
    for part in "${parts[@]}"; do
        const_name+="$(echo "${part}" | awk '{print toupper(substr($0,1,1)) tolower(substr($0,2))}')"
    done
    const_name="${const_name%_}"

    echo "const css$const_name = \"$class_name\";" >> "$js_file"
done

echo "Class names extracted from $css_file and saved to $js_file"