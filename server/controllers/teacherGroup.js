const Teacher = require('../models/Teacher')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

exports.index = async (req, res) => {
    let { idTeacher } = req.query  
    console.log(idTeacher)
    let data = await Teacher.findById(idTeacher, ['group'])
    if (data) {
        res.json({ title: 'Teacher`s all group', data: data })
    }
}

exports.signUp = async (req, res, next) => {
    const { firstName, lastName, email, subject, phone, password, status} = req.body;
    const data = await Teacher.findOne({ email })
    if(status!=="teacher"){
        res.json({ dsc: 'This is not a teacher!' })
    }
    else{
        if (data) {
            res.json({ dsc: 'Such a teacher exists' })
        } else {
            const hash = await bcrypt.hash(password, 12);
            const teacher = await Teacher.create({ ...req.body, password: hash })
            res.json({ dsc: 'Teacher created' })
        }
    }
}

exports.signIn = async (req, res, next) => {
    const { email, password } = req.body
    // Check if login and password is provided
    if (!email || !password) {
        return res.status(400).json({
            message: "Email or Password not present",
        })
    }
    try {
        const teacher = await Teacher.findOne({ email })
        if (!teacher) {
            res.status(400).json({
                message: "Email not successful",
                error: "Teacher not found",
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
