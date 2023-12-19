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
    console.log("User added:", userData);
    
    res.redirect("/dashboard");

  } catch (error) {
    console.error(error.message);
  }
};

const loadLogin = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log("Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userData = await user.findOne({ email:email });

    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch) {
        req.session.user = userData;
        res.redirect('/dashboard');
      } else {
        console.log("Wrong Password");
      }
    } else {
      console.log("User not Exist");
    }
  } catch (error) {
    console.error(error.message);
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/login");
  } catch (error) {
    console.error(error.message);
  }
};

const loadDashboard = async (req, res) => {
    try {
        res.render("dashboard");
    
    } catch (error) {
      console.error(error.message);
    }
  };
  
module.exports = {
  registerLoad,
  register,
  loadDashboard,
  login,
  loadLogin,
  logout
};
