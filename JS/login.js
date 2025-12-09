        // Get the modal element
var modal = document.getElementById('loginModal');

// Get the button that opens the modal (e.g., a "Login" button in your header)
var btn = document.getElementById("loginBtn"); // You need to add id="loginBtn" to your HTML link/button

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-btn")[0];

// --- 1. When the user clicks the button, open the modal ---
btn.onclick = function() {
  modal.style.display = "block";
}

// --- 2. When the user clicks on <span> (x), close the modal ---
span.onclick = function() {
  modal.style.display = "none";
}

// --- 3. When the user clicks anywhere outside of the modal, close it ---
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Get references to the elements
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const goToRegisterBtn = document.getElementById('goToRegister');

// Function to switch from Login to Register
goToRegisterBtn.addEventListener('click', () => {
    // 1. Hide the Login Modal
    loginModal.style.display = 'none'; 
    
    // 2. Show the Register Modal
    // Note: If you used 'display: flex;' in your CSS, use 'flex' here. 
    // If you used 'display: block;' in your CSS, use 'block' here.
    var modal = document.getElementById('registerModal');
});


// (Optional) Function to switch back from Register to Login
const goToLoginBtn = document.getElementById('goToLogin');

goToLoginBtn.addEventListener('click', () => {
    // 1. Hide the Register Modal
    registerModal.style.display = 'none';
    
    // 2. Show the Login Modal
    var modal = document.getElementById('loginModal');
});

// To start the process, you'd typically have a function/button that initially 
// shows the login modal:
// function openLogin() {
//     loginModal.style.display = 'flex';
// }

//Login/Register error message handler!

function handleAuthRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // --- Error Message Definitions ---
    const loginErrors = {
        '1': 'Login failed. Invalid email or password.',
        // You would use '1' for any generic login failure (invalid credentials, DB error, etc.)
    };

    const registerErrors = {
        '1': 'Registration failed due to a server error. Please try again.',
        '2': 'The passwords you entered do not match.',
        '3': 'An internal error occurred. Please try again later.',
        '4': 'This email address is already registered. Try logging in.',
    };
    
    const successMessages = {
        'register_success': 'Registration successful! You can now log in.',
        // Add more success types here if needed
    };
    
    let message = '';
    let modalId = '';
    let messageElementId = '';

    // --- Check for Login Errors ---
    if (urlParams.has('login_error')) {
        const errorCode = urlParams.get('login_error');
        message = loginErrors[errorCode] || 'An unknown login error occurred.';
        modalId = 'loginModal';
        messageElementId = 'login-error-message';
    } 
    
    // --- Check for Registration Errors ---
    else if (urlParams.has('register_error')) {
        const errorCode = urlParams.get('register_error');
        message = registerErrors[errorCode] || 'An unknown registration error occurred.';
        modalId = 'registermodal';
        messageElementId = 'register-error-message';
    } 
    
    // --- Check for Success Messages ---
    else if (urlParams.has('register_success')) {
        const successCode = urlParams.get('register_success');
        message = successMessages['register_success']; // Only one success message for now
        modalId = 'loginModal'; // Show success message in the login modal
        messageElementId = 'login-error-message'; 
        
        // Change the class/color for success (optional, requires a .success-message CSS class)
        // document.getElementById(messageElementId).classList.add('success-message');
    }

    // --- Display the Message and Open the Modal ---
    if (message && modalId && messageElementId) {
        const modal = document.getElementById(modalId);
        const messageElement = document.getElementById(messageElementId);
        
        if (modal && messageElement) {
            // 1. Set the text and make the message visible
            messageElement.innerHTML = message;
            messageElement.style.display = 'block';
            
            // 2. Open the corresponding modal
            modal.style.display = 'block';
            
            // 3. Clean up the URL (to prevent message from reappearing on refresh)
            // This replaces the URL without reloading the page
            const cleanUrl = window.location.pathname;
            history.replaceState(null, null, cleanUrl);
        }
    }
}

// Ensure the function runs when the page loads
document.addEventListener('DOMContentLoaded', handleAuthRedirect);


// --- Close Button Logic ---
const loginModalElement = document.getElementById('loginModal');
const closeLoginButton = document.getElementById('closeLoginButton');

// Function to close the login modal
function closeLoginModal() {
    if (loginModalElement) {
        loginModalElement.style.display = 'none';
        // You might want to remove this line if your CSS doesn't set body overflow
        document.body.style.overflow = ''; 
    }
}

// 1. Add event listener to the 'X' button
if (closeLoginButton) {
    closeLoginButton.addEventListener('click', closeLoginModal);
}

// 2. The existing window.onclick for outside click works fine if it references the right modal variable:
window.onclick = function(event) {
    if (event.target == loginModalElement) {
        loginModalElement.style.display = "none";
    }
    // Also add logic for the register modal's backdrop if needed
    const registerModalElement = document.getElementById('registermodal');
    if (registerModalElement && event.target == registerModalElement) {
        registerModalElement.style.display = "none";
    }
}


// --- BONUS: Fix the Register Modal 'X' button too ---
const registerModalElement = document.getElementById('registermodal');
const closeRegisterButton = document.getElementById('closeRegisterButton');

function closeRegisterModal() {
    if (registerModalElement) {
        registerModalElement.style.display = 'none';
        document.body.style.overflow = '';
    }
}

if (closeRegisterButton) {
    closeRegisterButton.addEventListener('click', closeRegisterModal);
}