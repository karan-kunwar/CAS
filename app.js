const express = require("express");
const app = express();

const con = require("./db.js");
const session = require("express-session");
const adminRouter = require("./routers/adminRouter");
const facultyRouter = require("./routers/facultyRouter");

app.set("view engine", "ejs");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Static
app.use("/static", express.static(__dirname + "/public"));

app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.render("rootindex");
});

app.get("/logout", async (req, res) => {
  req.session.loggedIn = false;
  res.redirect("/");
});

app.use("/admin", adminRouter);
app.use("/faculty", facultyRouter);
app.get("/logout", async (req, res) => {
    req.session.loggedIn = false;
    res.redirect("/");
});

app.get("*", (req, res)=>{
    res.render("error");
});
app.listen(3000, () => {
  console.log(`Course Allocation App listening at http://localhost:3000`);
});
