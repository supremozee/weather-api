const userDetailsModel = require("../models/userDetailsModel");
const { StatusCodes } = require("http-status-codes");
const { MongoError } = require("mongodb");

const register = async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(StatusCodes.OK).json("invalid");
  }
  try {
    const userData = await userDetailsModel.create({
      email,
      username,
      password,
      isLoggedIn: true,
    });
    if (userData) {
      return res.status(StatusCodes.OK).json("true");
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("false");
    }
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      return res.status(StatusCodes.OK).json("exists");
    } else {
      console.error("Something went wrong");
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something went wrong, try later");
    }
  }
};

module.exports = register;
