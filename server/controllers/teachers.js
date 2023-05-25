// const { title } = require('process')
const Teacher = require('../models/User')
const bcrypt = require("bcryptjs")


exports.index = async (req, res) => {
    let data = await Teacher.find({ role: "teacher" }, ["firstName", "lastName", "email", "subject", "phone", "password", "role", "group"])
    if (data) {
        res.json({ title: 'All teacher', data: data })
    }
}

exports.show = async (req, res) => {
    let data = await Teacher.findById({_id : req.params.id},["firstName" , "lastName", "email", "subject", "phone", "password", "group"])
    if (data) {
        res.json({ title: 'Special teacher', data: data })
    }
}

exports.create = async (req, res) => {
    let { firstName, lastName, email, subject, phone, password } = req.body;
    try {
        if (firstName && lastName && email && subject && phone && password ) {
            let teacher = new Teacher({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                subject: req.body.subject,
                phone: req.body.phone,
                password: req.body.password,
                role: "teacher"
            })
            teacher.save()
                .then(async data => { 
                    if (data){ 
                         const hash = await bcrypt.hash(data.password, 12)
                         data.password = hash
                        res.json({ title: 'Teacher created', data: data })
                    }
                })
      
        }
        else {
            res.json({ title: 'Ma`lumot toliq emas' })
        }
    }
    catch (err) {
        res.json({ err })
    }
}

exports.remove = async (req, res) => {
    let data = await Teacher.findByIdAndDelete(req.params.id)
    if (data) {
        res.json({ title: 'Teacher removed', data: data })
    }
}

exports.update = async (req, res) => {
    let { firstName, lastName, email, subject, phone, password } = req.body;
    if (firstName || lastName || email || subject || phone || password) {
        let data = await Teacher.findByIdAndUpdate(req.params.id, req.body)
        if (data) {
            res.json({ title: 'Teacher edited', data: data })
        }
    }
    else {
        res.json({ title: 'Ma`lumot yo`q' })
    }
}
