<?php 

session_start();

require('db.php'); // Assuming db.php establishes $conn

if (!isset($conn) || mysqli_connect_errno()) {
    error_log("Database connection failed: " . mysqli_connect_error());
    header("Location: contacts.html?inquiry_error=2"); 
    exit();
}

if (isset($_POST['submit_inquiry'])) { // Ensure your submit button has name="submit_inquiry"

    // 1. Get and sanitize input (Matching POST names from HTML)
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
    
    // Process Add-ons (array to string)
    $addonsArray = $_POST['addons'] ?? [];
    $addonsList = !empty($addonsArray) ? implode(", ", $addonsArray) : ""; // Empty string if none selected
    
    // Set default status and current timestamp for inquiry_date
    $status = 'Pending';
    // Note: If you want the database to set the date/time automatically, you can remove this variable and the corresponding 's' from the bind parameters.
    // For manual setting:
    // $inquiry_date = date('Y-m-d H:i:s'); 

    // 2. Prepare SQL Statement to match ALL target columns
    $query = "INSERT INTO tbl_inquiries (
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

    // 3. Bind parameters (14 strings 'ssssssssssssss', plus the status column)
    // Assuming 'inquiry_date' is set by the database using NOW()
    // The number of 's' matches the 14 placeholders '?' above (NOW() is not a placeholder).
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
    
    if (mysqli_stmt_execute($stmt)) {
        // Inquiry submitted successfully
        mysqli_stmt_close($stmt);
        header("Location: contacts.html?inquiry_success=1"); 
        exit();
    } else {
        error_log("MySQLi Execute Error: " . mysqli_stmt_error($stmt));
        mysqli_stmt_close($stmt);
        header("Location: contacts.html?inquiry_error=2");
        exit();
    }
} else {
    // If the script is accessed directly without POST data
    header("Location: contacts.html");
    exit();
}

?>