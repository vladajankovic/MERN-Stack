import Order from "../models/Order.js"


export default class OrderController {

    async addNewOrder(req, res) {
        let query = Order.countDocuments({})
        let result = await query.exec()
        req.body.id = result + 1
        await Order.create(req.body)
        .then(() => res.send({status:200}))
        .catch((err) => {console.log(err); res.send({status:500})})
    }

    async getUserOrders(req, res) {
        let user = req.body
        let query = Order.find({user: user.username})
        let result = await query.exec()
        res.send(result)
    }

    async getPendingOrders(req, res) {
        let query = Order.find({status: "Na čekanju"})
        let result = await query.exec()
        res.send(result)
    }

    async setOrderStatus(req, res) {
        let order = req.body.order
        let status = req.body.status
        let result = await Order.updateOne({id: order.id}, {status: status})
        if (result.acknowledged) {
            res.send({status:200})
        }
        else {
            console.log(result)
            res.send({status:500})
        }
    }

}