import mongoose from "mongoose"

const User = new mongoose.Schema(
    {
        type: {type:String},
        username: {type:String},
        password: {type:String},
        firstname: {type:String},
        lastname: {type:String},
        address: {type:String},
        phone: {type:String},
    }
)

export default mongoose.model("User", User, "korisnici")