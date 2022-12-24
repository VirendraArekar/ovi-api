const express = require("express")
const router = express.Router()
const { checkToken } = require('../middleware/token_validation');


// controllers
const { createLead, findAll, assignLead, updateById, findLeadByCouncellor, deleteLead, leadByUserId, getLeadById} = require('../controllers/lead.controller')
const multer = require('multer')
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/uploads/lead');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });
const multiUpload = upload.fields([{ name: "proofOfFunds", maxCount: 1 }, { name:"incomeProof" , maxCount:1}])

// routes
router.post('/create',checkToken,multiUpload, createLead)
router.get('/all', findAll)
router.get('/:id', findLeadByCouncellor )
router.get('/leadbyuser/:id' , leadByUserId)
router.get('/leadbyid/:id' , getLeadById)
router.put('/assignto/:id', assignLead)
router.get('/leadbycounsellor/:id', findLeadByCouncellor)
router.put('/update/:id',checkToken,multiUpload, updateById)
router.delete('/delete/:id' , deleteLead)

module.exports = router