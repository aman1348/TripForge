const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userRouter = require("./routes/Auth");
const userInfoRouter = require('./routes/User');
const session = require("express-session");
const LocalStrategy = require('passport-local')
const bodyParser = require("body-parser");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const SECRET_KEY = 'SECRET_KEY';
const token = jwt.sign({ foo: 'bar' }, SECRET_KEY);
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const { User } = require('./models/User');
const { cookieExtractor } = require("./services/common");

const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


dotenv.config();

// jwt options
const opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = 'SECRET_KEY';


app.use(express.static('build'));
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));

app.use((req, res, next) => {
  const allowedOrigins = req.get("origin") || "http://localhost:3000";
  res.header("Access-Control-Allow-Origin", allowedOrigins);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/users", userRouter);
app.use("/userInfo", userInfoRouter);
// Passport strategy
passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email' },
    async function (email, password, done) {
      // by default passport uses username
      try {
        const user = await User.findOne({ email: email });
        console.log(email, password, user);
        if (!user) {
          return done(null, false, { message: 'invalid credentials' }); // for safety
        }
        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          'sha256',
          async function (err, hashedPassword) {
            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
              return done(null, false, { message: 'invalid credentials' });
            }
            const token = jwt.sign({ id: user.id }, SECRET_KEY);

            done(null, { token });
          }
        );
      } catch (err) {
        done(err);
      }
    })
);

passport.use(
  'jwt',
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.sub)
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {

      if (err) {
        return done(err, false);
      }


    };
  }));
// this creates session variable req.user on being  called
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
// this creates sesson variable req.user when called from authorized request
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const PORT = process.env.PORT;
function isAuth(req, res, done) {
  return passport.authenticate('jwt');
}

// ===========deployment==========

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "tripforge_frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "tripforge_frontend", "build", "index.html"));
  })
}
else {
  app.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Api Running SuccessFully"
    })
  })
}




// ===============================

app.listen(PORT || 4000, () => {
  console.log(`Server started at ${PORT}`);
});

app.use(express.json());
// app.use(cors());
