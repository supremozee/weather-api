const mongoose = require("mongoose");

const UserDetailsModel = new mongoose.Schema(
  {
    // ... your existing fields
    username: {
      type: String,
      minlength: 1,
      maxlength: 50,
      required: [true, "Please provide a username"],
    },
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 1,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
  },
  {
    timestamps: true, // Add timestamps (createdAt, updatedAt)
  }
);

module.exports = mongoose.model("UserDetails", UserDetailsModel);
