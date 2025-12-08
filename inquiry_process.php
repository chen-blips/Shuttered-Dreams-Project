<?php 
// inquiry_process.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format");
    }

    // Prepare email
    $to = ""; // Your email address
    $subject = "New Inquiry from $name";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email";
    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "Inquiry sent successfully.";
    } else {
        echo "Failed to send inquiry.";
    }  
} else {
    echo "Invalid request method.";
}

?>