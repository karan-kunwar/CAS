//Changing UI of dashboard - alternate light-dark cards
let f = document.querySelectorAll(".frame");

for (let i = 0; i < f.length; i++) {
    if (i % 2 == 1) {
        f[i].classList.remove("faculty");
        f[i].classList.add("faculty-alt");
    }
    console.log(f[i].classList);
}

f = document.querySelectorAll(".dock");
for (let i = 0; i < f.length; i++) {
    if (i % 2 == 1) {
        f[i].classList.remove("dock");
        f[i].classList.add("dock-alt");
    }
    console.log(f[i].classList);
}


// fill up
let cards = document.querySelectorAll(".preferences");

function setComment(id, totalLoad) {
    let comment = document.getElementById(id);
    console.log(comment);
    if (totalLoad < 20) {
        comment.textContent = "LOW";
        comment.style.color = "yellow";
    } else if (totalLoad <= 40) {
        comment.textContent = "MEDIUM";
        comment.style.color = "orange";
    } else {
        comment.textContent = "HIGH";
        comment.style.color = "red";
    }
}

function calcPrevLoad(card) {
    let totalLoad = 0;
    for (let pref = 0; pref < 4; pref++) {
        let idd = "f" + (card + 1) + "_pref" + (pref + 1);
        let load = parseInt(document.getElementById(idd + "load").textContent);
        let checkbox = document.getElementById(idd + "cb");
        let checked = checkbox.checked;
        if (checked)
            totalLoad += load;
    }
    let totalID = "f" + (card + 1) + "_totalLoad";
    document.getElementById(totalID).textContent = totalLoad.toString();
    return totalLoad;
}

for (let i = 0; i < cards.length; i++) {
    let totalLoad = calcPrevLoad(i);
    setComment("f" + (i + 1) + "_comment", totalLoad);
    for (let j = 0; j < 4; j++) {
        let idn = j + 1;
        let idd = "f" + (i + 1) + "_pref" + idn.toString();
        let tid = "pref" + idn.toString();

        // document.getElementById(idd).textContent = tempData[tid]["name"];
        // let load = tempData[tid]["L"] * a + tempData[tid]["T"] * b + tempData[tid]["P"] * c;
        let loadID = idd + "load";
        // console.log(loadID);
        let load = parseInt(document.getElementById(loadID).textContent);

        let checkbox = document.getElementById(idd + "cb");
        let checked = checkbox.checked;

        checkbox.addEventListener("click", (event) => {
            if (checked) {
                totalLoad -= load;
                checked = !checked;
            } else {
                totalLoad += load;
                checked = !checked;
            }
            let totalID = "f" + (i + 1) + "_totalLoad";
            document.getElementById(totalID).textContent = totalLoad.toString();
            let commentID = "f" + (i + 1) + "_comment";
            setComment(commentID, totalLoad);
        });
    }

}