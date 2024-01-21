const userDetailsModel = require("../models/userDetailsModel");
const { StatusCodes } = require("http-status-codes");

const logout = async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await userDetailsModel.findOne({
      email,
    });
    if (userData) {
      await userDetailsModel.findOneAndUpdate({ email }, { isLoggedIn: false });
      return res.status(StatusCodes.OK).json("true");
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("false");
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("false");
  }
};

module.exports = logout;
