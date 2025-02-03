import { v4 as uuidv4 } from "uuid";
import { getRedisClient } from "../config/redisConnect.js";
import validation from "../utils/validations.js";
import dataFunctions from "../data/receiptsData.js";
/**
 * Path: /receipts/process
 * Method: Post
 */
export const processReceipt = async (req, res) => {
  let { retailer, purchaseDate, purchaseTime, items, total } = req.body;

  //validations
  try {
    retailer = validation.retailerValidation(retailer);
    purchaseDate = validation.purchaseDateValidation(purchaseDate);
    purchaseTime = validation.purchaseTimeValidation(purchaseTime);
    total = validation.totalAmountValidation(total);
    if (!items || Array.isArray(items) == false || items.length == 0) {
      throw `items is needed`;
    }
    items.forEach((item) => {
      item.shortDescription = validation.items.shortDescription(
        item.shortDescription
      );
      item.price = validation.items.priceValidation(item.price);
    });
  } catch (error) {
    return res.status(400).json("The receipt is invalid.");
  }

  let points = 0;

  // 1 Point - for every alphanumeric character
  retailer = retailer.toLowerCase();
  for (let i = 0; i < retailer.length; i++) {
    let aschii = retailer.charCodeAt(i);
    if (aschii >= 48 && aschii <= 57) {
      points += 1;
    } else if (aschii >= 97 && aschii <= 122) {
      points += 1;
    }
  }

  //25 points - total is a multiple of 0.25
  if (Number(total) % 0.25 == 0) {
    points += 25;
  }

  // 50 points - if total is a round number eg: 20:00
  total = total.split(".");
  if (total[1] === "00") {
    points += 50;
  }

  //5 Points - for every to 2 items
  let totalItems = items.length;
  points += Math.floor(totalItems / 2) * 5;

  for (let i = 0; i < items.length; i++) {
    //if description is multiple of 3
    let { shortDescription, price } = items[i];
    if (shortDescription.length % 3 == 0) {
      points += Math.ceil(Number(price) * 0.2);
    }
  }

  //6 points - if the date purchase is odd
  let date = purchaseDate.split("-");
  if (Number(date[2]) % 2 === 1) {
    points += 6;
  }

  //10 points - if the time of purchase is after 2:00pm and before 4:00pm
  let time = purchaseTime.split(":");
  let purchaseTimeInMinutes = Number(time[0]) * 60 + Number(time[1]);
  let lowerMinutes = 14 * 60;
  let upperMinutes = 16 * 60;
  if (
    purchaseTimeInMinutes >= lowerMinutes &&
    purchaseTimeInMinutes <= upperMinutes
  ) {
    points += 10;
  }
  //Generate UUID
  let id = uuidv4();

  //Store in database;
  await dataFunctions.storePoints(id, points);

  return res.status(200).json({ id });
};

/*
 * Path: /receipts/{id}/points
 * Method: Get
 */
export const getPoints = async (req, res) => {
  let { id } = req.params;
  id = id.trim();
  let points = undefined;
  try {
    points = await dataFunctions.getPoints(id);
  } catch (error) {
    return res.status(404).json("No receipt found for that ID.");

  }
  if (points != undefined) {
    return res.status(200).json({
      points: Number(points),
    });
  }
};
