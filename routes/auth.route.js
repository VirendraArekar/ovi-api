const express = require("express");
const router = express.Router();
const { signIn, createAdmin } = require("../controllers/auth.controller");
const { checkToken } = require('../middleware/token_validation');

router.post("/signin", signIn);
router.post("/create-admin", createAdmin);

module.exports = router;
