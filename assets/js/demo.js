// ================= ELEMENT REFERENCES =================
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");

const overlay = document.getElementById("overlay");
const resetPopup = document.getElementById("resetPopup");
const submitPopup = document.getElementById("submitPopup");

const cancelReset = document.getElementById("cancelReset");
const confirmReset = document.getElementById("confirmReset");
const submitOk = document.getElementById("submitOk");

// FORM FIELDS
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const whatsapp = document.getElementById("whatsapp");
const address = document.getElementById("address");
const iam = document.getElementById("iam");
const gender = document.getElementById("gender");
const board = document.getElementById("board");
const grade = document.getElementById("grade");
const vcode = document.getElementById("vcode");

// ================= HELPER FUNCTIONS =================
function showError(input, message) {
    let error = input.parentElement.querySelector(".error-text");
    if (!error) {
        error = document.createElement("small");
        error.className = "error-text text-danger";
        input.parentElement.appendChild(error);
    }
    error.textContent = message;
}

function clearError(input) {
    const error = input.parentElement.querySelector(".error-text");
    if (error) error.textContent = "";
}

// ================= ONLY NUMBERS (10 DIGITS) =================
function onlyTenDigits(input) {
    input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "").slice(0, 10);

        if (input.value.length !== 10) {
            showError(input, "Enter exactly 10 digits");
        } else {
            clearError(input);
        }
    });
}

onlyTenDigits(contact);
onlyTenDigits(whatsapp);

// ================= EMAIL VALIDATION =================
email.addEventListener("input", () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        showError(email, "Enter a valid email address");
    } else {
        clearError(email);
    }
});

// ================= RESET LOGIC =================
resetBtn.addEventListener("click", () => {
    overlay.style.display = "block";
    resetPopup.style.display = "block";
});

cancelReset.addEventListener("click", () => {
    resetPopup.style.display = "none";
    overlay.style.display = "none";
});

confirmReset.addEventListener("click", () => {
    fullname.value = "";
    email.value = "";
    contact.value = "";
    whatsapp.value = "";
    address.value = "";
    iam.selectedIndex = 0;
    gender.selectedIndex = 0;
    board.selectedIndex = 0;
    grade.selectedIndex = 0;
    vcode.value = "";

    document.querySelectorAll(".error-text").forEach(e => e.textContent = "");

    resetPopup.style.display = "none";
    overlay.style.display = "none";
});

// ================= SUBMIT LOGIC =================
submitBtn.addEventListener("click", () => {

    let valid = true;

    // REQUIRED FIELD CHECK
    [
        fullname, email, contact, whatsapp, address, vcode
    ].forEach(field => {
        if (!field.value.trim()) {
            showError(field, "This field is required");
            valid = false;
        } else {
            clearError(field);
        }
    });

    if (iam.selectedIndex === 0 ||
        gender.selectedIndex === 0 ||
        board.selectedIndex === 0 ||
        grade.selectedIndex === 0) {
        alert("Please select all dropdown fields.");
        valid = false;
    }

    // CONTACT CHECK
    if (contact.value.length !== 10) {
        showError(contact, "Enter exactly 10 digits");
        valid = false;
    }

    if (whatsapp.value.length !== 10) {
        showError(whatsapp, "Enter exactly 10 digits");
        valid = false;
    }

    // EMAIL CHECK
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        showError(email, "Enter a valid email address");
        valid = false;
    }

    // ❌ STOP IF INVALID
    if (!valid) return;

    // ✅ SUCCESS
    overlay.style.display = "block";
    submitPopup.style.display = "block";
});

// ================= SUBMIT OK =================
submitOk.addEventListener("click", () => {
    submitPopup.style.display = "none";
    overlay.style.display = "none";
});
