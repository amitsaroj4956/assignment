import express from "express";
import mongoose from "mongoose";

import user from "../models/users.js";

const app = express();
app.use(express.static(`/images`));
const router = express.Router();

export const getAllusers = async (req, res) => {

  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const adduser = async (req, res) => {
  
  const { firstName, lastName, mobileNumber } = req.body;
  const profilePic = req.file?.originalname;
  const createNewUser = new user({
    firstName,
    lastName,
    mobileNumber,
    profilePic,
  });

  try {
    await createNewUser.save();
    res.status(201).json(createNewUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getSingleUser = async (req, res) => {
  const { id } = req.params;

  try {
    const singlepost = await user.findById(id);

    res.status(200).json(singlepost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateSingleuser = async (req, res) => {

  const { id } = req.params;
  const { firstName, lastName, mobileNumber } = req.body;
  const profilePic =  req.body.file || req.body.profilePic 
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`post ${id} not found`);

  const updateduser = {
    firstName,
    lastName,
    mobileNumber,
    profilePic,
    _id: id,
  };
  await user.findByIdAndUpdate(id, updateduser, { new: true });
  res.json(updateduser);
};

export const removeSingleuser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`user ${id} not found`);

  await user.findByIdAndRemove(id);

  res.json({ message: "Successfully deleted", status: true });
};

export default router;
