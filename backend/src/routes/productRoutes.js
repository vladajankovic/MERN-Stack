import express from "express"
import ProductController from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.route("/all").get((req, res) => {
    return new ProductController().getAllProducts(req, res)
})

productRouter.route("/newProduct").post((req, res) => {
    return new ProductController().addNewProduct(req, res)
})

productRouter.route("/findProduct").post((req, res) => {
    return new ProductController().findProduct(req, res)
})

productRouter.route("/addComment").post((req, res) => {
    return new ProductController().addComment(req, res)
})

export default productRouter
