const express = require("express");
const adminRouter = express.Router();

const {
    adminIndexGet,
    adminIndexPost,
    adminDashboardGet,
    adminDashboardPost,
    adminLoginGet,
    adminLoginPost,
} = require("../controllers/adminController");

adminRouter.get("/index", adminIndexGet);
adminRouter.post("/index", adminIndexPost);
adminRouter.get("/login", adminLoginGet);
adminRouter.post("/login", adminLoginPost);
adminRouter.get("/dashboard", adminDashboardGet);
adminRouter.post("/dashboard", adminDashboardPost);

module.exports = adminRouter;