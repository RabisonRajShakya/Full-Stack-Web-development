const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const User = require("../modal/userModel");
const Profile = require("../modal/profileModel");

async function createUserController(req, res) {
 const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const gender = req.body.gender;

  if (!name || !email || !password || !phone || !gender) {
    return res.status(400).json({
      message: "All Fields are required",
    });
  }

  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return res.status(400).json({
      message: "User with this email already exists",
    });
  }

  const encryptPassword = await bcrypt.hash(password, 10);

  const data = {
    name,
    email,
    password: encryptPassword,
  };

  const user = new User(data);
  await user.save();

  const profileData = {
    user: user._id,
    bio : ""
  }

  const profile = new Profile(profileData)
  await profile.save()


  res.status(201).json({
    message: "User Created",
    user: user,
  });

  
}

async function loginHandleController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All Fields are required",
    });
  }

  const checkUser = await User.findOne({ email }).select("+password");
  if (!checkUser) {
    return res.status(400).json({
      message: "User with this email does not exist",

    });
  }

  const comparePassword = await bcrypt.compare(password, checkUser.password);
  if (comparePassword) {
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
      },
      process.env.AUTH_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      accessToken: token,
    });
  } else {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }
}
async function getUserListController(req, res) {
  const userList = await User.find();
  res.status(200).json({
    users : userList,
  });
}
module.exports = {
  createUserController,
    loginHandleController,
    getUserListController,
};