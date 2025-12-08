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