let state = parseInt(document.getElementById('status').value);
let stateMsg = document.getElementById('portal_msg');
let divv = document.getElementById('fill_prefs');

if (state == 0) {
    // portal is closed
    stateMsg.textContent = "Portal is closed. Wait for the portal to open to fill up preferences.";
    divv.classList.add('hidden-class');
    divv.classList.remove('visible-class');

    stateMsg.classList.add('visible-class');
    stateMsg.classList.remove('hidden-class');
} else {
    stateMsg.classList.add('hidden-class');
    stateMsg.classList.remove('visible-class');

    divv.classList.remove('hidden-class');
    divv.classList.add('visible-class');
}