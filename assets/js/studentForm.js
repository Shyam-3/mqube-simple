// ================= ELEMENT REFERENCES =================
const form = document.getElementById("studentForm");

const resetBtn = document.querySelector(".btn-reset");
const submitBtn = document.querySelector(".btn-submit");

const contactNo = document.getElementById("contactNo");
const whatsappNo = document.getElementById("whatsappNo");
const emailId = document.getElementById("emailId");

// POPUPS
const resetOverlay = document.getElementById("resetOverlay");
const resetCancel = document.getElementById("resetCancel");
const resetConfirm = document.getElementById("resetConfirm");

const successOverlay = document.getElementById("successOverlay");
const successOk = document.getElementById("successOk");


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
function allowOnlyNumbers(input) {
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

allowOnlyNumbers(contactNo);
allowOnlyNumbers(whatsappNo);


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


// ================= RESET LOGIC =================
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
            document.querySelectorAll(".error-text").forEach(e => e.textContent = "");
            resetOverlay.style.display = "none";
        });
    }
}




// ---------- SUBMIT LOGIC ----------
submitBtn.addEventListener("click", () => {

    // 🔴 Check if all required fields are filled
    if (!form.checkValidity()) {
        form.reportValidity(); // shows browser validation messages
        return;
    }

    // ✅ If all fields are filled
    successOverlay.style.display = "flex";
});

successOk.addEventListener("click", () => {
    successOverlay.style.display = "none";
    form.reset();
});
