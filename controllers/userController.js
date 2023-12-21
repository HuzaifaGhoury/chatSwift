const user = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerLoad = async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const register = async (req, res) => {
  try {
    
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const userData = new user({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
      image: "images/" + req.file.filename,
    });

    await userData.save();

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const loadLogin = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } =  req.body;

    const userData = await user.findOne({ email });
    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);

      if (passwordMatch) {
        req.session.user = await userData;
        res.redirect('/dashboard');
      } else {
        console.log("Wrong Password");
        res.redirect('/login');
      }
    } else {
      console.log("User not Exist");
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/login");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};
const landingPage= async(req,res)=>{
  try {

    res.render("landingpage");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }}
const loadDashboard = async (req, res) => {
  try {
  var allUsers = await user.find({ _id:{$nin:[req.session.user._id]}})
    const userName = req.session.user;
      res.render("dashboard", { userName,allUsers });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  registerLoad,
  register,
  loadDashboard,
  login,
  loadLogin,
  landingPage,
  logout
};
