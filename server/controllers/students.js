const Student = require('../models/User')
const Teacher = require('../models/User')
const bcrypt = require("bcryptjs")


exports.index = async (req, res) => {
    let data = await Student.find({role: 'student'},["firstName", "lastName", "email", "phone", "parentsPhone", "password", "role", "attendance"] )
    if (data) {
        res.json({ title: 'All student', data: data })
    }
}

exports.show = async (req, res) => {
    let data = await Student.findById(req.params.id)
    if (data) {
        res.json({ title: 'Special student', data: data })
    }
}

exports.create = async (req, res) => { 
    let { firstName, lastName, email, phone, parentsPhone, password } = req.body;

    try{
        if (firstName && lastName && email && phone && parentsPhone && password) {
        let student = new Student({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            parentsPhone: req.body.parentsPhone,
            password: req.body.password,
            role: "student"
        })
        student.save()
        .then(async data => { 
            if (data){ 
                 const hash = await bcrypt.hash(data.password, 12)
                 data.password = hash
                res.json({ title: 'Student created', data: data })
            }
        })
    }
    else {
        res.json({ title: 'Ma`lumot toliq emas' })
    }
}catch(err){
    res.json({dsc: err})
}
}

exports.remove = async (req, res) => {
    let data = await Student.findByIdAndDelete(req.params.id)
    if (data) {
        res.json({ title: 'Student removed', data: data })
    }
}

exports.update = async (req, res) => {
    let { firstName, lastName, email, phone, parentsPhone, password } = req.body;

    if (firstName && lastName && email && phone && parentsPhone && password) {
        let data = await Student.findByIdAndUpdate(req.params.id, req.body)
        if (data) {
            res.json({ title: 'Student edited', data: data })
        }
    }
    else {
        res.json({ title: 'Ma`lumot yo`q' })
    }
}

exports.addStudentToGroup = async (req, res) => {
    let { idTeacher, IdGroup, idStudent } = req.body
    if (idTeacher && IdGroup && idStudent) {
        let teacher = await Teacher.findById(idTeacher)
        if (!teacher) {
            res.json({ title: "Teacher not found" })
        } else {
            let student = await Teacher.findById(idTeacher, { group: { $elemMatch: { _id: IdGroup } } })
            let qwe = student.group[0].students.filter(elem => elem == idStudent)
            if (qwe.length > 0) {
                res.json({ title: "Bunday oquvchi allaqachon mavjud" })

            } else {
                let group = await Teacher.findOneAndUpdate(
                    {
                        _id: idTeacher,
                        "group._id": IdGroup
                    },
                    {
                        $push: {
                            "group.$.students": idStudent
                        }
                    })

                res.json({ title: "Success", group })

            }

            // res.json({ title: "Success", student })

        }
    } else {
        res.json({ title: "Data is not defined" })
    }

}

exports.removeStudentFromGroup = async (req, res) => {
    let { idTeacher, IdGroup, idStudent } = req.body
    if (idTeacher && IdGroup && idStudent) {
        let teacher = await Teacher.findById(idTeacher)
        if (!teacher) {
            res.json({ title: "Teacher not found" })
        } else {
            let group = await Teacher.findOneAndUpdate(
                {
                    _id: idTeacher,
                    "group._id": IdGroup
                },
                {
                    $pull: {
                        "group.$.students": idStudent
                    }
                })

            res.json({ title: "Success", group })

        }


    } else {
        res.json({ title: "Data is not defined" })
    }


}
