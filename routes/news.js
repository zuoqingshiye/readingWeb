var express = require("express");
var router = express.Router();
const news = require("../datas/news.js");
const categorys = require("../datas/categorys.js");

const paginate = require('express-paginate');

/* GET news listing. */
router.get("/list", function (req, res) {
  let {category, page, title,tag, limit = 10} = req.query
  let { user }  = req.session

  let items = []
  console.log('title', title)
  // filter by type
  if(title){
    items = news.filter((e) => e.title.toLowerCase().includes(title.toLowerCase()));
  }else if(category){
    items = news.filter((e) => e.category == category);
  } else if(tag){
    items = news.filter((e) => e.tags.find(el=>el.toLowerCase().includes(tag)) );
  }
  
  const pageCount = Math.ceil(items.length / limit);
  
  res.render("news/newsList", {
    list: items,
    category,
    categorys,
    user,
    page,
    hasMore: paginate.hasNextPages(req)(pageCount),
    pages:paginate.getArrayPages(req)(limit, pageCount, page),
  });
});

router.get("/detail/:id", function (req, res) {
  let id = req.params.id
  let { user }  = req.session
  let item = news.find(e=>e.id == id)
  
  res.render("news/newsDetail", { item: item, user, categorys });
});

module.exports = router;
