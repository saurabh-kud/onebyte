const express = require("express");
const router = express.Router();

const {
  storeBarcodeData,
  getBarcodeData,
  getExpire,
} = require("../controllers/barcodeController");

router.post("/uploadproducts", storeBarcodeData);
router.get("/getproducts/:barcodeId", getBarcodeData);
router.get("/expire/:barcodeId", getExpire);

module.exports = router;
