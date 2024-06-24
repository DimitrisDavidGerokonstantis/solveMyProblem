import mongoose from "mongoose";

const Results_Schema = new mongoose.Schema({
    userID: { type: mongoose.SchemaTypes.ObjectId, required: true },
    model: { type: String, default: null },
    date: {type: Date},
    execTime: { type: Number, default: null }
});

export default mongoose.model("Results", Results_Schema);