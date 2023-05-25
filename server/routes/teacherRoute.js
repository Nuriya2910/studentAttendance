const {Router} = require('express')
const { 
    index,
} = require('../controllers/groups')
const { 
    show, 
} = require('../controllers/teachers')
const { 
    update
 } = require('../controllers/teacherGroup')



const router = Router()

router.get('/', index)
router.get('/profile/:id', show)
router.put('/profile/:id', update)





module.exports = router