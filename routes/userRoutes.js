const express = require("express");
const user_route = express();
const session = require("express-session");
const bodyParser = require("body-parser");

user_route.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

user_route.set("view engine", "ejs");
user_route.set("views", "./views");

user_route.use(express.static("public"));

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage });

const userController = require("../controllers/userController");
const auth = require('../middlewear/auth')
user_route.get("/register", auth.isLogout,userController.registerLoad);
user_route.post("/register", upload.single("image"), userController.register);

user_route.get("/",userController.landingPage)

user_route.get("/login", auth.isLogout,userController.loadLogin);
user_route.post("/login", userController.login);

user_route.get("/logout", auth.isLogin,userController.logout);
user_route.post("/save-chat",userController.saveChat);

user_route.get("/dashboard",auth.isLogin, userController.loadDashboard);
user_route.get("*",function(req,res){
  res.redirect('login')
})



module.exports = user_route;
