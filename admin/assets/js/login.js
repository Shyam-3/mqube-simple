// Login Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        
        const icon = this.querySelector('i');
        icon.classList.toggle('bi-eye-fill');
        icon.classList.toggle('bi-eye-slash-fill');
    });

    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // For now, use simple validation (will be replaced with DB logic)
        // Default credentials: admin / admin123
        if (username === 'admin' && password === 'admin123') {
            // Store login state
            sessionStorage.setItem('adminLoggedIn', 'true');
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Show error message
            errorMessage.classList.remove('d-none');
            
            // Hide error after 3 seconds
            setTimeout(() => {
                errorMessage.classList.add('d-none');
            }, 3000);
        }
    });

    // Clear error on input change
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            errorMessage.classList.add('d-none');
        });
    });
});
