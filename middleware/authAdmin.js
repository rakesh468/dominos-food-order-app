const Users=require("../models/usermodels")

const authAdmin = async (request, response, next) => {
  try {
    //get user information by id//
    const user = await Users.findOne({
      _id: request.user.id,
    });
    if (user.role === 0)
      return response
        .status(400)
        .json({ msg: "Admin resource access denaied" });
    next();
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};

module.exports = authAdmin;