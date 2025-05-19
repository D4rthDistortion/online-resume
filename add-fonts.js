const fs = require('fs');
const path = require('path');

const googleFontsTag = `<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Raleway:wght@500;600;700&display=swap" rel="stylesheet">`;
const excludedFiles = ['footer.html', 'old.html'];
const directory = '.'; // start from current directory

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(googleFontsTag)) return; // avoid duplicates

  const updatedContent = content.replace(
    /<head>/i,
    `<head>\n  ${googleFontsTag}`
  );

  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log(`✔️ Updated ${filePath}`);
}

function walkDir(currentPath) {
  const files = fs.readdirSync(currentPath);

  files.forEach(file => {
    const fullPath = path.join(currentPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (
      path.extname(fullPath) === '.html' &&
      !excludedFiles.includes(path.basename(fullPath))
    ) {
      processFile(fullPath);
    }
  });
}

walkDir(directory);
