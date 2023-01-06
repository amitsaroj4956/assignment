import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  profilePic: String,
  mobileNumber: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var user = mongoose.model("user", userSchema);

export default user;
