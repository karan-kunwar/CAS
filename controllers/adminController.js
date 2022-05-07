const mysql = require("mysql");
const bcrypt = require("bcrypt");
const session = require("express-session");
var XLSX = require("xlsx");
const multer = require("multer");
const client = require("../db.js");
const path = require("path");
__basedir = path.resolve(path.dirname(""));

// get preference query
let query = `select fc.facultyid, fc.name, 
sc1.semcourseid as "SemCourseID1", c1.coursename as "Course1", c1.lecture as "L1", c1.tutorial as "T1", c1.practical as "P1", b1.branchname as "Branch1", bs1.sem as "Sem1",
sc2.semcourseid as "SemCourseID2", c2.coursename as "Course2", c2.lecture as "L2", c2.tutorial as "T2", c2.practical as "P2", b2.branchname as "Branch2", bs2.sem as "Sem2",
sc3.semcourseid as "SemCourseID3", c3.coursename as "Course3", c3.lecture as "L3", c3.tutorial as "T3", c3.practical as "P3", b3.branchname as "Branch3", bs3.sem as "Sem3",
sc4.semcourseid as "SemCourseID4", c4.coursename as "Course4", c4.lecture as "L4", c4.tutorial as "T4", c4.practical as "P4", b4.branchname as "Branch4", bs4.sem as "Sem4",
sc5.semcourseid as "SemCourseID5", c5.coursename as "Course5", c5.lecture as "L5", c5.tutorial as "T5", c5.practical as "P5", b5.branchname as "Branch5", bs5.sem as "Sem5",
sc6.semcourseid as "SemCourseID6", c6.coursename as "Course6", c6.lecture as "L6", c6.tutorial as "T6", c6.practical as "P6", b6.branchname as "Branch6", bs6.sem as "Sem6",
sc7.semcourseid as "SemCourseID7", c7.coursename as "Course7", c7.lecture as "L7", c7.tutorial as "T7", c7.practical as "P7", b7.branchname as "Branch7", bs7.sem as "Sem7",
sc8.semcourseid as "SemCourseID8", c8.coursename as "Course8", c8.lecture as "L8", c8.tutorial as "T8", c8.practical as "P8", b8.branchname as "Branch8", bs8.sem as "Sem8",
sc9.semcourseid as "SemCourseID9", c9.coursename as "Course9", c9.lecture as "L9", c9.tutorial as "T9", c9.practical as "P9", b9.branchname as "Branch9", bs9.sem as "Sem9",
sc10.semcourseid as "SemCourseID10", c10.coursename as "Course10", c10.lecture as "L10", c10.tutorial as "T10", c10.practical as "P10", b10.branchname as "Branch10", bs10.sem as "Sem10" 
from preferences as pf inner join faculty as fc on fc.facultyid = pf.facultyid left join sem_course as sc1 on sc1.semcourseid = pf.pref1 left join branch_sem as bs1 on bs1.branchsemid = sc1.branchsemid left join branch as b1 on b1.branchid = bs1.branchid left join course as c1 on c1.courseid = sc1.courseid left join sem_course as sc2 on sc2.semcourseid = pf.pref2 left join branch_sem as bs2 on bs2.branchsemid = sc2.branchsemid left join branch as b2 on b2.branchid = bs2.branchid left join course as c2 on c2.courseid = sc2.courseid left join sem_course as sc3 on sc3.semcourseid = pf.pref3 left join branch_sem as bs3 on bs3.branchsemid = sc3.branchsemid left join branch as b3 on b3.branchid = bs3.branchid left join course as c3 on c3.courseid = sc3.courseid left join sem_course as sc4 on sc4.semcourseid = pf.pref4 left join branch_sem as bs4 on bs4.branchsemid = sc4.branchsemid left join branch as b4 on b4.branchid = bs4.branchid left join course as c4 on c4.courseid = sc4.courseid left join sem_course as sc5 on sc5.semcourseid = pf.pref5 left join branch_sem as bs5 on bs5.branchsemid = sc5.branchsemid left join branch as b5 on b5.branchid = bs5.branchid left join course as c5 on c5.courseid = sc5.courseid left join sem_course as sc6 on sc6.semcourseid = pf.pref6 left join branch_sem as bs6 on bs6.branchsemid = sc6.branchsemid left join branch as b6 on b6.branchid = bs6.branchid left join course as c6 on c6.courseid = sc6.courseid left join sem_course as sc7 on sc7.semcourseid = pf.pref7 left join branch_sem as bs7 on bs7.branchsemid = sc7.branchsemid left join branch as b7 on b7.branchid = bs7.branchid left join course as c7 on c7.courseid = sc7.courseid left join sem_course as sc8 on sc8.semcourseid = pf.pref8 left join branch_sem as bs8 on bs8.branchsemid = sc8.branchsemid left join branch as b8 on b8.branchid = bs8.branchid left join course as c8 on c8.courseid = sc8.courseid left join sem_course as sc9 on sc9.semcourseid = pf.pref9 left join branch_sem as bs9 on bs9.branchsemid = sc9.branchsemid left join branch as b9 on b9.branchid = bs9.branchid left join course as c9 on c9.courseid = sc9.courseid left join sem_course as sc10 on sc10.semcourseid = pf.pref10 left join branch_sem as bs10 on bs10.branchsemid = sc10.branchsemid left join branch as b10 on b10.branchid = bs10.branchid left join course as c10 on c10.courseid = sc10.courseid`;


//-------------------- Start of admin Login  --------------------//
let adminLoginGet = (req, res) => {
  res.render("adminLogin");
};

let adminLoginPost = (req, res) => {
  let email_id = req.body.email_id;
  let password = req.body.password;
  console.log(email_id, password); //

  if (!(email_id && password)) return res.redirect('login');

  let q = `select * from admin where email = '${email_id}'`;
  client.query(q, (err, result) => {
    if (err) throw err;
    if (result["rows"].length == 0) {
      return res.redirect('login');
    }
    let truncateQ = `truncate table faculty_course_current`;
    let updateQ = `update semcourselimit set maxfaculty = 3 where semcourseid = 14`;
    // client.query(truncateQ, (terr, tres) => {
    //   console.log('deleted all entries');
    //   client.query(updateQ, (eee, rrr)=>{});
    // });

    let _admin = result["rows"][0];
    console.log(_admin);
    req.session.loggedIn = true;
    req.session.userType = "admin";
    req.session.ID = _admin["adminid"];
    req.session.email = _admin["email"];
    res.redirect("index");
  });

  //   client.query(query, function (err, result, fields) {
  //     if (err) {
  //       console.log(err);
  //       return res.redirect("/admin/login");
  //     }
  //     if (result.length == 0) {
  //       return res.redirect("/admin/login");
  //     }
  //     bcrypt.compare(password, result[0].adminPassword).then((resu) => {
  //       if (resu) {
  //         req.session.loggedIn = true;
  //         req.session.userType = "admin";
  //         req.session.user = result[0];
  //         res.redirect("/admin/dashboard");
  //       } else {
  //         res.redirect("/admin/login");
  //       }
  //     });
  //   });
};
//--------------------- End of admin Login  ---------------------//

async function getPreviousConstants() {
  let a, b, c, status;
  let aq = `select * from constants`;
  let ares = await client.query(aq);
  let ob = ares['rows'][0];
  a = ob['a'], b = ob['b'], c = ob['c'], status = ob['status'];
  return [a, b, c, status];
}

//----------------- Start of admin Index (get) -----------------//

let adminIndexGet = async (req, res) => {
  if (req.session.loggedIn && req.session.userType == "admin") {
    // do stuff.
    let previousConstants = await getPreviousConstants();

    if (previousConstants[3] == 0) {
      // portal is off. course allocation off

    } else {

    }

    res.render("adminIndex", {
      user: req.session.email,
      a: previousConstants[0],
      b: previousConstants[1],
      c: previousConstants[2],
      status: previousConstants[3],
    });
  } else {
    res.redirect('login');
  }
};

// Multer Upload Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
}).single("uploadfile");

let adminIndexPost = (req, res) => {
  if (req.session.loggedIn && req.session.userType == "admin") {
    upload(req, res, async function (err) {
      if (err) {
        console.log("\nwhy error\n", err);
        return;
      }
      let previousConstants = await getPreviousConstants();
      let consts = 'abc';

      if (req.body['status'] != undefined) {
        let castatus = parseInt(req.body['status']);
        console.log(castatus);
        let newcastatus = 1 - castatus;
        let udatesq = `update constants set status = ${newcastatus} where status = ${castatus}`;
        let upress = await client.query(udatesq);
        await res.redirect('index');
      } else {

        for (let i = 0; i < 3; i++) {
          if (req.body[consts[i]] != undefined) {
            if (req.body[consts[i]] != previousConstants[i]) {
              let updateq = `update constants set ${consts[i]} = ${req.body[consts[i]]} where ${consts[i]} = ${previousConstants[i]}`;
              let upres = await client.query(updateq);
            }
          }
        }

        // Everything went fine'
        if (req.file != undefined) {
          console.log(__basedir + "/uploads/" + req.file.filename);
          exportExcelData2MySQL(__basedir + "/uploads/" + req.file.filename);

        }
        await res.redirect('index');
      }

    });
  } else {
    res.redirect('login');
  }

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
  // client.query(
  //   "SELECT $1::text as message",
  //   ["Hello world bsdwalo!"],
  //   (err, res) => {
  //     console.log(err ? err.stack : res.rows[0].message); // Hello World!
  //     clientR.end();
  //   }
  // );
}
//------------------ End of admin Index (Post) ------------------//

async function getPreviousAllocations(result) {
  let n = result["rows"].length;
  let checkedPrefs = Array.from(Array(n + 1), () => new Array(5));

  for (let faculty = 0; faculty <= n; faculty++) {
    if (faculty > 0) {
      let allocatedList = `select semcourseid from faculty_course_current where facultyid=${result["rows"][faculty-1]["facultyid"]}`;
      try {
        let res1 = await client.query(allocatedList);
        checkedPrefs[faculty][0] = 0;
        for (let pref = 1; pref <= 4; pref++) {
          checkedPrefs[faculty][pref] = 0;
          let SCID = result["rows"][faculty - 1]["SemCourseID" + pref];
          for (let k = 0; k < res1["rows"].length; k++) {
            if (res1["rows"][k]["semcourseid"] == SCID) {
              // console.log(faculty + " " + pref);
              checkedPrefs[faculty][pref] = 1;
            }
          }
        }
        if (faculty == n) {
          console.log(checkedPrefs);
          return checkedPrefs;
        }
      } catch (err1) {
        throw err1;
      }
    } else {
      for (let pref = 0; pref <= 4; pref++)
        checkedPrefs[faculty][pref] = 0;
    }
  }
}

async function getSelectedPreferences(req, n) {
  let selectedPrefs = Array.from(Array(n + 1), () => new Array(5));
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= 4; j++) {
      let id = "f" + i + "_pref" + j + "cb";

      if (req.body[id] == 'on')
        selectedPrefs[i][j] = 1;
      else
        selectedPrefs[i][j] = 0;
    }
  }
  return selectedPrefs;
}

let adminDashboardPost = async (req, res) => {
  console.log(req.body);

  let result = await client.query(query);
  let n = result["rows"].length;

  let selectedPrefs = await getSelectedPreferences(req, n);

  let prevAllocation = await getPreviousAllocations(result);

  for (let faculty = 1; faculty <= n; faculty++) {
    for (let pref = 1; pref <= 4; pref++) {

      let SCID = result["rows"][faculty - 1]["SemCourseID" + pref];
      let facultyID = result["rows"][faculty - 1]["facultyid"];

      if (selectedPrefs[faculty][pref] == 0) {
        if (prevAllocation[faculty][pref] == 1) {
          // it means the box was unchecked. So, we have to delete from allocation and increment maxLimit
          let deleteAllocationQ = `delete from faculty_course_current where facultyid=${facultyID} and semcourseid=${SCID}`;
          let delRes = await client.query(deleteAllocationQ);
          let incrementMQ = `update semcourselimit set maxfaculty = maxfaculty + 1 where semcourseid = ${SCID}`;
          let incrementRes = await client.query(incrementMQ);
          console.log('successfully deleted entry and updated all records');
        }
      } else {
        // already allocated then no work to do
        if (prevAllocation[faculty][pref] == 1)
          continue;
        // else we try to allocate
        // first we check if maxLimit is not met.
        let checkLimQuery = 'select maxfaculty from semcourselimit where semcourseid=' + SCID;
        try {
          let limres = await client.query(checkLimQuery);
          let maxLim = limres["rows"][0]["maxfaculty"];
          if (maxLim > 0) {
            // maxLimit not met then allocate and move.
            let allocateQ = `insert into faculty_course_current(facultyid, semcourseid) values(${facultyID}, ${SCID})`;
            try {
              let allocateREs = await client.query(allocateQ);
              let decrementLimitQ = `update semcourselimit set maxfaculty = maxfaculty - 1 where semcourseid = ${SCID}`;
              let decrementRes = await client.query(decrementLimitQ);
              console.log("allocated to faculty " + result["rows"][faculty - 1]["name"] + ", pref " + pref);
            } catch (allocateErr) {
              throw allocateErr;
            }

          } else {
            // maxLimit met so dont allocate. add to errors
            console.log("pref " + pref + " already full");
          }
        } catch (limerr) {
          throw limerr
        };

      }
    }
  }

  let allocationList = `select * from faculty_course_current`;
  let allocationRes = await client.query(allocationList);
  console.log("filled the table as: ");
  console.log(allocationRes["rows"]);

  let maxLimitView = `select * from semcourselimit`;
  let mlQres = await client.query(maxLimitView);
  console.log(mlQres["rows"]);

  res.redirect('dashboard');
}

//------------------ Start of admin Dashboard (get) ------------------//
let adminDashboardGet = async (req, res) => {
  let prevConsts = await getPreviousConstants();
  let a = prevConsts[0],
    b = prevConsts[1],
    c = prevConsts[2];
  if (req.session.loggedIn && req.session.userType == "admin") {
    let result = await client.query(query);
    try {
      let fobj = result["rows"];
      let n = fobj.length;

      let checkedPrefs = await getPreviousAllocations(result);

      res.render("../views/adminDashboard.ejs", {
        fobj,
        checkedPrefs,
        a,
        b,
        c,
      });
    } catch (errorr) {
      throw errorr;
    }
  } else {
    res.redirect('login');
  }
};

//---------------- End of admin Dashboard (get) ----------------//

async function getPreviousLimits() {
  let pq = `select * from semcourselimit`;
  let pres = await client.query(pq);

  let initialList = new Array(500).fill(0);

  for (let i = 0; i < pres['rows'].length; i++) {
    initialList[pres['rows'][i]['semcourseid']] = pres['rows'][i]['maxfaculty'];
  }
  return initialList;
}

let manageCoursesPost = async (req, res) => {
  let getInitialList = await getPreviousLimits();
  let newList = new Array(500).fill(0);
  let change = [];

  for (let i = 0; i < 500; i++) {
    let id = 'maxFaculty_' + i;
    if (req.body.hasOwnProperty(id)) {
      if (req.body[id] != getInitialList[i]) {
        change.push({
          'id': i,
          'lim': req.body[id]
        });
      }
    }
  }

  for (let i = 0; i < change.length; i++) {
    let id = change[i]['id'];
    let lim = change[i]['lim'];

    let upQ = `update semcourselimit set maxfaculty=${lim} where semcourseid = ${id}`;
    try {
      let upres = await client.query(upQ);
    } catch (uperr) {
      throw uperr;
    }
  }
  console.log("changed");
  res.redirect('manageCourses');
};

let manageCoursesGet = async (req, res) => {

  let maxFacultyQ = `select scl.semcourseid as "SemCourseId", scl.maxfaculty as "MaxFaculty", c.coursename as "Course" from semcourselimit as scl inner join sem_course as sc using (semcourseid) inner join course as c using (courseid)`;
  let maxFacRes = await client.query(maxFacultyQ);

  let ob = (maxFacRes["rows"]);
  res.render('manageCourses', {
    ob
  });
};


module.exports = {
  adminIndexGet,
  adminDashboardGet,
  adminDashboardPost,
  adminIndexPost,
  adminLoginGet,
  adminLoginPost,
  manageCoursesGet,
  manageCoursesPost,
};