//Controller/server.js

//npm
const { check, validationResult } = require("express-validator/check");
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var User = require('./Models/User');
var Post = require('./Models/Post'); 

//mongoDB'
mongoose.connect('mongodb://test:test@ds137435.mlab.com:37435/todo');

//express
var app = express();

//middelware
app.use(
  cors({
    origin: [
    "http://localhost:3000",
    "https://whispering-mesa-89772.herokuapp.com"
  ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true // enable set cookie
  })
);
app.use(bodyParser.json());

app.use(cookieParser());
app.use(
  session({
    secret: "supersecretstring12345!",
    saveUninitialized: false,
    resave: true,
    cookie: { maxAge: 60000 * 30 }
  })
);

////////////////////USER controller

// Registeration
var register = (req, res) => {
  const user = new User(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ status: "error", errors: errors.mapped() });
  }
  user.password = user.hashPassword(user.password);
  user
    .save()
    .then(user => {
      return res.send({ status: "success", message: "registerd successfuly" });
    })
    .catch(error => {
      console.log(error);
      return res.send({ status: "error", message: error });
    });
};

app.post(
  "/api/register",
  [
    check("name", "please enter your full name")
      .not()
      .isEmpty(),
    check("name", "your Full Name should be longer than 4 charchters").isLength({
      min: 4
    }),
    check("name", "your name must not contain any numbers").matches(
      /^[a-z''., ]+$/i
    ),
    check("email", "your email is not valid").isEmail(),
    check("email", "email already exist").custom(function (value) {
      return User.findOne({ email: value }).then(user => !user);
    }),
    check("con_email", "your email confirmation dose not match").custom(
      (value, { req }) => value === req.body.email
    ),
    check(
      "password",
      "your password should be longer than 5 charchters"
    ).isLength({ min: 6 }),
    check("con_password", "your password confirmation dose not match").custom(
      (value, { req }) => value === req.body.password
    )
  ],
  register
);

// Login
var login = (req, res) => {
  // console.log(req.body.email);
  User.findOne({
    email: req.body.email
  })
    .then(function (user) {
      if (!user) {
        return res.send({ error: true, message: "User does not exist!" });
      }
      if (!user.comparePassword(req.body.password, user.password)) {
        return res.send({ error: true, message: "Wrong password!" });
      }
      req.session.user = user;
      req.session.isLoggedIn = true;
      return res.send({ message: "You are signed in" });
    })
    .catch(function (error) {
      console.log(error);
    });
};

app.post("/api/login", login);


//logout
var logout = (req, res) => {
  req.session.destroy();
  res.json({ logout: true });
};
app.get("/api/logout", logout);

//current user
var current = (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  }
  return res.status(422).json({ msg: "The authentication failed" });
};
app.get("/api/currentuser", current);



////////////////////post new Article////////////////////////////
//post an Article
var postArticle = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ status: "error", errors: errors.mapped() });
  }
  var post = new Post(req.body);
  //   console.log(post);
  post.user = req.session.user._id;
  //   console.log(post);
  post
    .save()
    .then(post => {
      return res.send({
        status: "success",
        message: "Contact detail created successfuly"
      });
    })
    .catch(error => {
      console.log(error);
      return res.send({ status: "error", message: error });
    });
};

app.post(
  "/api/postArticle",
  [
    check("city", "Please enter your city").not().isEmpty(),

    check("city", "The city must not contain any numbers").matches(
      /^[a-z''., ]+$/i
    ),
    check("city", "Your city must not less than  car").isLength({
      min: 3
    }),
    check("age", "Please enter your age").not().isEmpty(),
    check("age", "The age must be an integer between 13 and 120").isNumeric(),
    
    check("PhoneNumber", "Please enter your  Phone Number").not().isEmpty(),
    check("PhoneNumber", "The Phone Number is Numeric").isNumeric(),
    check("PhoneNumber", "Your phone Number must exactly 10 digit").isLength({
      min: 10, 
    }),
    ],
  postArticle
);

//all users
app.get('np', function (req, res, next) {
  User.find({}, (err, users) => {
    if (err) {
      console.log("Error getting users" + err);
      return next();
    }
    res.json(users)
  })
})

//show me Allpost in home page
app.get("/api/Allposts", function (req, res, next) {
  Post.find({}, (err, posts) => {
    if (err) {
      console.log("Error getting posts" + err);
      return next();
    }

    res.json(posts);
  })
    .populate("user")
    .sort({ createdat: "desc" });
});

//show user posts
app.get("/api/userposts/:userid", (req, res) => {
  User.findById(req.params.userid)
    .then(user => {
      Post.find({ user: req.params.userid }).then(posts => {
        res.json({
          user: user,
          posts: posts
        });
      });
    })
    .catch(err => {
      res.send(err);
    });
});
//
app.delete("/api/article/delete/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id)
    .then(res => res.json({ deleted: true }))
    .catch(err => res.send(err));
});

//showing single post:
app.get("/api/post/:postid", function findOnePost(req, res, next) {
  Post.findOne({ _id: req.params.postid })
    .populate("user")
    .then(post => {
      res.send(post);
    })
    .catch(err => res.send(err));
});


app.listen(process.env.PORT || 8000, () => { console.log("listening to port: 8000");
});

