const Teacher = require('../models/User')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

exports.index = async (req, res) => {
    let { idTeacher } = req.query
    if (!idTeacher) {
        res.json({ title: "Enter Teacher's id!" })
    } else {
        let data = await Teacher.findById(idTeacher, ['group'])
        if (data) {
            res.json({ title: 'Teacher`s all group', data: data })
        }
    }
}
exports.showGroup = async (req, res) => {
    let { idTeacher } = req.query
    if (!idTeacher) {
        res.json({ title: "Enter Teacher's id!" })
    } else {

        const data = await Teacher.findById(req.query.idTeacher).select({ group: { $elemMatch: { _id: req.params.id } } })
        if (data) {
            res.json({ title: 'Special group', data: data })
        }
        else {
            res.json({ title: 'Xato' })
        }
    }
}

    exports.update = async (req, res) => {
        let { email, password } = req.body;
        if (email || password) {
            let user = {
                email: req.body.email,
                password: req.body.password
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

