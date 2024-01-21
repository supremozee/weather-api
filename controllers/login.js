const userDetailsModel = require("../models/userDetailsModel");
const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(StatusCodes.OK).json("invalid");
  }
  try {
    const userData = await userDetailsModel.findOne({
      email,
      password,
    });
    if (userData) {
      await userDetailsModel.findOneAndUpdate(
        { email, password },
        { isLoggedIn: true }
      );
      return res.status(StatusCodes.OK).json("true");
    } else {
      return res.status(StatusCodes.OK).json("dontexist");
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("false");
  }
};

module.exports = login;
