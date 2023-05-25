const {Router} = require('express')

const { 
    login
} = require('../middleware/autentification')



const router = Router()

router.get('/signIn', login)

module.exports = router