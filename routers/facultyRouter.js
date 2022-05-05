const express = require("express");
const session = require('express-session')
const facultyRouter = express.Router();

const {
  facultyIndexGet,
  facultyIndexPost,
  facultyDashboardGet,
  facultyLoginGet,
  facultyLoginPost,
} = require("../controllers/facultyController");

facultyRouter.get("/index", facultyIndexGet);
facultyRouter.post("/index", facultyIndexPost);
facultyRouter.get("/login", facultyLoginGet);
facultyRouter.post("/login", facultyLoginPost);
facultyRouter.get("/dashboard", facultyDashboardGet);

module.exports = facultyRouter;
