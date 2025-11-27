const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fristName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    role:{
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  { timestamps: true } //createdAt, updatedAt
);
module.exports = mongoose.model("User", userSchema);
