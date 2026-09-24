const fs = require('fs');

// 1. Fix SampleResultPopup.jsx imports and exports
const popupPath = './src/components/SampleResultPopup/SampleResultPopup.jsx';
let popup = fs.readFileSync(popupPath, 'utf8');

if (!popup.includes('import VehicleSampleResult')) {
  popup = popup.replace(
    'import { useHistory } from "react-router-dom";',
    'import { useHistory } from "react-router-dom";\nimport VehicleSampleResult from "./VehicleSampleResult/VehicleSampleResult";'
  );
}

// Remove the old VehicleSampleContent entirely if it's there
const vehicleExportRegex = /export const VehicleSampleContent = \(\{ hideActions \}\) => \{[\s\S]*?^};/m;
popup = popup.replace(vehicleExportRegex, '');
fs.writeFileSync(popupPath, popup, 'utf8');


// 2. Fix VerifyPage.jsx imports and usage
const verifyPath = './src/pages/Verify/VerifyPage.jsx';
let verify = fs.readFileSync(verifyPath, 'utf8');

verify = verify.replace(
  '  VehicleSampleContent,\n} from "../../components/SampleResultPopup/SampleResultPopup";',
  '} from "../../components/SampleResultPopup/SampleResultPopup";\nimport VehicleSampleResult from "../../components/SampleResultPopup/VehicleSampleResult/VehicleSampleResult";'
);

verify = verify.replace(
  '<VehicleSampleContent hideActions={true} />',
  '<VehicleSampleResult isInline={true} />'
);

fs.writeFileSync(verifyPath, verify, 'utf8');
console.log("Imports and usage fixed!");
