const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      require: [true, "pls enter your first name"],
    },
    lname: {
      type: String,
      require: [true, "pls enter your last name"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [isEmail, "invalid email"],
    },
    phone: {
      type: Number,
      unique: true,
      required: "Phone number is required",
      match: /^(0|91)?[6-9][0-9]{9}$/,
    },

    password: {
      type: String,
      required: "password required",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("users", userSchema);
