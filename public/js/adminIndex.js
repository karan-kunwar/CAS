let cAbutton = document.getElementById('openCourseAllocationBtn');
let cAmsg = document.getElementById('status-msg');
let courseAllocationState = parseInt(document.getElementById('status-value').value);
let link = document.getElementById('courseAllocation_redirect');
let sessionContainer = document.getElementById('session-container');

if (courseAllocationState == 0) {
  cAbutton.textContent = "Open Course Allocation Portal";
  cAmsg.textContent = "Course Allocation Portal is currently closed ...";
  link.classList.add("hidden-class");
  link.classList.remove("visible-class");

  sessionContainer.classList.remove("hidden-class");
  sessionContainer.classList.add("visible-class");

} else {
  cAbutton.textContent = "Close Course Allocation Portal";
  cAmsg.textContent = "Course Allocation Portal is currently accepting responses ...";
  link.classList.remove("hidden-class");
  link.classList.add("visible-class");

  sessionContainer.classList.add("hidden-class");
  sessionContainer.classList.remove("visible-class");
}

// if (courseAllocationState) {
//   // if already open and trying to close then close.
//   if (checkStart == false) {
//     let openAllocationElements = document.querySelectorAll(".openAllocation");
//     openAllocationElements.hidden = true;
//   }
// } else {
//   //is closed
//   if (checkStart) {
//     // take sems even or odd
//     // upload excell
//   }
// }