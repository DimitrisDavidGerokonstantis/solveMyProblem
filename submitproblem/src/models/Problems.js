import mongoose from "mongoose"

const Schema=mongoose.Schema

const problemsSchema=new Schema({
    name : String,
    description : String
})

export default mongoose.model('Problems', problemsSchema)
