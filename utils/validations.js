const validString = (str, field) => {
  if (str == undefined) {
    throw `${field} is a required field`;
  }
  if (typeof str != "string") {
    throw `${field} must valid a string`;
  }
};

const validPrice = (price, field) => {
  const pattern = /^\d+\.\d{2}$/;
  if (!pattern.test(price)) {
    throw `valid ${field} needed`;
  }
};
const validText = (text, field) => {
  const pattern = /^[\w\s\-&]+$/;
  if (!pattern.test(text)) {
    throw `${field} must only include whitespaces, alphanumeric, hyphen, and ampersand`;
  }
};

const retailerValidation = (retailer) => {
  validString(retailer, "reatiler");
  retailer = retailer.trim();
  validText(retailer, "reatiler");
  return retailer;
};

const purchaseDateValidation = (date) => {
  validString(date, "Purchase date");
  let temp = date.trim();
  date = date.trim();

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
  return temp;
};

const purchaseTimeValidation = (time) => {
  validString(time, "Purchase time");
  const pattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
  time = time.trim();
  if (!pattern.test(time)) {
    throw `valid time is needed`;
  }
  return time;
};
const totalAmountValidation = (amount) => {
  validString(amount, "total");
  amount = amount.trim();
  validPrice(amount, "total");
  return amount;
};

const shortDescription = (desc) => {
  validString(desc, "Short Description");
  desc = desc.trim();
  validText(desc, "Short description");
  return desc;
};

const priceValidation = (amount) => {
  validString(amount, "price");
  amount = amount.trim();
  validPrice(amount, "price");
  return amount;
};

const items = { shortDescription, priceValidation };

const validation = {
  retailerValidation,
  purchaseDateValidation,
  purchaseTimeValidation,
  totalAmountValidation,
  items,
};

export default validation;
