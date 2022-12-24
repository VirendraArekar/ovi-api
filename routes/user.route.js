const express = require("express");
const router = express.Router();
const { createUser, findAll, userSignIn, updateById, deleteById, userResetpassword, getUserByRole } = require("../controllers/user.controller");
const multer = require('multer');
const { checkToken } = require("../middleware/token_validation");
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/uploads/user');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage }).single('profilePhoto');

router.post("/create",upload, createUser);
router.get("/all", findAll);
router.post("/signin", userSignIn);
router.put("/update/:id", updateById);
router.get("/userbyrole" , getUserByRole)
router.delete("/delete/:id", deleteById);
router.put('/password-reset/:id' , userResetpassword)

module.exports = router;