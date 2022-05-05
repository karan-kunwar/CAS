const client = require("../db.js");
const path = require("path");
const session = require("express-session");

let facultyLoginGet = (req, res) => {
  res.render("facultyLogin");
};

let facultyLoginPost = async (req, res) => {
  let email_id = req.body.email_id;
  let password = req.body.password;
  console.log(email_id, password); //

  if (!(email_id && password)) return res.redirect("/faculty/login");

  let q = `select * from faculty where email = '${email_id}'`;
  client.query(q, (err, result) => {
    if (err) throw err;
    // if (result.length == 0) {
    //   return res.redirect("login");
    // }
    if(result["rows"].length == 0) {
        return res.redirect("login");
    } 
    let _faculty = result["rows"][0];
    console.log(_faculty);
    req.session.loggedIn = true;
    req.session.userType = "faculty";
    req.session.ID = _faculty['facultyid'];
    req.session.name = _faculty['name'];
    req.session.email = _faculty['email'];
    res.redirect("index");
  });

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
  if (req.session.loggedIn && req.session.userType == "faculty") {
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
        user: req.session.name,
        courses: _courses,
      });
    });
  } else {
    res.redirect("login");
  }
};

let tempdata = [];

let facultyIndexPost = (req, res) => {
  if (req.session.loggedIn && req.session.userType == "faculty") {
    let preference = [];
    for (let x in req.body) {
        let obj = JSON.parse(req.body[x]);
        preference.push(obj);
    }
    tempdata = preference;
    res.redirect("dashboard");
  }
  else{
    res.redirect("login");
  }
};

let facultyDashboardGet = (req, res) => {
  if (req.session.loggedIn && req.session.userType == "faculty") {
    res.render("facultyDashboard", {
        user: req.session.name,
        courses: tempdata,
    });
  }else{
    res.redirect("login");
  }

};

module.exports = {
  facultyLoginGet,
  facultyLoginPost,
  facultyIndexGet,
  facultyIndexPost,
  facultyDashboardGet,
};
