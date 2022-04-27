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

// get a, b, c
let a = 2,
    b = 1,
    c = 3;

// fill up all the divs
let tempData = {
    'pref1': {
        'name': "ENB",
        'L': 2,
        'T': 1,
        'P': 1
    },
    'pref2': {
        'name': "ADA",
        'L': 2,
        'T': 0,
        'P': 2
    },
    'pref3': {
        'name': "CAS",
        'L': 2,
        'T': 0,
        'P': 2
    },
    'pref4': {
        'name': "PGM",
        'L': 2,
        'T': 1,
        'P': 0
    },
    'pref5': {
        'name': "DSS",
        'L': 0,
        'T': 2,
        'P': 2
    },
    'pref6': {
        'name': "COP",
        'L': 4,
        'T': 0,
        'P': 0
    },
};

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

for (let i = 0; i < cards.length; i++) {
    let totalLoad = 0;
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
        // console.log(checkbox);
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