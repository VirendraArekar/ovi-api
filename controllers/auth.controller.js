const { sign } = require("jsonwebtoken");
const { compareSync, hashSync, genSaltSync } = require("bcrypt");
const AdminModel = require("../models/admin.model");

// API - Create admin 
const createAdmin = async (req, res, next) => {
  const { userName, password } = req.body;
  const salt = genSaltSync(10);
  const hashPassword = hashSync(password, salt);
  try {
    const Admin = new AdminModel({
      userName: userName,
      password: hashPassword,
      role: "admin",
    });
    const savedAdmin = await Admin.save();
    res.status(200).send({
      success: true,
      data: savedAdmin,
      message: 'Admin Created Successfully',
    });
  } catch (error) {
    if (error.message) {
      return res.status(400).send({
        success: false,
        data: null,
        message: error.message,
      });
    }
    res.status(400).send({
      success: false,
      data: null,
      message: "Some thing went wrong",
    });
  }
};


 // API - signIn a admin
const signIn = async (req, res, next) => {
  const { userName, password } = req.body;
  AdminModel.findOne({ userName: userName }, function (error, user) {
    if (error) {
      return res.status(400).json({
        success: false,
        data: null,
        message: `User not found with given username - ${userName}`
      });
    } else {
      if (user !== null && user !== undefined) {
        const isPasswordSame = compareSync(password, user.password);
        if (isPasswordSame) {
          const jsonToken = sign({id:user._id , userName:user.userName , role: user.role}, "qwe1234", { expiresIn: '365d' });
          user.password = undefined;
          return res.status(200).send({
            success: true,
            message:'Login Successfully',
            data: { token: jsonToken, user: user },
          });
        }
      }
      res.status(403).send({
        success: false,
        data: null,
        message: "Invalid username or password",
      });
    }
  });
};

module.exports = {
  signIn,
  createAdmin,
};
