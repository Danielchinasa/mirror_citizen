const fs = require('fs');
const path = './src/components/SampleResultPopup/VehicleSampleResult/VehicleSampleResult.jsx';
let content = fs.readFileSync(path, 'utf8');

// Update component signature to take isSw
content = content.replace(
  'const VehicleSampleResult = ({ onClose, isInline }) => {',
  'const VehicleSampleResult = ({ onClose, isInline, isSw }) => {'
);

const replacements = [
  ['<SpecLabel>PLATE NUMBER</SpecLabel>', '<SpecLabel>{isSw ? "NAMBA YA USAJILI" : "PLATE NUMBER"}</SpecLabel>'],
  ['<SpecLabel>VIN</SpecLabel>', '<SpecLabel>{isSw ? "NAMBA YA VIN" : "VIN"}</SpecLabel>'],
  ['<SpecLabel>MAKE / MODEL</SpecLabel>', '<SpecLabel>{isSw ? "AINA / MODELI" : "MAKE / MODEL"}</SpecLabel>'],
  ['<SpecLabel>YEAR</SpecLabel>', '<SpecLabel>{isSw ? "MWAKA" : "YEAR"}</SpecLabel>'],
  ['<FaCarSide /> Minivan', '<FaCarSide /> {isSw ? "Minivan" : "Minivan"}'],
  ['<FaGasPump /> Gasoline', '<FaGasPump /> {isSw ? "Petroli" : "Gasoline"}'],
  ['<FaCogs /> Automatic', '<FaCogs /> {isSw ? "Otomatiki" : "Automatic"}'],
  ['<FaPalette /> Red', '<FaPalette /> {isSw ? "Nyekundu" : "Red"}'],
  ['<SectionTitle>Report Highlights</SectionTitle>', '<SectionTitle>{isSw ? "Muhtasari wa Ripoti" : "Report Highlights"}</SectionTitle>'],
  ['Key information from your VIN verification report.', '{isSw ? "Taarifa muhimu kutoka kwenye ripoti yako ya uthibitishaji wa VIN." : "Key information from your VIN verification report."}'],
  ['Data from trusted government & industry sources', '{isSw ? "Data kutoka vyanzo vinavyoaminika vya serikali na sekta" : "Data from trusted government & industry sources"}'],
  ['<CardTitle>Ownership Status</CardTitle>', '<CardTitle>{isSw ? "Hali ya Umiliki" : "Ownership Status"}</CardTitle>'],
  ['Verified <FaCheckCircle />', '{isSw ? "Imethibitishwa" : "Verified"} <FaCheckCircle />'],
  ['Current ownership is valid and matches records.', '{isSw ? "Umiliki wa sasa ni halali na unalingana na rekodi." : "Current ownership is valid and matches records."}'],
  ['<CardTitle>Theft / Watchlist Status</CardTitle>', '<CardTitle>{isSw ? "Hali ya Wizi / Orodha ya Uangalizi" : "Theft / Watchlist Status"}</CardTitle>'],
  ['Clear <FaCheckCircle />', '{isSw ? "Safi" : "Clear"} <FaCheckCircle />'],
  ['Not reported stolen and not on any watchlist.', '{isSw ? "Haijaripotiwa kuibiwa na haiko kwenye orodha yoyote ya uangalizi." : "Not reported stolen and not on any watchlist."}'],
  ['<CardTitle>Salvage / Rebuilt History</CardTitle>', '<CardTitle>{isSw ? "Historia ya Uokoaji / Kujengwa Upya" : "Salvage / Rebuilt History"}</CardTitle>'],
  ['No salvage record <FaCheckCircle />', '{isSw ? "Hakuna rekodi ya uokoaji" : "No salvage record"} <FaCheckCircle />'],
  ['No salvage, rebuilt, or flood damage records found.', '{isSw ? "Hakuna uokoaji, kujengwa upya, au rekodi za uharibifu wa mafuriko zilizopatikana." : "No salvage, rebuilt, or flood damage records found."}'],
  ['<CardTitle>Accident History</CardTitle>', '<CardTitle>{isSw ? "Historia ya Ajali" : "Accident History"}</CardTitle>'],
  ['1 minor accident reported', '{isSw ? "Ajali 1 ndogo imeripotiwa" : "1 minor accident reported"}'],
  ['1 minor accident in 2020. No major damage reported.', '{isSw ? "Ajali 1 ndogo mwaka 2020. Hakuna uharibifu mkubwa ulioripotiwa." : "1 minor accident in 2020. No major damage reported."}'],
  ['<CardTitle>Previous Owners</CardTitle>', '<CardTitle>{isSw ? "Wamiliki Waliopita" : "Previous Owners"}</CardTitle>'],
  ['3 previous owners', '{isSw ? "Wamiliki 3 waliopita" : "3 previous owners"}'],
  ['Multiple owners may indicate higher usage.', '{isSw ? "Wamiliki wengi wanaweza kuonyesha matumizi makubwa." : "Multiple owners may indicate higher usage."}'],
  ['<CardTitle>Odometer / Mileage Check</CardTitle>', '<CardTitle>{isSw ? "Ukaguzi wa Odometer / Maili" : "Odometer / Mileage Check"}</CardTitle>'],
  ['89,450 km <FaCheckCircle />', '89,450 km <FaCheckCircle />'],
  ['No rollback detected. Mileage appears consistent.', '{isSw ? "Hakuna kurudishwa nyuma kulikogunduliwa. Maili inaonekana kuwa sawa." : "No rollback detected. Mileage appears consistent."}'],
  ['<CardTitle>Usage History</CardTitle>', '<CardTitle>{isSw ? "Historia ya Matumizi" : "Usage History"}</CardTitle>'],
  ['Personal use <FaCheckCircle />', '{isSw ? "Matumizi binafsi" : "Personal use"} <FaCheckCircle />'],
  ['No commercial or rental use reported.', '{isSw ? "Hakuna matumizi ya kibiashara au ya kukodisha yaliyoripotiwa." : "No commercial or rental use reported."}'],
  ['<CardTitle>Registration</CardTitle>', '<CardTitle>{isSw ? "Usajili" : "Registration"}</CardTitle>'],
  ['Lagos, Nigeria <FaCheckCircle />', '{isSw ? "Nairobi, Kenya" : "Nairobi, Kenya"} <FaCheckCircle />'],
  ['Current registration in Lagos, Nigeria.', '{isSw ? "Usajili wa sasa uko Nairobi, Kenya." : "Current registration in Nairobi, Kenya."}'],
  ['<CardTitle>Estimated Market Value</CardTitle>', '<CardTitle>{isSw ? "Thamani Inayokadiriwa ya Soko" : "Estimated Market Value"}</CardTitle>'],
  ['₦12,000,000 - ₦15,000,000', '{isSw ? "KES 1,200,000 - KES 1,500,000" : "KES 1,200,000 - KES 1,500,000"}'],
  ['Based on market data and comparable listings.', '{isSw ? "Kulingana na data ya soko na orodha zinazolingana." : "Based on market data and comparable listings."}'],
  ['<CardTitle>Open Recalls</CardTitle>', '<CardTitle>{isSw ? "Ukumbushaji Wazi" : "Open Recalls"}</CardTitle>'],
  ['None found <FaCheckCircle />', '{isSw ? "Hakuna kilichopatikana" : "None found"} <FaCheckCircle />'],
  ['No open safety recalls for this vehicle.', '{isSw ? "Hakuna ukumbushaji wazi wa usalama kwa gari hili." : "No open safety recalls for this vehicle."}'],
  ['<WhyTitle>Why this matters</WhyTitle>', '<WhyTitle>{isSw ? "Kwa nini hii ni muhimu" : "Why this matters"}</WhyTitle>'],
  ['A VIN report gives you the facts you need to buy with confidence.', '{isSw ? "Ripoti ya VIN inakupa ukweli unaohitaji kununua kwa ujasiri." : "A VIN report gives you the facts you need to buy with confidence."}'],
  ['<WhyItemTitle>Avoid hidden accident history</WhyItemTitle>', '<WhyItemTitle>{isSw ? "Epuka historia ya ajali iliyofichwa" : "Avoid hidden accident history"}</WhyItemTitle>'],
  ['Know the true condition before you buy.', '{isSw ? "Jua hali halisi kabla ya kununua." : "Know the true condition before you buy."}'],
  ['<WhyItemTitle>Confirm ownership trail</WhyItemTitle>', '<WhyItemTitle>{isSw ? "Thibitisha mfululizo wa umiliki" : "Confirm ownership trail"}</WhyItemTitle>'],
  ['See how many owners the vehicle has had.', '{isSw ? "Tazama gari limekuwa na wamiliki wangapi." : "See how many owners the vehicle has had."}'],
  ['<WhyItemTitle>Detect salvage or flood risk</WhyItemTitle>', '<WhyItemTitle>{isSw ? "Gundua hatari ya uokoaji au mafuriko" : "Detect salvage or flood risk"}</WhyItemTitle>'],
  ['Uncover title brands and major damage.', '{isSw ? "Gundua chapa za hatimiliki na uharibifu mkubwa." : "Uncover title brands and major damage."}'],
  ['<WhyItemTitle>Identify red flags early</WhyItemTitle>', '<WhyItemTitle>{isSw ? "Tambua dalili za hatari mapema" : "Identify red flags early"}</WhyItemTitle>'],
  ['Spot issues before they become your problem.', '{isSw ? "Gundua masuala kabla hayajawa tatizo lako." : "Spot issues before they become your problem."}'],
  ['This is a sample report. Results are based on data available at the\n          time of verification and may vary for your vehicle.', '{isSw ? "Huu ni mfano wa ripoti. Matokeo yanategemea data inayopatikana wakati wa uthibitishaji na inaweza kutofautiana kwa gari lako." : "This is a sample report. Results are based on data available at the time of verification and may vary for your vehicle."}'],
  ['<CloseButton onClick={onClose}>Close</CloseButton>', '<CloseButton onClick={onClose}>{isSw ? "Funga" : "Close"}</CloseButton>'],
  ['Verify Your VIN Now <FaArrowRight />', '{isSw ? "Thibitisha VIN Yako Sasa" : "Verify Your VIN Now"} <FaArrowRight />']
];

for (const [from, to] of replacements) {
  content = content.replace(from, to);
}

fs.writeFileSync(path, content, 'utf8');
console.log("File updated!");
