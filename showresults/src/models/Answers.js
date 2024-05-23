import mongoose from "mongoose";

const Schema = mongoose.Schema;

const answersSchema = new Schema({
  userID: mongoose.SchemaTypes.ObjectId,
  answer : {
    type: {
        Objective: Number,
        Routes: [
            {
                Route: String,
                Route_distance: String
            }
        ],
        Maximum_distance: String
    },
    default: null
}
});

// problemsSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

export default mongoose.model("Answers", answersSchema);
