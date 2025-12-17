// ---------- ELEMENT REFERENCES ----------
const form = document.getElementById("studentForm");

const resetBtn = document.querySelector(".btn-reset");
const submitBtn = document.querySelector(".btn-submit");

// Reset Popup
const resetOverlay = document.getElementById("resetOverlay");
const resetCancel = document.getElementById("resetCancel");
const resetConfirm = document.getElementById("resetConfirm");

// Success Popup
const successOverlay = document.getElementById("successOverlay");
const successOk = document.getElementById("successOk");


// ---------- RESET LOGIC ----------
resetBtn.addEventListener("click", () => {
    resetOverlay.style.display = "flex";
});

resetCancel.addEventListener("click", () => {
    resetOverlay.style.display = "none";
});

resetConfirm.addEventListener("click", () => {
    form.reset();
    resetOverlay.style.display = "none";
});


// ---------- SUBMIT LOGIC ----------
submitBtn.addEventListener("click", () => {
    successOverlay.style.display = "flex";
});

successOk.addEventListener("click", () => {
    successOverlay.style.display = "none";
    form.reset();
});