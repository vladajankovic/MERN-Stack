import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/userRoutes.js"
import productRouter from "./routes/productRoutes.js"
import orderRouter from "./routes/orderRoutes.js"

const app = express()
app.use(express.json())
app.use(cors())

const router = express.Router()


app.use("/", router)
router.use("/users", userRouter)
router.use("/products", productRouter)
router.use("/orders", orderRouter)



mongoose.connect("mongodb://localhost:27017/poslasticarnica")
.then(()=>{
    console.log("MongoDB connected")
    app.listen(4000, () => console.log("Server running on port 4000"))
})
.catch((err)=>{
    console.log(err)
})


