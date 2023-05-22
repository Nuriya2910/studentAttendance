exports.checkAdmin = async (req, res, next) =>{
    if(req.user.status==="admin"){
        next()
    }else{
        res.json({title: "error", message: "No authorization on this role"})
    }
}

exports.checkTeacher = async (req, res, next) =>{
    if(req.user.status==="teacher" || req.user.status==="admin"){
        next()
    }else{
        res.json({title: "error", message: "No authorization on this role"})
    }
}

exports.checkStudent = async (req, res, next) =>{
    if(req.user.status==="student" || req.user.status==="admin"){
        next()
    }else{
        res.json({title: "error", message: "No authorization on this role"})
    }
}