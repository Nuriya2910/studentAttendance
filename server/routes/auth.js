const {Router} = require('express')

// const { 
//     register, 
//     login
// } = require('../middleware/autentification')
const { 
    signUp, 
    signIn 
} = require('../controllers/teacherGroup')


const router = Router()

// router.post('/signUp', register)
// router.get('/signIn', login)
router.get('/signUp', signUp)
router.get('/signIn', signIn)
module.exports = router