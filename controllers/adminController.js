const mysql = require("mysql");
const bcrypt = require("bcrypt");
const session = require("express-session");
var XLSX = require("xlsx");
const multer = require("multer");
const client = require("../db.js");
const path = require("path");
__basedir = path.resolve(path.dirname(""));

//-------------------- Start of admin Login  --------------------//
let adminLoginGet = (req, res) => {
  res.render("adminLogin");
};

let adminLoginPost = (req, res) => {
  let email_id = req.body.email_id;
  let password = req.body.password;
  console.log(email_id, password);  //
  res.redirect("login");            // To be removed
  if (!(email_id && password)) return res.redirect("/admin/login");
  let query = `SELECT * FROM adminTable WHERE adminemail_id = ${email_id};`;
  client.query(query, function (err, result, fields) {
    if (err) {
      console.log(err);
      return res.redirect("/admin/login");
    }
    if (result.length == 0) {
      return res.redirect("/admin/login");
    }
    bcrypt.compare(password, result[0].adminPassword).then((resu) => {
      if (resu) {
        req.session.loggedIn = true;
        req.session.userType = "admin";
        req.session.user = result[0];
        res.redirect("/admin/dashboard");
      } else {
        res.redirect("/admin/login");
      }
    });
  });
};
//--------------------- End of admin Login  ---------------------//

//------------------ Start of admin Dashboard (get) ------------------//
let adminDashboardGet = (req, res) => {
  //   if (req.session.loggedIn && req.session.userType == "admin") {
  // let query1 = `SELECT * FROM BuildingTable WHERE adminId = ${req.session.user.Id};`;
  //   con.query(query1, function (err, result, fields) {
  //     if (err) {
  //       throw err;
  //     }
  //     let query2 = `SELECT
  //                           B.*, A.*
  //                       FROM
  //                           BuildingTable AS B
  //                       INNER JOIN
  //                           (SELECT
  //                               AP.*, P.Id AS PaymentId, P.Date AS PaymentDate, T.TenantName
  //                           FROM
  //                               ApartmentTable AS AP
  //                           INNER JOIN PaymentTable AS P ON AP.Id = P.ApartmentId
  //                           INNER JOIN TenantTable AS T ON AP.TenantId = T.Id) AS A
  //                       ON B.Id = A.BuildingId
  //                       WHERE B.adminId = ${req.session.user.Id}
  //                       ORDER BY PaymentDate DESC
  //                       LIMIT 5`;
  //     con.query(query2, function (err, resu) {
  //       console.log(result);
  res.render("adminDashboard", {
    user: "kk",
  });
  //     });
  //   });
  //   }
  //   else res.redirect("/admin/login");
};

//---------------- End of admin Dashboard (get) ----------------//

//----------------- Start of admin Index (get) -----------------//

let adminIndexGet = (req, res) => {
  res.render("adminIndex", {
    user: "kk",
  });
};

//------------------ End of admin Index (get) ------------------//

//----------------- Start of admin Index (Post) ----------------//
// Multer Upload Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("uploadfile");

let adminIndexPost = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      // This is a good practice when you want to handle your errors differently
      console.log("\nwhy error\n", err);
      return;
    }
    // Everything went fine
    console.log(__basedir + "/uploads/" + req.file.filename);
    exportExcelData2MySQL(__basedir + "/uploads/" + req.file.filename);
  });
  res.redirect("dashboard");
};

// Export Excel Data to MySQL database
function exportExcelData2MySQL(filePath) {
  // File path.
  var workbook = XLSX.readFile(filePath);
  var sheet_name_list = workbook.SheetNames;
  var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  console.log("from file::");
  console.log(xlData[0]["Semester"]);

  let query = `INSERT INTO TABLE_NAME VALUES ${xlData[0]["Semester"]}`;
  // Upload this data on database
  clientR.query(
    "SELECT $1::text as message",
    ["Hello world bsdwalo!"],
    (err, res) => {
      console.log(err ? err.stack : res.rows[0].message); // Hello World!
      clientR.end();
    }
  );
}
//------------------ End of admin Index (Post) ------------------//

module.exports = {
  adminIndexGet,
  adminDashboardGet,
  adminIndexPost,
  adminLoginGet,
  adminLoginPost,
};
