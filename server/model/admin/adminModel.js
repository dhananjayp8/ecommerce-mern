const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email");
      }
    },
  },
  profile: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
    // validate(value) {
    //   if (!validator.isEmail(value)) {
    //     throw new Error("not valid email");
    //   }
    // },
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// //password hashing
// adminSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 12);
//   }
//   next();
// });

// //token generation
// adminSchema.methods.generateAuthToken = async function () {
//   try {
//     let newToken = jwt.sign({_id: this._id }, SECRET_KEY, {
//       expiresIn: "1d",
//     });

//     this.tokens = this.tokens.concat({ token: newToken });

//     await this.save();
//     return newToken;
//   } catch (error) {
//     res.status(400).json({ error: error });
//   }
// };
// password hashing
adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// token generate
adminSchema.methods.generateAuthToken = async function () {
  try {
    let newtoken = jwt.sign({ _id: this._id }, SECRET_KEY, {
      expiresIn: "1d",
    });

    this.tokens = this.tokens.concat({ token: newtoken });

    await this.save();
    return newtoken;
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const adminDB = new mongoose.model("admins", adminSchema);

module.exports = adminDB;
