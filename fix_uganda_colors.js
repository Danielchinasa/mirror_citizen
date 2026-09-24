const fs = require('fs');
const path = './src/components/SampleResultPopup/VehicleSampleResult/VehicleSampleResult.jsx';
let content = fs.readFileSync(path, 'utf8');

const replacements = [
  // Colors
  ['#FD7A00', '#DD0201'],
  ['#fd7a00', '#DD0201'],
  ['#FFF5EB', '#FFF0F0'], // Light Red Background
  ['#fff8f3', '#FFF0F0'],
  ['#FFD2A8', '#FFD6D6'], // Red Border
  ['#ffeadb', '#FFD6D6'],
  ['#FFECD9', '#FFEBEB'], // Icon Background
  ['#ffe0c8', '#FFEBEB'],
  ['#d95d00', '#DD0201'],
  ['#096f32', '#FF4D4F'], // Hover state

  // Location & Currency
  ["Abidjan, Côte d'Ivoire", "Kampala, Uganda"],
  ["CFA 12,000,000 - CFA 15,000,000", "UGX 12,000,000 - UGX 15,000,000"]
];

for (const [from, to] of replacements) {
  content = content.split(from).join(to); // replaceAll polyfill
}

fs.writeFileSync(path, content, 'utf8');
console.log("Colors and specific copy updated for Uganda!");
