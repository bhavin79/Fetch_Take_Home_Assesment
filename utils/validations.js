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

const validation = { retailerValidation };

export default validation;
