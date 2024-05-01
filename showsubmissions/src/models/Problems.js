import mongoose from "mongoose";

const Schema = mongoose.Schema;

const problemsSchema = new Schema({
  userID: mongoose.SchemaTypes.ObjectId,
  name: String,
  model: String,
  status: String,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

// problemsSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

export default mongoose.model("Problems", problemsSchema);
