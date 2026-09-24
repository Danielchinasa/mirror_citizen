const fs = require('fs');
const popupPath = './src/components/SampleResultPopup/SampleResultPopup.jsx';
let popup = fs.readFileSync(popupPath, 'utf8');

const regex = /export const VehicleSampleContent[\s\S]*?^};\n/m;
popup = popup.replace(regex, '');
fs.writeFileSync(popupPath, popup, 'utf8');
console.log("Old VehicleSampleContent deleted!");
