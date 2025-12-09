<?php 

// Ensure you have a working db.php file in the same directory for the connection.
// This example assumes your connection variable is $conn.
require('inquiry_db.php'); 

// Check if the database connection failed
if (!isset($conn) || mysqli_connect_errno()) {
    // Log the error for debugging
    error_log("Database connection failed: " . mysqli_connect_error());
    // Redirect to an error page (or the contacts page with an error code)
    header("Location: contacts.html?inquiry_error=2"); 
    exit();
}

if (isset($_POST['submit_inquiry'])) { 

    // 1. Retrieve and Sanitize Input Variables
    $bridename = trim($_POST['brideName'] ?? '');
    $groomname = trim($_POST['groomName'] ?? '');
    $prefferednames = trim($_POST['preferredNames'] ?? ''); 
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $location = trim($_POST['location'] ?? '');
    $weddingdate = trim($_POST['weddingDate'] ?? '');
    $time = trim($_POST['time'] ?? '');
    $package = trim($_POST['package'] ?? '');
    $otherPackageName = trim($_POST['otherPackageName'] ?? '');
    $howFindUs = trim($_POST['howFindUs'] ?? '');
    $otherSourceName = trim($_POST['otherSourceName'] ?? '');
    
    // --- CRITICAL FIX for implode() Error ---
    // 2. Process Add-ons 
    $addonsArray = $_POST['addons'] ?? []; 
    
    // Safety check: This is the logic that prevents the crash if only one item is selected 
    // or if the HTML name wasn't perfect.
    if (!is_array($addonsArray)) {
    // If it's a single string, wrap it in an array
    $addonsArray = [$addonsArray];
    }
    
    // Implode the array into a comma-separated string for database insertion 
    $addonsList = implode(", ", $addonsArray);
    
    // Set default status (Database column 'status' is enum('Pending', 'Contacted', ...))
    $status = 'Pending';

    // 3. Prepare SQL Statement
    // Insert into the columns matching your database structure
    $query = "INSERT INTO inquiries (
        bride_name, groom_name, preferred_names, client_email, client_phone, 
        event_location, wedding_date, ideal_time, package_selection, other_package_name, 
        addons, source_how_find_us, other_source_name, status, inquiry_date
    ) VALUES (
        ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, NOW()
    )";
    
    $stmt = mysqli_prepare($conn, $query);
    
    if ($stmt === false) {
        error_log("MySQLi Prepare Error: " . mysqli_error($conn));
        header("Location: contacts.html?inquiry_error=2");
        exit();
    }

    // 4. Bind parameters (14 strings 'ssssssssssssss')
    mysqli_stmt_bind_param($stmt, 'ssssssssssssss', 
        $bridename, 
        $groomname, 
        $prefferednames, 
        $email, 
        $phone, 
        $location, 
        $weddingdate, 
        $time, 
        $package, 
        $otherPackageName, 
        $addonsList, 
        $howFindUs, 
        $otherSourceName, 
        $status
    );
    
    // 5. Execute and Redirect
    if (mysqli_stmt_execute($stmt)) {
        // Success: Close the statement and redirect back to contacts.html
        mysqli_stmt_close($stmt);
        // CRITICAL: This URL parameter triggers the success modal in your JavaScript
        header("Location: contacts.html?inquiry_success=1"); 
        exit();
    } else {
        // Execution Failure
        error_log("MySQLi Execute Error: " . mysqli_stmt_error($stmt));
        mysqli_stmt_close($stmt);
        header("Location: contacts.html?inquiry_error=2");
        exit();
    }

} else {
    // If someone tries to access the page directly without submitting the form
    header("Location: contacts.html");
    exit();
}

?>