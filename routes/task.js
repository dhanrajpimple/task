const express = require("express");
const router = express.Router();

const {register,login,forgetPassword} = require("../controller/taskController");

router.post("/login", login);
router.post("/register", register);
router.put("/forget", forgetPassword);

module.exports = router;