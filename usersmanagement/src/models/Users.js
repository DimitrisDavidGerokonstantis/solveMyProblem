import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the schema for a user
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
  totalExecTime: {
    type: Number,
    default: 0,
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
  joinedAt: {
    type: Date,
    immutable: true,
    required: true,
    default: () => Date.now(),
  },
});

// create the users model related to the previous schema
export default mongoose.model("Users", usersSchema);
