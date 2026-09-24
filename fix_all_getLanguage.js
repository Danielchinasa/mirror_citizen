const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const newGetLanguage = `const getLanguage = () => {
  if (typeof window === "undefined") return "EN";
  return window.localStorage.getItem("siteLanguage") === "SW" ? "SW" : "EN";
};`;

let count = 0;

walkDir('./src', (filePath) => {
  if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const regex = /const getLanguage = \(\) => \{\s+if \(typeof window === ["']undefined["']\) return ["']SW["'];\s+return window\.localStorage\.getItem\([^)]+\) === ["']EN["'] \? ["']EN["'] : ["']SW["'];\s+\};/g;

    if (regex.test(content)) {
      content = content.replace(regex, newGetLanguage);
      fs.writeFileSync(filePath, content, 'utf8');
      count++;
    }
  }
});

console.log("Fixed " + count + " files!");
