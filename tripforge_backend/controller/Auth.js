const { User } = require("../models/User");
const crypto = require("crypto");
const bcrypt = require('bcrypt');
const { response } = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const SECRET_KEY = "SECRET_KEY";


module.exports.createUser = async (req, res, next) => {
  const user = new User(req.body);
  const myuser = await User.find({ email: user.email });

  try {
    if (myuser.length != 0) {
      throw new Error("user already registered")
    }

    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
        // console.log(user);
        const doc = await user.save();

        // console.log(doc);
        req.login({ id: doc.id }, (err) => {
          if (err) res.status(400).json(err);
          else {
            const token = jwt.sign({ id: doc.id }, SECRET_KEY);
            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              })
              .status(201)
              .json({ id: doc.id, email: doc.email });
          }
        });
      }
    );

  } catch (err) {
    console.log("throwing error in create user")
    res.status(400).json(err);
  }
};

// module.exports.fetchUser = async(req, res) => {
//     const {id} = req.params;
//     try {
//         const user = await User.findById(id);
//         res.status(200).json(user)
//     } catch(err) {
//         res.status(400).json(err);
//     }
// }

module.exports.loginUser = async (req, res, next) => {
  const user = new User(req.body);
  // console.log("user : ", user);
  res
    .cookie("jwt", req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json({ token: req.user.token, email: user.email });
};

module.exports.checkAuth = async (req, res, next) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};

module.exports.request_otp = async (req, res) => {
  try{  
  const { email } = req.body;
  console.log("inside request otp email : ", email);
  

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();
  console.log("sending email to : ", email);
  // Send OTP via email
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  await transporter.sendMail({
    to: user.email,
    subject: 'Your Password Reset OTP',
    html: `<p>Your OTP is: <strong>${otp}</strong></p><p>Valid for 10 minutes.</p>`,
  });

  res.json({ message: 'OTP sent to your email' });
}
catch(error) {
  console.log("got an error : ", error);
  res.status(400).json({message: "couldn't send opt"});
}
};

module.exports.verify_otp = async (req, res) => {
try{  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.otp !== otp || Date.now() > user.otpExpiry) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  // Clear OTP 
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  // short-lived token (15 min)
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '15m' });

  res.status(200).json({
    message: 'OTP verified successfully',
    token,
  });}
  catch(error) {
  console.log("got an error while otp verification : ", error);
  res.status(400).json({message: "otp verification failed"});
  }
};

module.exports.updatePassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Hash and update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('JWT verification failed:', error);
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
};
