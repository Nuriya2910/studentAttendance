const { Router } = require('express')
const {
    index,
} = require('../controllers/groups')
const {
    show,
} = require('../controllers/teachers')
const {
    update
} = require('../controllers/teacherGroup')
const {
    create,
} = require('../controllers/students')


const router = Router()

router.get('/', index)
router.get('/profile', show)
router.put('/profile', update)
router.put('/student', create )





module.exports = router