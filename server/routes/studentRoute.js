const {Router} = require('express')
const { 
    index,
} = require('../controllers/groups')
const { 
    show, 
} = require('../controllers/students')
const { 
    update, 
    getScore 
} = require('../controllers/studentRoute')



const router = Router()

router.get('/', getScore)
router.get('/profile/:id', show)
router.put('/profile/:id', update)





module.exports = router