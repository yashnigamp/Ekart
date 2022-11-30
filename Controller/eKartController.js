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
    const productSample = {
      productPicture: "http://localhost:3000/a(1).jpg",
      productName: "Abstract",
      manufacturer: "Infosys",
      cost: 5000,
      rating: 4,
      description: "Excellent Product in every way",
      colors: 3,
      discountPercentage: 20,
      deliveryCharge: 100,
      "avgRating.reviews": {
        reviewComments: "yash",
        reviewRating: 4,
      },
    };
    // const userData = await Model.UserModel.create(userSample);
    const productData = await Model.ProductModel.create(productSample);
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

exports.login = async (req, res) => {
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
};

exports.updatePassword = async (req, res) => {
  let userEmail = req.params.username;
  //console.log(userEmail);
  Model.UserModel.findOne({ email: userEmail }).then((user) => {
    if (user) {
      if (Validator.ValidatePassword(req.body.password)) {
        Model.UserModel.findOneAndUpdate({ email: userEmail }, req.body, {
          new: true,
        }).then((data) => {
          if (data) {
            res.status(200).send(true);
          } else {
            res.status(400).json({
              message: "Update Failed",
            });
          }
        });
      } else {
        res.status(400).json({
          message: "Invalid Password Criteria",
        });
      }
    } else {
      res.status(400).json({
        message: "No such details exists",
      });
    }
  });
};

exports.getProducts = async (req, res) => {
  Model.ProductModel.find(
    {},
    { _id: 0, avgRating: 0, createdAt: 0, updatedAt: 0, __v: 0 }
  ).then((data) => {
    if (data.length > 0) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(400).json({
        message: "No Product",
      });
    }
  });
};

exports.getProductBySearch = async (req, res) => {
  let productNameParam = req.params.productName;
  Model.ProductModel.findOne(
    { productName: productNameParam },
    { _id: 0, avgRating: 0, createdAt: 0, updatedAt: 0, __v: 0 }
  ).then((product) => {
    if (product) {
      res.status(200).json({
        data: product,
      });
    } else {
      res.status(400).json({
        message: "No such product",
      });
    }
  });
};

exports.getProductDetails = async (req, res) => {
  let productNameParam = req.params.productName;
  Model.ProductModel.findOne(
    { productName: productNameParam },
    { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
  ).then((product) => {
    if (product) {
      res.status(200).json({
        data: product,
      });
    } else {
      res.status(400).json({
        message: "No such product",
      });
    }
  });
};

exports.getDeals = async (req, res) => {
  Model.ProductModel.find(
    { discountPercentage: { $gt: 10 } },
    {
      avgRating: 0,
      _id: 0,
      productPicture: 0,
      manufacturer: 0,
      cost: 0,
      rating: 0,
      description: 0,
      colors: 0,
      deliveryCharge: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    }
  )
    .sort({ discountPercentage: -1 })
    .limit(5)
    .then((products) => {
      res.status(200).json({
        data: products,
      });
    });
};
