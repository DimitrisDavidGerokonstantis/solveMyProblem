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
  email: {
    type: String,
    default: "",
  },
  google_access_token: { type: String, default: "" },
  picture: { type: String, default: "" },
});

export default mongoose.model("Users", usersSchema);
