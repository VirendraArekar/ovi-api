const { sign } = require("jsonwebtoken");
const { compareSync, hashSync, genSaltSync } = require("bcrypt");
const UserModel = require('../models/user.model');
const { default: mongoose } = require("mongoose");
const multer = require('multer');
const fs = require('fs')


//Find All Users
exports.findAll = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const rowsperpage = req.query.rowsperpage;
    const user = await UserModel.find({ role: { $not: { $eq: '636cc01716a2d2f2b6344412' } } }, { password: 0 })
      .skip(rowsperpage * (page - 1))
      .limit(rowsperpage)
      .sort({ createdAt: -1 })
      .populate('role').exec()

    res.status(200).send({
      success: true,
      data: user,
      message: "Users Fetched Successfully"
    })
  } catch (error) {
    next(error)
  }
};

//Create User
exports.createUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    company,
    date,
    role,
    mobile,
    email,
    status,
    permission,
    reportingTo,
    password
  } = req.body;

  const salt = genSaltSync(10);
  const hashPassword = hashSync(password, salt);
  try {
    let User;
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.headers.host}`;
      const fullPath = `${baseUrl}/uploads/user/${req.file?.filename}`
      User = new UserModel({
        firstName,
        lastName,
        company,
        date,
        reportingTo,
        role,
        status,
        profilePhoto: fullPath,
        mobile,
        email,
        permission,
        password: hashPassword,
      })
    } else {
      User = new UserModel({
        firstName,
        lastName,
        company,
        date,
        role,
        status,
        mobile,
        email,
        reportingTo,
        permission,
        password: hashPassword,
      })
    }
    const savedUser = await User.save();
    savedUser.password = undefined
    res.status(200).send({ success: true, data: savedUser, message: `User Created Successfully` });
  } catch (error) {
    next(error)
  }
};

// API - signIn a user
exports.userSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findOne({ email }, function (error, user) {
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
          const jsonToken = sign({user}, "qwe1234", { expiresIn: '365d' });
          user.password = undefined;
          return res.status(200).send({
            success: true,
            message: 'Login Successfully',
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
  }).populate('role');
};

//Update User By Id
exports.updateById = async (req, res, next) => {
  const { id } = req.params;
  let hashPassword
  const {
    firstName,
    lastName,
    company,
    date,
    role,
    mobile,
    email,
    reportingTo,
    status,
    permission,
    password
  } = req.body;
  if (req.body.password) {
  const salt = genSaltSync(10);
  hashPassword = hashSync(password, salt);
  }
  try {
    let updated;
    const options = {
      new: true
    }
    
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.headers.host}`;
      const fullPath = `${baseUrl}/uploads/user/${req.file?.filename}`
      updated = await UserModel.findByIdAndUpdate(id, {
        firstName,
        lastName,
        company,
        date,
        role,
        reportingTo,
        status,
        profilePhoto: fullPath,
        mobile,
        email,
        permission,
        password: hashPassword,
      }, options)
    } else {
      updated = await UserModel.findByIdAndUpdate(id, {
        firstName,
        lastName,
        company,
        date,
        role,
        status,
        mobile,
        reportingTo,
        email,
        permission,
        password: hashPassword,
      }, options)
    }
    res.status(200).send({
      success: true,
      data: updated,
      message: "User updated successfully"
    })
  } catch (error) {
    next(error)
  }

}

exports.getUserByRole = async (req, res, next) => {
  try {
    const type = req.query.type;
    let users;
    if (type === "counsellor") {
      users = await UserModel.find({ role: "63761b3b80ce99e2d0615ee3" })
    } else if (type === "processExecutive") {
      users = await UserModel.find({ role: "6376a0d076461924ac942256" })
    }
    res.status(200).send({
      success: true,
      data: users,
      message: "User fetched successfully"
    })
  } catch (error) {
    next(error)
  }
}
//Delete User BY Id
exports.deleteById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(req.params.id)
    if (user) {
      console.log("user.profilePhoto", user.profilePhoto)
      if (user.profilePhoto !== "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png") {
        const ss = user.profilePhoto.replace("http://localhost:3005/", "public/")
        console.log(user.profilePhoto , ss)
        await fs.unlinkSync(ss)
      }
    }
    const deleted = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      data: deleted,
      message: "User deleted successfully"
    })
  } catch (error) {
    next(error)
  }
}

exports.userResetpassword = (req, res, next) => {
  try {
    const { id } = req.params
    const objectId = new mongoose.Types.ObjectId(id);
    const password = req.body.password
    const salt = genSaltSync(10);
    const hashPassword = hashSync(password, salt);
    const options = { new: false };
    UserModel.findOneAndUpdate({ _id: objectId }, { password: hashPassword }, options, (err, doc) => {
      if (err) {
        return res.status(400).send({ success: false, data: null, message: `password update failed` });
      } else {
        if (doc) {
          doc.password = undefined
          return res.status(200).send({ success: true, message: 'Password Updated Successfully' });
        }
        res.status(400).send({ success: false, data: null, message: `password update failed` });
      }
    })
  } catch (error) {
    next(error)
  }
}