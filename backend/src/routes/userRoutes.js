import express from "express"
import UserController from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.route("/all").get((req, res) => {
    return new UserController().getAllUsers(req, res)
})

userRouter.route("/login").post((req, res) => {
    return new UserController().loginUser(req, res)
})

userRouter.route("/register").post((req, res) => {
    return new UserController().registerUser(req, res)
})

userRouter.route("/findUser").post((req, res) => {
    return new UserController().findUser(req, res)
})

export default userRouter