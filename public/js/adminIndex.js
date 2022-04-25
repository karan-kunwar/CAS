<<<<<<< HEAD
document.getElementById("goToDashboard").onclick = function () {
  console.log("clicked");
  let url = "dashboard";
  location.href = url;
=======
const {
    location,
    append
} = require("express/lib/response");

document.getElementById('goToDashboard').onclick = function () {
    console.log("clicked");
    let url = 'localhost:3000/admin/dashboard';
    location.href = url;
    window.location(url);
>>>>>>> 29e2dccf15d080c4f7eccf003f30f2570eda88f7
};

let courseAllocationState = true;
let checkBtn = document.querySelectorAll(".btn")[0];
let checkStart = checkBtn.textContent[0] == "O"; // true if open

if (courseAllocationState) {
  // if already open and trying to close then close.
  if (checkStart == false) {
    let openAllocationElements = document.querySelectorAll(".openAllocation");
    openAllocationElements.hidden = true;
  }
} else {
<<<<<<< HEAD
  //is closed
  if (checkStart) {
    // take sems even or odd
    // upload excell
  }
}
=======
    //is closed
    if (checkStart) {
        // take sems even or odd
        // upload excell
    }
}
>>>>>>> 29e2dccf15d080c4f7eccf003f30f2570eda88f7
