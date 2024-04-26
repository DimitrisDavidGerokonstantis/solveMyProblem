import mongoose from "mongoose"

const Schema=mongoose.Schema

const problemsSchema=new Schema({
    userID : Number,
    pythonScript : {
        "script": String
    },
    inputDataFile : {
        "Locations": [
            {
                "Latitude": Number,
                "Longitude": Number,
            }
        ]
    },
    status : String,
})

export default mongoose.model('Problems', problemsSchema)
