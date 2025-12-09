<?php 

session_start();

// Assuming db.php establishes $conn and includes connection logic
require('db.php'); 

if (!isset($conn) || mysqli_connect_errno()) {
    // Log detailed connection error
    error_log("Database connection failed: " . mysqli_connect_error());
    header("Location: contacts.html?inquiry_error=2"); 
    exit();
}

// Ensure the form's submit button has name="submit_inquiry"
if (isset($_POST['submit_inquiry'])) { 

    // 1. Get and explicitly cast input to (string) to guarantee type 's' for bind_param
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
    
    // FIX for: TypeError: implode(): Argument #2 must be of type array, string given
    if (!is_array($addonsArray)) {
        // If it's a single string (which happens with one checkbox), wrap it in an array
        $addonsArray = [$addonsArray];
    }

    // Implode the array into a comma-separated string
    $addonsList = implode(", ", $addonsArray);
    $addonsList = (string)$addonsList; // Final cast for safety
    
    // Set default status (must match one of the allowed enum values, e.g., 'Pending')
    $status = (string)'Pending';

    // 2. Prepare SQL Statement to match ALL 14 target columns in tbl_inquiries
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

    // 3. Bind parameters: 'ssssssssssssss' (14 strings)
    // The order MUST match the columns listed in the query above.
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
        // This block catches the 'Data too long' error or similar database failures
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