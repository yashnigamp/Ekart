const e = require("express");
const Model = require("../Model/eKartSchema");
const Validator = require("../Utilities/validator");

exports.setupdb = async (req, res) => {
  try {
    //console.log(req);
    const userSample = {
      userId: 1,
      name: "Yash",
      password: "Yash@12",
      email: "yash@gmail.com",
    };
    const userData = await Model.UserModel.create(userSample);
    res.status(201).json({
      message: "Go ahead",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.signup = async (req, res) => {
  try {
    if (Validator.ValidateName(req.body.name)) {
      if (Validator.ValidateEmail(req.body.email)) {
        if (Validator.ValidatePassword(req.body.password)) {
          Model.UserModel.findOne({ email: req.body.email }).then((users) => {
            if (users) {
              res
                .status(400)
                .json({ message: "User exists with this email id" });
            } else {
              Model.UserModel.find()
                .sort({ userId: -1 })
                .limit(-1)
                .then(async (user) => {
                  if (user) {
                    let id = user[0].userId + 1;
                    const userData = {
                      userId: id,
                      name: req.body.name,
                      password: req.body.password,
                      email: req.body.email,
                    };
                    const data = await Model.UserModel.create(userData);
                    res.status(200).json({
                      message: "UserId-" + id,
                    });
                  }
                });
            }
          });
        } else {
          res.status(400).json({
            message: "Password should have minimum 5 and maximum 10 characters",
          });
        }
      } else {
        res.status(400).json({
          message: "Email should be a valid one",
        });
      }
    } else {
      res.status(400).json({
        message: "Name should have valid characters",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req,res) => {
  Model.UserModel.findOne({
    $and: [{ email: req.body.email }, { password: req.body.password }],
  }).then((data) => {
    if (data) {
      res.status(200).send(true);
    } else {
      res.status(400).json({
        message: "Incorrect user id or password",
      });
    }
  });
}

exports.updatePassword = async (req,res) => {
  let userEmail = req.params.username;
  //console.log(userEmail);
  Model.UserModel.findOne({email : userEmail}).then((user) => {
    if(user){
      if(Validator.ValidatePassword(req.body.password)){
        Model.UserModel.findOneAndUpdate({email: userEmail},req.body,{new: true}).then((data) => {
          if(data){
            res.status(200).send(true);
          }else{
            res.status(400).json({
              message: "Update Failed",
            });
          }
        })
      }else{
        res.status(400).json({
          message: "Invalid Password Criteria",
        });
      }
    }else{
      res.status(400).json({
        message: "No such details exists",
      });
    }
  })
}

exports.getImages = async (req,res) => {
  const path = ""
}