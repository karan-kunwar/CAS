const client = require("../db.js");
const path = require("path");

let facultyLoginGet = (req, res) => {
  res.render("facultyLogin");
};

let facultyLoginPost = async (req, res) => {
  let email_id = req.body.email_id;
  let password = req.body.password;
  console.log(email_id, password); //
//   client.query(
//     "SELECT $1::text as message",
//     ["Hello world bsdwalo!"],
//     (err, res) => {
//       console.log(err ? err.stack : res.rows[0].message); // Hello World!
//       client.end();
//     }
//   );
  res.redirect("facultyIndex"); // To be removed

  if (!(email_id && password)) return res.redirect("/faculty/login");
  let query = `SELECT * FROM facultyTable WHERE facultyemail_id = ${email_id};`;
  client.query(query, function (err, result, fields) {
    if (err) {
      console.log(err);
      return res.redirect("/faculty/login");
    }
    if (result.length == 0) {
      return res.redirect("/faculty/login");
    }
    bcrypt.compare(password, result[0].facultyPassword).then((resu) => {
      if (resu) {
        req.session.loggedIn = true;
        req.session.userType = "faculty";
        req.session.user = result[0];
        res.redirect("/faculty/dashboard");
      } else {
        res.redirect("/faculty/login");
      }
    });
  });
};

let facultyIndexGet = (req, res) => {
  // TODO: Query to get the courses
  res.render("facultyIndex", {
    user: "KK",
    courses: ["ENB", "RSG", "DMW", "LAL", "BCC"],
  });
};

let tempdata = { '1': 'BCC', '2': 'DMW', '3': 'RSG', '4': 'LAL' };

let facultyIndexPost = (req, res) => {
  let preference = req.body;
  console.log(preference);
  res.redirect("dashboard")
};

let facultyDashboardGet = (req, res) => {

  res.render("facultyDashboard", { 
      user : "KK",
      courses: tempdata,
    });
};
module.exports = {
  facultyLoginGet,
  facultyLoginPost,
  facultyIndexGet,
  facultyIndexPost,
  facultyDashboardGet,
};
