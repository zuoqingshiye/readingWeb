var express = require("express");
var router = express.Router();
const User = require("../models/user.model");
const news = require("../datas/news.js");
const categorys = require("../datas/categorys.js");
var bcrypt = require("bcryptjs");
// const user = {
//   name: "zhaotong",
// };

/* GET home page. */
router.get("/", function (req, res) {
  let { user } = req.session;
  let categorys = ["US", "World", "Politics", "Sprots", "Technology", "Health"];
  let USItems = news.filter((e) => e.category == "US").slice(0, 6);
  let WorldsItems = news.filter((e) => e.category == "World").slice(0, 6);
  let PoliticsItems = news.filter((e) => e.category == "Politics").slice(0, 6);
  let SportsItems = news.filter((e) => e.category == "Sports").slice(0, 6);
  let TechnologyItems = news
    .filter((e) => e.category == "Technology")
    .slice(0, 6);
  let HealthsItems = news.filter((e) => e.category == "Health").slice(0, 6);
  res.render("index/index", {
    USItems,
    WorldsItems,
    PoliticsItems,
    SportsItems,
    TechnologyItems,
    HealthsItems,
    categorys,
    user,
  });
});

/* GET login page. */
router.get("/login", function (req, res) {
  res.render("index/login", { title: "Express" });
});

router.post("/login", function (req, res) {
  var name = req.body.name;
  var password = req.body.password;
  User.findOne({ name: name }, function (err, user) {
    if (err) {
      console.log("login failure");
      res.redirect("/login");
    } else {
      passwordIsVaild = bcrypt.compareSync(password, user.password);
      if (passwordIsVaild) {
        console.log("login successfully");
        req.session.user = user;
        res.redirect("/");
      } else {
        console.log("login failure");
        res.redirect("/login");
      }
    }
  });
});

/* GET logout page. */
router.get("/logout", function (req, res) {
  req.session.user = null;
  req.session.error = null;
  res.redirect("/");
});

/* GET register page. */
router.get("/register", function (req, res) {
  res.render("index/register", { title: "User register" });
});

router.post("/register", function (req, res) {
  res.redirect("/register");
});

/* sumbit register */
router.get("/sumbitRegist", function (req, res) {
  res.render("index/register", { title: "User register" });
});

router.post("/sumbitRegist", function (req, res) {
  var user = new User({
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  user.save(function (err, content) {
    if (err) {
      res.redirect("/register");
      console.log("register failure");
    }
    console.log("register successfully");
    req.session.user = user;
    res.redirect("/");
  });
});

router.get("/profile", function (req, res) {
  let { user } = req.session;
  res.render("index/profile", { user, categorys });
});

router.get("/setting", function (req, res) {
  let { user } = req.session;
  res.render("index/setting", { user, categorys });
});

/* theme. */
router.get("/theme", function (req, res) {
  let { theme = {} } = req.session;
  res.json(theme);
});

router.post("/theme", function (req, res) {
  let { fontSize, theme } = req.body;
  console.log("req.body", req.body);
  let ret = { success: true };
  req.session.theme = {
    fontSize,
    theme,
  };
  res.json(ret);
});

module.exports = router;
