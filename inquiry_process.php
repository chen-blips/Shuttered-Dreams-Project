<?php 

session_start();

require('db.php'); // Assuming db.php establishes $conn

if (!isset($conn) || mysqli_connect_errno()) {
    error_log("Database connection failed: " . mysqli_connect_error());
    header("Location: contacts.html?inquiry_error=2"); 
    exit();
}

if (isset($_POST['submit_inquiry'])) { 

    // 1. Get and sanitize input (Matching POST names from HTML)
    // FIX: Explicitly cast to (string) to guarantee type 's' for bind_param
    $bridename = (string)trim($_POST['brideName'] ?? '');
    $groomname = (string)trim($_POST['groomName'] ?? '');
    $prefferednames = (string)trim($_POST['preferredNames'] ?? ''); 
    $email = (string)trim($_POST['email'] ?? '');
    $phone = (string)trim($_POST['phone'] ?? '');
    $location = (string)trim($_POST['location'] ?? '');
    $weddingdate = (string)trim($_POST['weddingDate'] ?? '');
    $time = (string)trim($_POST['time'] ?? '');
    $package = (string)trim($_POST['package'] ?? '');
    $otherPackageName = (string)trim($_POST['otherPackageName'] ?? '');
    $howFindUs = (string)trim($_POST['howFindUs'] ?? '');
    $otherSourceName = (string)trim($_POST['otherSourceName'] ?? '');
    
    // Process Add-ons (array to string)
    $addonsArray = $_POST['addons'] ?? []; 
    
    // START FIX FOR: TypeError: implode(): Argument #2 ($array) must be of type array, string given
    if (!is_array($addonsArray)) {
        // If it's a string, wrap it in an array to safely use implode
        $addonsArray = [$addonsArray];
    }
    // END FIX

    // Implode the array into a comma-separated string
    $addonsList = implode(", ", $addonsArray);
    $addonsList = (string)$addonsList;
    
    // Set default status
    $status = (string)'Pending';

    // 2. Prepare SQL Statement to match ALL target columns
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

    // 3. Bind parameters (14 strings 'ssssssssssssss')
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