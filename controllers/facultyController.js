const client = require("../db.js");
const path = require("path");

async function getObj(q) {
  client.query(q, (err, result) => {
    if (err) throw err;
    let fobj = result["rows"];
    return fobj;
  });
  return [];
}

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
  res.redirect("index"); // To be removed

  //   if (!(email_id && password)) return res.redirect("/faculty/login");
  //   let query = `SELECT * FROM facultyTable WHERE facultyemail_id = ${email_id};`;
  //   client.query(query, function (err, result, fields) {
  //     if (err) {
  //       console.log(err);
  //       return res.redirect("/faculty/login");
  //     }
  //     if (result.length == 0) {
  //       return res.redirect("/faculty/login");
  //     }
  //     bcrypt.compare(password, result[0].facultyPassword).then((resu) => {
  //       if (resu) {
  //         req.session.loggedIn = true;
  //         req.session.userType = "faculty";
  //         req.session.user = result[0];
  //         res.redirect("/faculty/dashboard");
  //       } else {
  //         res.redirect("/faculty/login");
  //       }
  //     });
  //   });
};

let facultyIndexGet = (req, res) => {
  // TODO: Query to get the list of courses
  let query = `select sc.semcourseid as "SemCourseId", 
  c.coursename as "Course", c.lecture as "L", c.tutorial as "T", 
  c.practical as "P", bs.sem as "Semester", b.branchname as "Branch"
  from sem_course as sc
  inner join branch_sem as bs using(branchsemid)
  inner join course as c using (courseid)
  inner join branch as b using (branchid)
  where bs.sem % 2 = 1
  order by bs.sem asc;`;

  client.query(query, (err, result) => {
    if (err) throw err;
    let _courses = result["rows"];
    res.render("facultyIndex", {
      user: "KK",
      courses: _courses,
    });
  });
};

let tempdata = [];

let facultyIndexPost = (req, res) => {
  let preference = [];
  for (let x in req.body) {
    let obj = JSON.parse(req.body[x]);
    preference.push(obj);
  }
  tempdata = preference;
  console.log(tempdata);
  res.redirect("dashboard");
};

let facultyDashboardGet = (req, res) => {
  res.render("facultyDashboard", {
    user: "KK",
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
