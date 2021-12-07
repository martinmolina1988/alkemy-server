const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const recordController = require('../controllers/recordController')
const verifyToken = require('./verifyToken')



//router para las vistas
router.get('/', verifyToken,  (req, res)=>{    
    res.json({ auth: true, id: req.id})
})
router.get('/users',  verifyToken, authController.users);
router.get('/register', (req, res)=>{
    res.render('register')
})



// USER
router.get('/logout', authController.logout)


router.post('/register', authController.register)
router.post('/login',authController.login)



// RECORD
router.get('/balance',verifyToken, recordController.balance)
router.get('/orderBy',verifyToken, recordController.orderBy)
router.get('/getRecords',verifyToken, recordController.getRecords)
router.get('/getRecord',verifyToken, recordController.getRecord)
router.get('/getAllConcepts',verifyToken, recordController.getAllConcepts)

router.post('/insertRecord',verifyToken, recordController.insertRecord)
router.put('/updateRecord',verifyToken, recordController.updateRecord)
router.delete('/deleteRecord',verifyToken, recordController.deleteRecord)
module.exports = router  