export const NO_DATA_STATUS = "No data found";
export const LEGACY_TERMINATED_CONSENT = "terminated";
export const RECORD_NOT_FOUND_TITLE = "Record Not Found";
export const RECORD_NOT_FOUND_MESSAGE =
  "No matching record was found for the information provided.";

export const isNoDataOutcome = ({ status = "", consent = "" } = {}) =>
  status.toLowerCase() === NO_DATA_STATUS.toLowerCase() ||
  consent.toLowerCase() === LEGACY_TERMINATED_CONSENT;

export const isRecordNotFoundDetail = (detail = "") =>
  /(?:no\s+)?record not found|no data found/i.test(detail);
