const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')


exports.register = async (req, res, next) => {
    const { login, password } = req.body;
    const data = await User.findOne({ login })
    if (data) {
        res.json({ dsc: 'Such a user exists' })
    } else {
        const hash = await bcrypt.hash(password, 12);
        const user = await User.create({ ...req.body, password: hash })
        res.json({ dsc: 'User created' })
    }
}
    
exports.login = async (req, res, next) => {
    const { login, password } = req.body
    // Check if login and password is provided
    if (!login || !password) {
        return res.status(400).json({
            message: "Username or Password not present",
        })
    }
    try {
        const user = await User.findOne({ login })
        if (!user) {
            res.status(400).json({
                message: "Login not successful",
                error: "User not found",
            })
        } else {
            // comparing given password with hashed password
            let isValid = bcrypt.compare(password, user.password)
            if (!isValid) {
                res.status(400).json({ message: "Login not succesful" })

            } else {
                let payload = {
                    id: user.id,
                    status: user.status
                }
                const token = await jwt.sign(payload, process.env.jwt_key, { expiresIn: '1h' })
                res.status(200).json({
                    message: "Login successful",
                    token

                })
            }
        }
        next()
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }
}


