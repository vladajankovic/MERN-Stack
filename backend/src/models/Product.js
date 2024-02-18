import mongoose from "mongoose"

const Product = new mongoose.Schema(
    {
        type:{type:String},
        name:{type:String},
        image:{type:String},
        decription:{type:String},
        price:{type:Number},
        ingredients:{type:String},
        comments:{type:Array}
    }
)

export default mongoose.model("Product", Product, "proizvodi")