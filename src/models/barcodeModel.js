const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "pls enter name"],
    },
    imageUrl: {
      type: String,
      default: "",
    },
    barcodeId: {
      type: String,
      require: [true, "enter barcode id"],
    },
    category: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    expiryDate: {
      type: Date,
      require: [true, "pls enter expiry date"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("barcode", userSchema);
