const Teacher = require('../models/User')
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
exports.showGroup = async (req, res) => {
    const data = await Teacher.findById(req.query.idTeacher).select({ group: { $elemMatch: { _id: req.params.id } } })
    if (data) {
        res.json({ title: 'Special group', data: data })
    }
    else {
        res.json({ title: 'Xato' })
    }
}

exports.update = async (req, res) => {
    let {  email, password } = req.body;
    if (email || password) {
        let user = {
            email : req.body.email,
            password : req.body.password
        }
        const hash = await bcrypt.hash(user.password, 12);
      user.password = hash
        let data = await Teacher.findByIdAndUpdate(req.params.id, user)
        if (data) {
            res.json({ title: 'Teacher edited', data: data })
        }
    }
    else {
        res.json({ title: 'Ma`lumot yo`q' })
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
