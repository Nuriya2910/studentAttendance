// const { title } = require('process')
const Student = require('../models/User')

exports.index = async (req, res) => {
    let { idStudent } = req.query
    let data = await Student.findById(idStudent, ['attendance'])
    if (data) {
        res.json({ title: 'Student`s all attendance', data: data })
    }
}

exports.create = async (req, res) => {
    let { data, idStudent, idAttendance } = req.body
    if (!data) {
        res.json({ title: "Data not found" })
    } else {
        req.body.data.map(async item => {
            try {
                    let user = await Student.findByIdAndUpdate(item.id, {
                        $push: {
                            attendance: {
                                date: item.attendance.date,
                                absend: Boolean(item.attendance.absend),
                                score: Number(item.attendance.score)
                            }
                        }
                    })
                    // user.attendance.date.getFullYear()
                    res.json({ title: "Attendance added to Student", data: user });
                
                } catch (error) {
                    res.json(error);
                }
            })
    }
}

exports.remove = async (req, res) => {
    if (req.query.idStudent && req.query.idAttendance) {
        const data = await Student.findByIdAndUpdate(req.query.idStudent, {
            $pull: { attendance: { _id: req.query.idAttendance } }
        })
        if (data) {
            res.json({ title: 'Attendance deleted', data })
        }
    } else {
        res.json({ title: "Error", desc: "Bunday talaba mavjud emas" })
    }
}

exports.update = async (req, res) => {
    const { status, date, reason, score } = req.body;
    if (req.query.idStudent && req.query.idAttendance) {
        if (status || date || reason || score) {
            const data = await Student.findOneAndUpdate(
                {
                    _id: req.query.idStudent,
                    "attendance._id": req.query.idAttendance
                },
                {
                    $set: {
                        "attendance.$": { ...req.body, _id: req.query.idAttendance }
                    }
                })
            if (data) {
                res.json({ title: 'Attendance updated', data })
            } else {
                res.json({ title: 'Xatolik' })
            }
        }
    }
}



