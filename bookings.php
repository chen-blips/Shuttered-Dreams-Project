<?php
// === 1. DATABASE CONNECTION ===
require('inquiry_db.php'); 

// Check if the database connection failed
if (!isset($conn) || mysqli_connect_errno()) {
    die("Database Connection Failed: " . mysqli_connect_error());
}

// === 2. PROCESS STATUS UPDATE LOGIC (Controller Logic) ===
if (isset($_GET['id']) && isset($_GET['status'])) {
    
    $inquiry_id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);
    $new_status = trim($_GET['status']);

    // Validate ID and Status
    if (is_numeric($inquiry_id) && $inquiry_id > 0 && in_array($new_status, ['Confirmed', 'Declined'])) {
        
        // FIX: Use 'inquiry_id' in the UPDATE query to match the database column name
        $query = "UPDATE inquiries SET status = ? WHERE inquiry_id = ?"; 
        $stmt = mysqli_prepare($conn, $query);

        if ($stmt) {
            mysqli_stmt_bind_param($stmt, 'si', $new_status, $inquiry_id);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
        } else {
            error_log("Status Update Prepare Error: " . mysqli_error($conn));
        }
        
        // Redirect to remove the GET parameters from the URL after update
        header("Location: bookings.php?update_status=success");
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bookings Record - Shuttered Dreams</title>
    <link rel="stylesheet" href="style.css"> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>
    <div class="dashboard-container">
        
        <aside class="sidebar">
            <div class="logo-casing">
                <div class="logo-container">
                <div class="logo-centered">
                <img src="images/SDP_Logo0.1_White.png" alt="Shuttered Dreams Logo" class="sidebar-logo">
            </div>
                <span class="logo-separator"></span>
                <span class="logo-text">SHUTTERED DREAMS<br> PROJECT</span>
            </div>
        </div>
            <nav>
                <ul>
                    <li><a href="dashboard.php"><i class="fas fa-chart-line"></i> Dashboard</a></li>
                    <li class="active"><a href="bookings.php"><i class="fas fa-calendar-check"></i> Bookings</a></li>
                    <li><a href="inquiries.php"><i class="fas fa-envelope"></i> Leads/Inquiries</a></li>
                    <li><a href="galleries.html"><i class="fas fa-images"></i> Galleries & Albums</a></li>
                    <li><a href="clients.php"><i class="fas fa-users"></i> Clients</a></li>
                </ul>
            </nav>
        </aside>

        <main class="main-content">
            <header class="header">
                <h1>Booking Records</h1>
                <div class="user-profile">
                    Admin User <i class="fas fa-user-circle"></i>
                </div>
            </header>
            
            <div class="panel bookings-list-panel">
                <h2>🗓️ Upcoming Bookings</h2>
                
                <div class="table-actions" style="display: flex; justify-content: flex-end; gap: 10px; margin-bottom: 15px;">
                    <button class="action-btn">Export List</button>
                    <button class="btn-primary" style="font-weight: 600;">➕ Add New Booking</button> 
                </div>

                <table class="bookings-table">
                    <thead>
                        <tr>
                            <th>No.</th> 
                            <th>Date & Time</th>
                            <th>Client Name</th>
                            <th>Package</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody> 
                        <?php
                            include 'booking_process.php'; 
                        ?>
                    </tbody>          
                </table>
                
                <div class="table-footer" style="text-align: right; margin-top: 15px;">
                    <a href="#" class="view-all-btn">View Full Calendar →</a>
                </div>
            </div>

        </main>
    </div>
</body>
</html>