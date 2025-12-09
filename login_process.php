<?php
// FILE: login_process.php (Handles secure login attempt and role check)

session_start();
// Include the dedicated database connection file
require('db.php'); 

// Add this check for a failed database connection
if (!isset($conn) || mysqli_connect_errno()) {
    error_log("Database connection failed.");
    header("Location: landing.html?login_error=2"); 
    exit();
}

if (isset($_POST['login'])) {

    // 1. Get and sanitize input
    $email = trim($_POST['email']);
    $password = $_POST['password']; 

    // --- 2. Use Prepared Statement to fetch user and role ---

    // Select all user data, including the 'Role' and 'Password' columns
    // NOTE: MySQL column names are case-sensitive on some systems (e.g., Linux), 
    // but the column name in the result array will always match the case in the DB schema.
    $query = "SELECT * FROM tbl_reginfo WHERE Email = ?";
    
    $stmt = mysqli_prepare($conn, $query);
    
    if ($stmt === false) {
        error_log("MySQLi Prepare Error: " . mysqli_error($conn));
        header("Location: landing.html?login_error=2");
        exit();
    }

    mysqli_stmt_bind_param($stmt, 's', $email);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    mysqli_stmt_close($stmt);

    // --- 3. Verify Password and Check Role ---

    // Check if exactly one user was found
    if ($result && mysqli_num_rows($result) === 1) {
        $row = mysqli_fetch_assoc($result);

        // 🎯 FIX: Access the password using the database column case: $row['Password']
        if (password_verify($password, $row['Password'])) {
            
            // Password is correct, establish session variables
            $_SESSION['email'] = $row['Email']; 
            
            // 🎯 FIX: Access the role using the database column case: $row['Role']
            $_SESSION['role'] = $row['Role']; 

            // Check if the user is an admin
            // 🎯 FIX: Check the role using the database column case: $row['Role']
            if ($row['Role'] === 'admin') {
                // Admin user: Redirect to the admin dashboard
                header("Location: dashboard.php");
                exit();
            } else {
                // Standard user: Redirect to the regular dashboard
                header("Location: index.html");
                exit();
            }
        }
    }
    
    // Introduce a slight delay for security against brute-force attacks
    usleep(rand(500000, 1000000));
    
    // Redirect back on failure (login_error=1 for invalid credentials)
    header("Location: landing.html?login_error=1");
    exit(); 
    
} else {
    // If the script is accessed directly, redirect to the landing page
    header("Location: landing.html");
    exit();
}
?>