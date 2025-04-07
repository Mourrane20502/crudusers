const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  deleteUser,
} = require("../controller/userController");

// GET ALL USERS
router.get("/users", getAllUsers);

// CREATE USER
router.post("/users", createUser);

// DELETE USER
router.delete("/users/:id", deleteUser);

module.exports = router;
