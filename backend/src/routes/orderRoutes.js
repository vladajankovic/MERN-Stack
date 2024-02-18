import express from 'express'
import OrderController from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.route("/newOrder").post((req, res) => {
    return new OrderController().addNewOrder(req, res)
})

orderRouter.route("/userOrders").post((req, res) => {
    return new OrderController().getUserOrders(req, res)
})

orderRouter.route("/pendingOrders").get((req, res) => {
    return new OrderController().getPendingOrders(req, res)
})

orderRouter.route("/setStatus").post((req, res) => {
    return new OrderController().setOrderStatus(req, res)
})

export default orderRouter