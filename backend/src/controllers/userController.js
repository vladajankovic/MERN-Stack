import User from "../models/User.js"

export default class UserController {

    async getAllUsers(req, res) {
        const query = User.find({})
        const result = await query.exec()
        res.send(result)
    }

    async findUser(req, res) {
        const query = User.countDocuments({username: req.body.username})
        const result = await query.exec()
        res.send({count: result})
    }

    async loginUser(req, res) {
        let user = req.body
        const query = User.find({username:user.username, password:user.password})
        const result = await query.exec()
        res.send(result)
    }

    async registerUser(req, res) {
        await User.create(req.body)
        .then(() => res.send({status:200}))
        .catch((err) => {console.log(err); res.send({status:500})})
    }

}