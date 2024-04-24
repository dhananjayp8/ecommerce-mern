const adminDB = require("../../model/admin/adminModel");
const cloudinary = require("../../cloudinary/cloudinary");
const bcrypt = require("bcryptjs");

//register controller
// exports.Register = async (req, res) => {
//   //   console.log(req.body);
//   //   console.log(req.file);

//   const { name, email, mobile, password, confirmpassword } = req.body;

//   if (
//     !name ||
//     !email ||
//     !mobile ||
//     !password ||
//     !confirmpassword ||
//     !req.file
//   ) {
//     res.status(400).json({ errror: "All fields are required" });
//   }

//   const file = req.file?.path;
//   const upload = await cloudinary.uploader.upload(file);

//   try {
//     const preuser = await adminDB.findOne({ email: email });
//     const mobileVerify = await adminDB.findOne({ mobile: mobile });
//     if (preuser) {
//       res.status(400).json({ error: "This Admin already exists" });
//     } else if (mobileVerify) {
//       res.status(400).json({ error: "This mobile already exists" });
//     } else if (password !== confirmpassword) {
//       res
//         .status(400)
//         .json({ error: "Password and Confirm password mismatched" });
//     } else {
//       const adminData = new adminDB({
//         name,
//         email,
//         mobile,
//         password,
//         profile: upload.secure_url,
//       });
//       await adminData.save();
//       res.status(200).json(adminData);
//     }
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };
exports.Register = async (req, res) => {
  const { name, email, mobile, password, confirmpassword } = req.body;

  if (
    !name ||
    !email ||
    !mobile ||
    !password ||
    !confirmpassword ||
    !req.file
  ) {
    res.status(400).json({ error: "all fileds are required" });
  }

  const file = req.file?.path;
  const upload = await cloudinary.uploader.upload(file);

  try {
    const preuser = await adminDB.findOne({ email: email });
    const mobileverification = await adminDB.findOne({ mobile: mobile });
    console.log(mobileverification);

    if (preuser) {
      res.status(400).json({ error: "This Admin is Already Exist" });
    } else if (mobileverification) {
      res.status(400).json({ error: "This Mobile is Already Exist" });
    } else if (password !== confirmpassword) {
      res
        .status(400)
        .json({ error: "password and confirm password not match" });
    } else {
      const adminData = new adminDB({
        name,
        email,
        mobile,
        password,
        profile: upload.secure_url,
      });

      //console.log("admindata", adminData);

      await adminData.save();
      res.status(200).json(adminData);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

//login controller
// exports.Login = async (req, res) => {
//   const { email, password } = req.body;
//   console.log("email and password is", req.body);
//   if (!email || !password) {
//     res.status(400).json({ error: "All field require" });
//   }
//   try {
//     const adminValid = await adminDB.findOne({ email: email });
//     if (adminValid) {
//       const isMatch = await bcrypt.compare(password, adminValid.password);
//       if (!isMatch) {
//         res.status(400).json({ error: "Invalid details" });
//       } else {
//         //token generate
//         const token = await adminValid.generateAuthToken();
//         console.log(token);
//         const result = {
//           adminValid,
//           token,
//         };
//         res.status(200).json(result);
//       }
//     } else {
//       res.status(400).json({ error: "invalid details" });
//     }
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };
// login controller
exports.Login = async (req, res) => {
  const { email, password } = req.body;
  //console.log("result is ", req.body);
  if (!email || !password) {
    res.status(400).json({ error: "all field require" });
  }

  try {
    const adminValid = await adminDB.findOne({ email: email });
    if (adminValid) {
      const isMatch = await bcrypt.compare(password, adminValid.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Details" });
      } else {
        // token generate
        const token = await adminValid.generateAuthToken();

        const result = {
          adminValid,
          token,
        };
        console.log("result is", result);
        res.status(200).json(result);
      }
    } else {
      res.status(400).json({ error: "invalid details" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

//admin verify controller

exports.Adminverify = async (req, res) => {
  console.log("req.rootUser", req.rootUser);
  try {
    const verifyAdmin = await adminDB.findOne({ _id: req.userid });
    res.status(200).json(verifyAdmin);
  } catch (error) {
    res.status(400).json({ error: "Invalid detail" });
  }
};

//admin logout controller
exports.Logout = async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((currElement) => {
      currElement.token !== req.token;
    });
    req.rootUser.save();
    res.status(200).json({ message: "user successfully logout" });
  } catch (error) {
    res.status(400).json(error);
  }
};
