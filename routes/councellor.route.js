const express = require("express")
const router = express.Router();
const path = require('path')

// controllers
const { create, list, update, remove,counsellorByBranchId } = require('../controllers/councellor.controller')
const multer = require('multer')
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/uploads/counsellor');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage }).single('profilePhoto');


// routes
router.post('/create', upload, create)
router.get('/all', list)
router.get('/counsellorbybranch/:id' , counsellorByBranchId)

router.put('/update/:id',upload, update)
router.delete('/delete/:id', remove)

module.exports = router