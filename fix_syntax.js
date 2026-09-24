const fs = require('fs');
const path = './src/components/SampleResultPopup/SampleResultPopup.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /<Dialog\n        role="dialog"\n        aria-modal="true"\n        aria-labelledby="sample-result-title"\n        onClick=\{\(event\) =>\n        \{isVehicle \? \([\s\S]*?<\/Dialog>/,
  `<Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="sample-result-title"
        onClick={(event) => event.stopPropagation()}
        $isVehicle={isVehicle}
      >
        {isVehicle ? (
          <VehicleSampleResult onClose={onClose} />
        ) : (
          <SampleResultContent type={type} />
        )}
      </Dialog>`
);

fs.writeFileSync(path, content, 'utf8');
console.log("Syntax fixed!");
