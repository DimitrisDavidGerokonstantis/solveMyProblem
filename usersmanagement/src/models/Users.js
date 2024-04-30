import mongoose from "mongoose";

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    default: 100,
  },
  role: {
    type: String,
    default: "user",
  },
});

export default mongoose.model("Users", usersSchema);
