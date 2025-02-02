import { v4 as uuidv4 } from "uuid";
import validation from "../utils/validations.js";
const data = {};

export const processRecipt = async (req, res) => {
  let { retailer, purchaseDate, purchaseTime, items, total } = req.body;
  try {
    retailer = validation.retailerValidation(retailer);
  } catch (error) {
    res.status(400).json({ description: `The receipt is invalid. ${error}` });
  }
  return res.status(200).json({ message: "Testing Route for process" });
};

export const getPoints = async (req, res) => {
  return res
    .status(200)
    .json({ message: `Testing route for points with param ${req.params.id}` });
};
