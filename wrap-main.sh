#!/bin/bash

# Make backup directory for pages if it doesn't exist
mkdir -p backup/pages

# Loop through all HTML files in the pages folder (except index.html)
for file in pages/*.html; do
  filename=$(basename "$file")
  if [[ "$filename" != "index.html" ]]; then
    echo "Backing up $filename..."
    cp "$file" "backup/pages/$filename"

    echo "Updating $filename..."

    # Insert opening <main class="container"> after <body>
    sed -i '' '/<body>/a\
<main class="container">
' "$file"

    # Insert closing </main> before </body>
    sed -i '' '/<\/body>/i\
</main>
' "$file"

    echo "$filename updated!"
  fi
done

echo "✅ All done. HTML files in 'pages/' are backed up and wrapped with <main>!"
