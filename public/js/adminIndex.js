const {
    location,
    append
} = require("express/lib/response");

document.getElementById('goToDashboard').onclick = function () {
    console.log("clicked");
    let url = 'localhost:3000/admin/dashboard';
    location.href = url;
    window.location(url);
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
    //is closed
    if (checkStart) {
        // take sems even or odd
        // upload excell
    }
}
