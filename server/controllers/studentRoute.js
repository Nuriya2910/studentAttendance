const Student = require('../models/User')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')


exports.update = async (req, res) => {
    let {  email, password } = req.body;
    if (email || password) {
        let user = {
            email : req.body.email,
            password : req.body.password
        }
        const hash = await bcrypt.hash(user.password, 12);
        user.password = hash
        let data = await Student.findByIdAndUpdate(req.params.id, user)
        if (data) {
            res.json({ title: 'Student edited', data: data })
        }
    }
    else {
        res.json({ title: 'Ma`lumot yo`q' })
    }
}

exports.getScore = async (req, res)=>{
    let data = await Student.find({role: "student"}).sort({ 'attendance.score': -1}).limit(3)
    // let data = Student.collection.aggregate(
        // {
        //     $match: {
        //         role : "student"
        //     }
        // },
        // {
        //     $unwind : '$attendance'
        // },
        // {
        //     $sort:{
        //         'attendance.score': -1
        //     }
        // }

    //   [  {$set:{
     
    //       attendance:{
    //           $sortArray: {
    //               input: '$score',
    //               sortBy: {score: -1}
    //             }
    //         }
        
    //     }}]
    // )
    res.json(data)
}