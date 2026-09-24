const fs = require('fs');
const path = './src/components/SampleResultPopup/VehicleSampleResult/VehicleSampleResult.jsx';
let content = fs.readFileSync(path, 'utf8');

// Ensure useLocale is imported and used
if (!content.includes('useLocale')) {
  content = content.replace(
    'import useAuthRedirect',
    'import { useLocale } from "../../LocaleProvider";\nimport useAuthRedirect'
  );
}

if (!content.includes('const { t } = useLocale();')) {
  content = content.replace(
    'const verifyLink = useAuthRedirect("/verify/vehicle");',
    'const { t } = useLocale();\n  const verifyLink = useAuthRedirect("/verify/vehicle");'
  );
}

const replacements = [
  ['<SpecLabel>PLATE NUMBER</SpecLabel>', '<SpecLabel>{t("vehicleSample.plateNumber", "PLATE NUMBER")}</SpecLabel>'],
  ['<SpecLabel>VIN</SpecLabel>', '<SpecLabel>{t("vehicleSample.vin", "VIN")}</SpecLabel>'],
  ['<SpecLabel>MAKE / MODEL</SpecLabel>', '<SpecLabel>{t("vehicleSample.makeModel", "MAKE / MODEL")}</SpecLabel>'],
  ['<SpecLabel>YEAR</SpecLabel>', '<SpecLabel>{t("vehicleSample.year", "YEAR")}</SpecLabel>'],
  ['<FaCarSide /> Minivan', '<FaCarSide /> {t("vehicleSample.minivan", "Minivan")}'],
  ['<FaGasPump /> Gasoline', '<FaGasPump /> {t("vehicleSample.gasoline", "Gasoline")}'],
  ['<FaCogs /> Automatic', '<FaCogs /> {t("vehicleSample.automatic", "Automatic")}'],
  ['<FaPalette /> Red', '<FaPalette /> {t("vehicleSample.red", "Red")}'],
  ['<SectionTitle>Report Highlights</SectionTitle>', '<SectionTitle>{t("vehicleSample.reportHighlights", "Report Highlights")}</SectionTitle>'],
  ['Key information from your VIN verification report.', '{t("vehicleSample.keyInfo", "Key information from your VIN verification report.")}'],
  ['Data from trusted government & industry sources', '{t("vehicleSample.trustedData", "Data from trusted government & industry sources")}'],
  ['<CardTitle>Ownership Status</CardTitle>', '<CardTitle>{t("vehicleSample.ownershipStatus", "Ownership Status")}</CardTitle>'],
  ['Verified <FaCheckCircle />', '{t("vehicleSample.verified", "Verified")} <FaCheckCircle />'],
  ['Current ownership is valid and matches records.', '{t("vehicleSample.ownershipValid", "Current ownership is valid and matches records.")}'],
  ['<CardTitle>Theft / Watchlist Status</CardTitle>', '<CardTitle>{t("vehicleSample.theftStatus", "Theft / Watchlist Status")}</CardTitle>'],
  ['Clear <FaCheckCircle />', '{t("vehicleSample.clear", "Clear")} <FaCheckCircle />'],
  ['Not reported stolen and not on any watchlist.', '{t("vehicleSample.notStolen", "Not reported stolen and not on any watchlist.")}'],
  ['<CardTitle>Salvage / Rebuilt History</CardTitle>', '<CardTitle>{t("vehicleSample.salvageHistory", "Salvage / Rebuilt History")}</CardTitle>'],
  ['No salvage record <FaCheckCircle />', '{t("vehicleSample.noSalvage", "No salvage record")} <FaCheckCircle />'],
  ['No salvage, rebuilt, or flood damage records found.', '{t("vehicleSample.noSalvageDesc", "No salvage, rebuilt, or flood damage records found.")}'],
  ['<CardTitle>Accident History</CardTitle>', '<CardTitle>{t("vehicleSample.accidentHistory", "Accident History")}</CardTitle>'],
  ['1 minor accident reported', '{t("vehicleSample.minorAccident", "1 minor accident reported")}'],
  ['1 minor accident in 2020. No major damage reported.', '{t("vehicleSample.minorAccidentDesc", "1 minor accident in 2020. No major damage reported.")}'],
  ['<CardTitle>Previous Owners</CardTitle>', '<CardTitle>{t("vehicleSample.previousOwners", "Previous Owners")}</CardTitle>'],
  ['3 previous owners', '{t("vehicleSample.threeOwners", "3 previous owners")}'],
  ['Multiple owners may indicate higher usage.', '{t("vehicleSample.multipleOwners", "Multiple owners may indicate higher usage.")}'],
  ['<CardTitle>Odometer / Mileage Check</CardTitle>', '<CardTitle>{t("vehicleSample.odometerCheck", "Odometer / Mileage Check")}</CardTitle>'],
  ['89,450 km <FaCheckCircle />', '{t("vehicleSample.mileage", "89,450 km")} <FaCheckCircle />'],
  ['No rollback detected. Mileage appears consistent.', '{t("vehicleSample.noRollback", "No rollback detected. Mileage appears consistent.")}'],
  ['<CardTitle>Usage History</CardTitle>', '<CardTitle>{t("vehicleSample.usageHistory", "Usage History")}</CardTitle>'],
  ['Personal use <FaCheckCircle />', '{t("vehicleSample.personalUse", "Personal use")} <FaCheckCircle />'],
  ['No commercial or rental use reported.', '{t("vehicleSample.noCommercial", "No commercial or rental use reported.")}'],
  ['<CardTitle>Registration</CardTitle>', '<CardTitle>{t("vehicleSample.registration", "Registration")}</CardTitle>'],
  ['Lagos, Nigeria <FaCheckCircle />', '{t("vehicleSample.location", "Abidjan, Côte d\'Ivoire")} <FaCheckCircle />'],
  ['Current registration in Lagos, Nigeria.', '{t("vehicleSample.locationDesc", "Current registration in Abidjan, Côte d\'Ivoire.")}'],
  ['<CardTitle>Estimated Market Value</CardTitle>', '<CardTitle>{t("vehicleSample.estimatedValue", "Estimated Market Value")}</CardTitle>'],
  ['₦12,000,000 - ₦15,000,000', '{t("vehicleSample.priceRange", "CFA 12,000,000 - CFA 15,000,000")}'],
  ['Based on market data and comparable listings.', '{t("vehicleSample.basedOnMarket", "Based on market data and comparable listings.")}'],
  ['<CardTitle>Open Recalls</CardTitle>', '<CardTitle>{t("vehicleSample.openRecalls", "Open Recalls")}</CardTitle>'],
  ['None found <FaCheckCircle />', '{t("vehicleSample.noneFound", "None found")} <FaCheckCircle />'],
  ['No open safety recalls for this vehicle.', '{t("vehicleSample.noRecalls", "No open safety recalls for this vehicle.")}'],
  ['<WhyTitle>Why this matters</WhyTitle>', '<WhyTitle>{t("vehicleSample.whyMatters", "Why this matters")}</WhyTitle>'],
  ['A VIN report gives you the facts you need to buy with confidence.', '{t("vehicleSample.factsNeeded", "A VIN report gives you the facts you need to buy with confidence.")}'],
  ['<WhyItemTitle>Avoid hidden accident history</WhyItemTitle>', '<WhyItemTitle>{t("vehicleSample.avoidAccident", "Avoid hidden accident history")}</WhyItemTitle>'],
  ['Know the true condition before you buy.', '{t("vehicleSample.trueCondition", "Know the true condition before you buy.")}'],
  ['<WhyItemTitle>Confirm ownership trail</WhyItemTitle>', '<WhyItemTitle>{t("vehicleSample.confirmOwnership", "Confirm ownership trail")}</WhyItemTitle>'],
  ['See how many owners the vehicle has had.', '{t("vehicleSample.howManyOwners", "See how many owners the vehicle has had.")}'],
  ['<WhyItemTitle>Detect salvage or flood risk</WhyItemTitle>', '<WhyItemTitle>{t("vehicleSample.detectSalvage", "Detect salvage or flood risk")}</WhyItemTitle>'],
  ['Uncover title brands and major damage.', '{t("vehicleSample.uncoverBrands", "Uncover title brands and major damage.")}'],
  ['<WhyItemTitle>Identify red flags early</WhyItemTitle>', '<WhyItemTitle>{t("vehicleSample.identifyFlags", "Identify red flags early")}</WhyItemTitle>'],
  ['Spot issues before they become your problem.', '{t("vehicleSample.spotIssues", "Spot issues before they become your problem.")}'],
  ['This is a sample report. Results are based on data available at the\n          time of verification and may vary for your vehicle.', '{t("vehicleSample.sampleDisclaimer", "This is a sample report. Results are based on data available at the time of verification and may vary for your vehicle.")}'],
  ['<CloseButton onClick={onClose}>Close</CloseButton>', '<CloseButton onClick={onClose}>{t("sample.close", "Close")}</CloseButton>'],
  ['Verify Your VIN Now <FaArrowRight />', '{t("vehicleSample.verifyNow", "Verify Your VIN Now")} <FaArrowRight />']
];

for (const [from, to] of replacements) {
  content = content.replace(from, to);
}

fs.writeFileSync(path, content, 'utf8');
console.log("VehicleSampleResult updated!");
