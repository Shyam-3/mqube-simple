// ================= FORM ELEMENTS =================
const form = document.getElementById("teacherForm");
const resetBtn = document.querySelector(".btn-reset");
const submitBtn = document.querySelector(".btn-submit");
const agreeCheckbox = document.getElementById("agreeCheck");

const contactNo = document.getElementById("contactNo");
const whatsappNo = document.getElementById("whatsappNo");
const emailId = document.getElementById("emailId");
const fileInputs = document.querySelectorAll(".file-input");

// ================= POPUPS =================
const resetOverlay = document.getElementById("resetOverlay");
const resetCancel = document.getElementById("resetCancel");
const resetConfirm = document.getElementById("resetConfirm");

const successOverlay = document.getElementById("successOverlay");
const successOk = document.getElementById("successOk");

// ================= CONSTANTS =================
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];

// ================= ERROR HELPERS =================
function showError(input, message) {
    let error = input.parentElement.querySelector(".error-text");
    if (!error) {
        error = document.createElement("small");
        error.className = "error-text text-danger d-block mt-1";
        input.parentElement.appendChild(error);
    }
    error.textContent = message;
}

function clearError(input) {
    const error = input.parentElement.querySelector(".error-text");
    if (error) error.textContent = "";
}

// ================= PHONE NUMBER VALIDATION =================
function onlyTenDigits(input) {
    if (!input) return;
    input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "").slice(0, 10);

        if (input.value.length !== 10) {
            showError(input, "Enter exactly 10 digits");
        } else {
            clearError(input);
        }
    });
}

onlyTenDigits(contactNo);
onlyTenDigits(whatsappNo);

// ================= EMAIL VALIDATION =================
if (emailId) {
    emailId.addEventListener("input", () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailId.value)) {
            showError(emailId, "Enter a valid email address");
        } else {
            clearError(emailId);
        }
    });
}

// ================= FILE VALIDATION =================
fileInputs.forEach(input => {
    if (!input) return;
    input.addEventListener("change", () => {
        const file = input.files[0];
        if (!file) return;

        if (!ALLOWED_TYPES.includes(file.type)) {
            showError(input, "Only JPG, PNG or PDF allowed");
            input.value = "";
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            showError(input, "File size must be 5MB or less");
            input.value = "";
            return;
        }

        clearError(input);
    });
});

// ================= RESET =================
if (resetBtn && resetOverlay) {
    resetBtn.addEventListener("click", () => {
        resetOverlay.style.display = "flex";
    });

    if (resetCancel) {
        resetCancel.addEventListener("click", () => {
            resetOverlay.style.display = "none";
        });
    }

    if (resetConfirm) {
        resetConfirm.addEventListener("click", () => {
            if (form) form.reset();
            document.querySelectorAll(".error-text").forEach(e => e.remove());
            resetOverlay.style.display = "none";
        });
    }
}

// ================= SUBMIT =================
if (submitBtn) {
    submitBtn.addEventListener("click", () => {

    // 1️⃣ HTML required fields
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // 2️⃣ Phone validation
    if (contactNo.value.length !== 10) {
        showError(contactNo, "Enter exactly 10 digits");
        contactNo.focus();
        return;
    }

    if (whatsappNo.value.length !== 10) {
        showError(whatsappNo, "Enter exactly 10 digits");
        whatsappNo.focus();
        return;
    }

    // 3️⃣ Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailId.value)) {
        showError(emailId, "Enter a valid email address");
        emailId.focus();
        return;
    }

    // 4️⃣ File validation (final safety check)
    for (let input of fileInputs) {
        if (!input.files[0]) {
            showError(input, "This file is required");
            return;
        }
    }

    // 5️⃣ Terms & Conditions
    if (!agreeCheckbox.checked) {
        alert("Please agree to the terms & conditions.");
        return;
    }

    // ✅ SUCCESS
    successOverlay.style.display = "flex";
    });
}

if (successOk && successOverlay) {
    successOk.addEventListener("click", () => {
        successOverlay.style.display = "none";
        if (form) form.reset();
        document.querySelectorAll(".error-text").forEach(e => e.remove());
    });
}
