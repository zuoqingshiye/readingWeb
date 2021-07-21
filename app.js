const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const paginate = require("express-paginate");

// import template engine
var nunjucks = require("nunjucks");

var app = express();

// keep this before all routes that will use pagination
app.use(paginate.middleware(10, 50));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// set request body
app.use(bodyParser.json());
// set static path
app.use(express.static(path.join(__dirname, "public")));
// set seesion
app.use(
  session({
    secret: "news-app",
    resave: true,
    saveUninitialized: false,
  })
);
// init nunjucks
nunjucks.configure(path.resolve(__dirname, "./templates"), {
  autoescape: true,
  express: app,
  noCache: true,
});

// set template type
app.set("view engine", "html");

// inport Routers
var index = require("./routes/index");
var news = require("./routes/news");

// set Routers
app.use("/", index);
app.use("/news", news);

const run = (port = 3000, host = "") => {
  const server = app.listen(port, host, () => {
    const address = server.address();
    host = address.address;
    port = address.port;
    console.log(`listening server at http://${host}:${port}`);
  });
};

if (require.main === module) {
  const port = 2333;
  const host = "127.0.0.1";
  run(port, host);
}

const db = require("./models/mongodb");
const Role = db.role;

db.mongoose
  .connect("mongodb://127.0.0.1:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {}
// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user",
//       }).save((err) => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: "moderator",
//       }).save((err) => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'moderator' to roles collection");
//       });

//       new Role({
//         name: "admin",
//       }).save((err) => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
// }
