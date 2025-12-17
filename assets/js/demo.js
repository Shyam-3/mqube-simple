// Get elements
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const overlay = document.getElementById("overlay");

const resetPopup = document.getElementById("resetPopup");
const submitPopup = document.getElementById("submitPopup");

const cancelReset = document.getElementById("cancelReset");
const confirmReset = document.getElementById("confirmReset");
const submitOk = document.getElementById("submitOk");

// RESET BUTTON CLICK
resetBtn.addEventListener("click", () => {
    overlay.style.display = "block";
    resetPopup.style.display = "block";
});

// CANCEL RESET
cancelReset.addEventListener("click", () => {
    resetPopup.style.display = "none";
    overlay.style.display = "none";
});

// CONFIRM RESET
confirmReset.addEventListener("click", () => {
    // document.querySelector("form")?.reset();
    document.getElementById("fullname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("whatsapp").value = "";
    document.getElementById("address").value = "";
    document.getElementById("iam").selectedIndex = 0;
    document.getElementById("gender").selectedIndex = 0;
    document.getElementById("board").selectedIndex = 0;
    document.getElementById("grade").selectedIndex = 0;
    document.getElementById("vcode").value = "";
    resetPopup.style.display = "none";
    overlay.style.display = "none";
});

// SUBMIT BUTTON CLICK
submitBtn.addEventListener("click", () => {

    // Validation example: email, name, contact required
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();

    if (!fullname || !email || !contact) {
        alert("Please fill all required fields.");
        return;
    }

    overlay.style.display = "block";
    submitPopup.style.display = "block";
});

// SUBMIT OK BUTTON
submitOk.addEventListener("click", () => {
    submitPopup.style.display = "none";
    overlay.style.display = "none";
});
