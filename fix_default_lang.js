const fs = require('fs');
const path = './src/components/LocaleProvider.jsx';
let content = fs.readFileSync(path, 'utf8');

const newGetInitialLanguage = `const getInitialLanguage = () => {
  if (typeof window === "undefined") return "EN";

  const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
  return storedLanguage === "SW" ? "SW" : "EN";
};`;

content = content.replace(/const getInitialLanguage = \(\) => \{[\s\S]*?^};/m, newGetInitialLanguage);

// We should also clean up MIGRATED_KEY logic from useEffect just in case, but let's see.
content = content.replace(/    \/\/ Only persist when a migration has been done first\n    if \(window\.localStorage\.getItem\(MIGRATED_KEY\)\) \{\n      window\.localStorage\.setItem\(STORAGE_KEY, language\);\n    \}/, 
`    window.localStorage.setItem(STORAGE_KEY, language);`);

fs.writeFileSync(path, content, 'utf8');
console.log("Language default changed to EN!");
