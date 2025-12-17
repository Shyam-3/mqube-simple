// FORM ELEMENTS
const form = document.getElementById("teacherForm");
const resetBtn = document.querySelector(".btn-reset");
const submitBtn = document.querySelector(".btn-submit");
const agreeCheckbox = document.getElementById("agreeCheck");

// RESET POPUP
const resetOverlay = document.getElementById("resetOverlay");
const resetCancel = document.getElementById("resetCancel");
const resetConfirm = document.getElementById("resetConfirm");

// SUCCESS POPUP
const successOverlay = document.getElementById("successOverlay");
const successOk = document.getElementById("successOk");


// ------- RESET BUTTON -------
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


// ------- SUBMIT BUTTON -------
submitBtn.addEventListener("click", () => {

    // Check if terms are accepted
    if (!agreeCheckbox.checked) {
        alert("Please agree to the terms & conditions before submitting.");
        return;
    }

    successOverlay.style.display = "flex";
});

successOk.addEventListener("click", () => {
    successOverlay.style.display = "none";
    form.reset();
});
