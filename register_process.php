<?php
// FILE: login_process.php (Handles user registration)

session_start();
// Include the dedicated database connection file
require('db.php'); 

// Check if the registration form was submitted
if (isset($_POST['register'])) {

    // --- 1. Input Validation and Sanitization ---
    
    // Trim input to remove extra spaces
    $lastname = trim($_POST['lastname']);
    $firstname = trim($_POST['firstname']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Check if passwords match
    if ($password !== $confirm_password) {
        // Passwords don't match
        header("Location: landing.html?register_error=2");
        exit();
    }
    
    // --- 2. Secure Password Hashing ---
    
    // 🔒 SECURITY: Use password_hash() for strong, modern hashing (bcrypt)
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // --- 3. Database Insertion using Prepared Statements ---
    
    // 🎯 FIX: Using backticks (`) and exact capitalization to match the database columns.
    // 🎯 FIX: Using question mark placeholders (?) for security.
    $query = "INSERT INTO tbl_reginfo (`Last Name`, `First Name`, `Email`, `Password`) VALUES (?, ?, ?, ?)";
    
    // Prepare the statement
    $stmt = mysqli_prepare($conn, $query);
    
    if ($stmt === false) {
        // If preparation fails, it means the table name or column names are misspelled/wrong.
        error_log("MySQLi Prepare Error: " . mysqli_error($conn));
        header("Location: landing.html?register_error=3"); // Triggered if table/columns are wrong
        exit();
    }

    // Bind parameters: 'ssss' means four string variables (the order must match the query).
    // The variables used are the clean input and the securely HASHED password.
    mysqli_stmt_bind_param($stmt, 'ssss', $lastname, $firstname, $email, $hashed_password);
    
    // Execute the statement
    $result = mysqli_stmt_execute($stmt);
    
    // Check for success or failure
    if ($result) {
        // Registration successful
        header("Location: landing.html?register_success=1");
        exit();
    } else {
        // Registration failed (e.g., connection issue, or unique constraint violation on email)
        error_log("MySQLi Execute Error: " . mysqli_stmt_error($stmt));
        header("Location: landing.html?register_error=1");
        exit(); 
    }
    
    // Close the statement
    mysqli_stmt_close($stmt);

} else {
    // If the script is accessed directly without POST data, redirect
    header("Location: landing.html");
    exit();
}
?>