const User = require("../database/users");
const express = require("express");
const app = express();
app.use(express.json());

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "users fetched successfully",
      users: users,
    });
  } catch (err) {
    console.log("error", err);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({
      name: name,
      email: email,
    });
    await user.save();
    console.log("user created successfully", user);
  } catch (err) {
    console.log("error", err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    if (!findUser) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "user deleted successfully" });
  } catch (err) {
    console.log("error", err);
  }
};

module.exports = { getAllUsers, createUser, deleteUser };
