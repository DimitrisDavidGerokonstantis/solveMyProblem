import mongoose from "mongoose"

const Schema=mongoose.Schema

const problemsSchema=new Schema({
    userID : Number,
    pythonScript : {
        "script": String,
        "info": String
    },
    inputDataFile : {
        "content":{
            "Locations": [
                {
                    "Latitude": Number,
                    "Longitude": Number,
                }
            ]
        },
        "info": String
    },
    extraParams : {
        "numVehicles": Number,
        "depot": Number,
        "maxDistance": Number
    },
    status : String,
    createdAt : {
        type : Date,
        immutable: true,
        default : ()=>Date.now()
    },
    updatedAt: {
        type : Date,
        default : ()=>Date.now()
    },
})


problemsSchema.pre('save', function(next){
    this.updatedAt=Date.now()
    next()
})

export default mongoose.model('Problems', problemsSchema)
