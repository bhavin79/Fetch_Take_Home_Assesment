const validString = (str, name) => {
  if (str == undefined) {
    throw `${name} is a required field`;
  }
  if (typeof str != "string") {
    throw `${name} must valid a string`;
  }
};

const retailerValidation = (retailer) => {
  validString(retailer, "reatiler");
  const pattern = /^[\w\s\-&]+$/;
  if (!pattern.test(retailer)) {
    throw `reatailer must only include whitespaces, alphanumeric, hyphen, and ampersand`;
  }
};
const purchaseDateValidation = (date) => {
  validString(date, "Purchase date");
  const pattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  if (!pattern.test(date)) {
    throw `purchase date must follow this format yyyy-mm-dd`;
  }
  let generateDate = new Date(date);
  date = date.split("-");
  if (
    generateDate.getUTCFullYear() != date[0] ||
    generateDate.getUTCMonth() + 1 != date[1] ||
    generateDate.getUTCDate() != date[2]
  ) {
    throw `Valid Date is needed`;
  }
  return date;
};

const purchaseTimeValidation = (time) => {
  validString(time, "Purchase time");
  const pattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
  time = time.trim();
  if (!pattern.test(time)) {
    throw `valid time is needed`;
  }
};

const validation = {
  retailerValidation,
  purchaseDateValidation,
  purchaseTimeValidation,
};

export default validation;
