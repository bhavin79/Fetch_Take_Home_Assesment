import { v4 as uuidv4 } from "uuid";
import validation from "../utils/validations.js";

let data = {};
export const processRecipt = async (req, res) => {
  let { retailer, purchaseDate, purchaseTime, items, total } = req.body;
  //validations
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
  let points = 0;
  // Points for alphanumeric;
  retailer = retailer.toLowerCase();
  console.log(retailer);
  for (let i = 0; i < retailer.length; i++) {
    let aschii = retailer.charCodeAt(i);
    console.log(aschii, retailer[i]);
    if (aschii >= 48 && aschii <= 57) {
      console.log("numer che", aschii);
      points += 1;
    } else if (aschii >= 97 && aschii <= 122) {
      console.log(retailer[i], aschii);
      points += 1;
    }
  }
  console.log("alphanumeric", points);

  //25 points total is a multiple of 0.25
  if (Number(total) % 0.25 == 0) {
    points += 25;
  }
  console.log("multiple of 0.25", points);

  // 50 points if total is a round number
  total = total.split(".");
  if (total[1] === "00") {
    points += 50;
  }
  console.log("rounder total", points);

  //5 Points for every to 2 items
  let totalItems = items.length;
  points += Math.floor(totalItems / 2) * 5;
  console.log("points for every 2 items", points);

  for (let i = 0; i < items.length; i++) {
    //if description is multiple of 3
    let { shortDescription, price } = items[i];
    if (shortDescription.length % 3 == 0) {
      points += Math.ceil(Number(price) * 0.2);
    }
    console.log("lemgth is multiple of 3", points);
  }

  //6 points if the date purchase is odd

  let date = purchaseDate.split("-");
  if (Number(date[2]) % 2 === 1) {
    points += 6;
  }
  console.log("purchase on an odd day", points);
  //10 points if the time of purchase is after 2:00pm and before 4:00pm
  let time = purchaseTime.split(":");
  console.log(time);
  let purchaseTimeInMinutes = Number(time[0]) * 60 + Number(time[1]);
  let lowerMinutes = 14 * 60;
  let upperMinutes = 16 * 60;
  console.log(purchaseTimeInMinutes, lowerMinutes, upperMinutes);
  if (
    purchaseTimeInMinutes >= lowerMinutes &&
    purchaseTimeInMinutes <= upperMinutes
  ) {
    points += 10;
  }
  console.log("14:00 to 16:00", points);
  let id = uuidv4();
  //Incase there is a collision recalculate;
  while (data[id]) {
    id = uuidv4();
  }
  data[id] = points;

  return res.status(200).json({ id });
};

export const getPoints = async (req, res) => {
  let { id } = req.params;
  id = id.trim();
  let points = data[id];
  console.log(data);
  if (points != undefined) {
    return res.status(200).json({
      points,
    });
  }
  return res.status(404).json("No receipt found for that ID.");
};
