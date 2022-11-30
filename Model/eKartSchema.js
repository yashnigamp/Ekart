const mongoose = require("mongoose");

//Connection to database
mongoose
  .connect("mongodb://localhost:27017/Ekart", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Db Connection Successful");
  });

const ekartUserModelSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const ekartProductSchema = new mongoose.Schema(
  {
    productPicture: {
      type: String,
    },
    productName: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    cost: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    description: {
      type: String,
    },
    colors: {
      type: Number,
    },
    discountPercentage: {
      type: Number,
    },
    deliveryCharge: {
      type: Number,
    },
    avgRating: {
      reviews: [
        {
          reviewRating: Number,
          reviewComments: String,
        },
      ],
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

// const ekartProductCartSchema = new mongoose.Schema(
//   {

//   },
//   {
//     timestamps: {
//       createdAt: true,
//       updatedAt: true,
//     },
//   }
// );

const UserModel = mongoose.model("users", ekartUserModelSchema);
const ProductModel = mongoose.model("products", ekartProductSchema);
module.exports = Model = {
  UserModel,
  ProductModel,
};
