import { v4 as uuidv4 } from "uuid";
import validation from "../utils/validations.js";
const data = {};

export const processRecipt = async (req, res) => {
  let { retailer, purchaseDate, purchaseTime, items, total } = req.body;
  try {
    retailer = validation.retailerValidation(retailer);
    purchaseDate = validation.purchaseDateValidation(purchaseDate);
    purchaseTime = validation.purchaseTimeValidation(purchaseTime);
    total = validation.totalAmountValidation(total);
    if (!items) {
      throw `items is needed`;
    }
    items.forEach((item) => {
      item.shortDescription = validation.items.shortDescription(
        item.shortDescription
      );
      item.price = validation.items.priceValidation(item.price);
    });
  } catch (error) {
    return res
      .status(400)
      .json({ description: `The receipt is invalid. ${error}` });
  }
  return res.status(200).json({ message: "Testing Route for process" });
};

export const getPoints = async (req, res) => {
  return res
    .status(200)
    .json({ message: `Testing route for points with param ${req.params.id}` });
};
