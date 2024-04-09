const asyncHandler = require("express-async-handler");
const barcode = require("../models/barcodeModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const BASE_URL = process.env.BASE_URL;

//set bar code data
const storeBarcodeData = asyncHandler(async (req, res) => {
  const { barcodeId, expiryDate } = req.body;
  if (!barcodeId || !expiryDate) {
    res.status(400);
    throw new Error("all field is required");
  }
  //cheking user available in database
  if (await barcode.findOne({ barcodeId })) {
    res.status(403);
    throw new Error("barcode data already exist");
  }
  try {
    const barcodeData = await axios.get(`${BASE_URL}${Number(barcodeId)}`);
    if (!barcodeData?.data?.data) {
      res.status(500);
      throw new Error("unable to fetch the data");
    }
    const { title, imageUrl, categoty } = barcodeData?.data?.data;
    console.log(title, imageUrl, categoty);

    const resBarcodeData = await barcode.create({
      name: title,
      imageUrl,
      categoty,
      barcodeId,
      expiryDate,
    });
    if (resBarcodeData) {
      res.status(201).json({
        status: true,
        message: "successfully stored barcode data",
        data: resBarcodeData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("something went wrong");
  }
});

//get bar code data
const getBarcodeData = asyncHandler(async (req, res) => {
  const { barcodeId } = req.params;
  if (!barcodeId) {
    res.status(400);
    throw new Error("all field is required");
  }

  try {
    const barcodeData = await barcode.findOne({ barcodeId });
    if (!barcodeData) {
      res.status(404);
      throw new Error("barcode data not found");
    }

    if (barcodeData) {
      res.status(201).json({
        status: true,
        message: "successfully fetched barcode data",
        data: barcodeData,
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getExpire = asyncHandler(async (req, res) => {
  const { barcodeId } = req.params;
  if (!barcodeId) {
    res.status(400);
    throw new Error("all field is required");
  }

  try {
    const barcodeData = await barcode.findOne({ barcodeId });
    if (!barcodeData) {
      res.status(404);
      throw new Error("barcode data not found");
    }

    if (barcodeData) {
      res.status(201).json({
        status: true,
        message: "successfully fetched barcode data",
        data: { name: barcodeData.name, expire: barcodeData.expiryDate },
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  storeBarcodeData,
  getBarcodeData,
  getExpire,
};
