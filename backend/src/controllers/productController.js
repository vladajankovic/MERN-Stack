import Product from "../models/Product.js";


export default class ProductController {

    async getAllProducts(req, res) {
        const query = Product.find({})
        const result = await query.exec()
        res.send(result)
    }

    async addNewProduct(req, res) {
        await Product.create(req.body)
        .then(() => res.send({status:200}))
        .catch((err) => {console.log(err); res.send({status:500})})
    }

    async findProduct(req, res) {
        let image = req.body.productImg
        let query = Product.find({image: image})
        let result = await query.exec()
        res.send(result)
    }

    async addComment(req, res) {
        let product = req.body
        let result = await Product.updateOne({name: product.name}, {comments: product.comments})
        if (result.acknowledged) {
            res.send({status:200})
        }
        else {
            console.log(result)
            res.send({status:500})
        }
    }
    
}

