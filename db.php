<?php
// FILE: db.php (Database Connection)
$servername = "localhost";
$db_username = "root";
$db_password = "";
$dbname = "registration";

// Create connection
$conn = mysqli_connect($servername, $db_username, $db_password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
} else {
    echo "connected";
    // Connection successful
    // echo "Connected successfully"; // Uncomment for debugging
}
?>
