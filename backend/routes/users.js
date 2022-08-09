const express = require("express");
const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/usersController");
const requireAdmin = require("../middleware/requireAdmin");
const requireAuth = require('../middleware/requireAuth')
const router = express.Router();

// require Admin for all user routes
//router.use(requireAdmin);

// require auth for all workout routes
router.use(requireAuth)

// GET all users
router.get("/", getUsers);

//GET a single user
router.get("/:id", getUser);

// POST a new user
router.post("/", createUser);

// DELETE a user
router.delete("/:id", deleteUser);

// UPDATE a user
router.patch("/:id", updateUser);

module.exports = router;
