const fs = require('fs');
const path = './src/components/SampleResultPopup/SampleResultPopup.jsx';
let content = fs.readFileSync(path, 'utf8');

// Find the start of `{isVehicle ? (` and the matching end.
// Actually, it's easier to just replace the body of the dialog.
const dialogMatch = content.match(/<Dialog[^>]*>([\s\S]*?)<\/Dialog>/);
if (dialogMatch) {
  const newBody = `
        {isVehicle ? (
          <VehicleSampleResult onClose={onClose} />
        ) : (
          <SampleResultContent type={type} />
        )}
`;
  content = content.replace(dialogMatch[1], newBody);
}

fs.writeFileSync(path, content, 'utf8');
console.log("Popup patched");
