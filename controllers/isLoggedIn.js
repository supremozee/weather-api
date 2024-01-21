const userDetailsModel = require("../models/userDetailsModel");
const { StatusCodes } = require("http-status-codes");

const isLoggedIn = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const userData = await userDetailsModel.findOne({
      email,
      isLoggedIn: true,
    });
    console.log(userData);
    if (userData) {
      return res.status(StatusCodes.OK).json("true");
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("false");
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("false");
  }
};

module.exports = isLoggedIn;
