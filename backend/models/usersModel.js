const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: Array,
      required: false,
    },
    displayName: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", usersSchema);
