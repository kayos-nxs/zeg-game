#!/bin/bash

# Loop through all files in the current directory
for file in *; do
    # Skip the script itself and directories
    if [[ -f "$file" && "$file" != "ren.sh" ]]; then
        # Extract the extension
        ext="${file##*.}"
        
        # Generate a random 8-character string
        random_name=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 8 | head -n 1)
        
        # Rename the file
        mv "$file" "$random_name.$ext"
    fi
done

echo "succesfully renamed!"
