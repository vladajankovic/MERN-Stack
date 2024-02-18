import mongoose from "mongoose"

const Order = new mongoose.Schema(
    {
        id:{type:Number},
        user:{type:String},
        status:{type:String},
        order:{type:Array}
    }
)

export default mongoose.model("Order", Order, "narudzbine")