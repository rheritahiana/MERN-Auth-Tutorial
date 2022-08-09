const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAdmin = async (req, res, next) => {
  // verify user is Authorized
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];


    // verify user is Admin
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({
      _id,
    });

    /*     _id: new ObjectId("62f21c48308c74acfb88ccd9"),
    email: 'adresss@xxxx.mg',
    password: '$2b$10$q7E9qB7ij9v2uTfBZL3ZCuP4JrHJGMGbmkkSF8pYC9BkeeTJlJxC6',
    __v: 0,
    roles: [ 'user', 'admin', 'editor' ]
     */

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Admin required" });
  }
};

module.exports = requireAdmin;
