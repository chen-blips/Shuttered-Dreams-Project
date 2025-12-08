<?php
// 1. Include the database connection file (You'll need to create this file)
include 'db_connect.php'; 

// 2. Define the SQL Query
// Assuming you have a 'bookings' table with columns like:
// booking_date, booking_time, client_name, package, status
$sql = "SELECT 
            DATE_FORMAT(booking_datetime, '%Y-%m-%d @ %h:%i %p') AS formatted_datetime, 
            client_name, 
            package, 
            status 
        FROM bookings
        ORDER BY booking_datetime ASC
        LIMIT 10"; // Only show the next 10 upcoming bookings
        
// 3. Execute the Query
$result = $conn->query($sql);

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
                <span class="logo-text">SHUTTERED DREAMS<br></br> PROJECT</span>
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
                            <th>Date & Time</th>
                            <th>Client Name</th>
                            <th>Package</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody> 
<?php
// 4. Iterate through the results and dynamically generate table rows
if ($result->num_rows > 0) {
    // Loop through each row of data
    while($row = $result->fetch_assoc()) {
        // Determine the appropriate CSS class for the status tag
        $status_class = '';
        switch ($row['status']) {
            case 'Confirmed':
            case 'Paid in Full':
                $status_class = 'tag-confirmed';
                break;
            case 'Payment Due':
                $status_class = 'tag-finance';
                break;
            case 'Awaiting Quote':
                $status_class = 'tag-low';
                break;
            default:
                $status_class = '';
        }
?>
                        <tr>
                            <td><?php echo htmlspecialchars($row['formatted_datetime']); ?></td>
                            <td><strong><?php echo htmlspecialchars($row['client_name']); ?></strong></td>                             
                            <td><?php echo htmlspecialchars($row['package']); ?></td>
                            <td><span class="tag <?php echo $status_class; ?>"><?php echo htmlspecialchars($row['status']); ?></span></td>
                            <td><a href="#" class="view-all-btn">View</a> | <a href="#" class="view-all-btn">Edit</a></td>
                        </tr>
<?php
    }
} else {
    // Display a row if no results are found
?>
                        <tr>
                            <td colspan="5" style="text-align: center;">No upcoming bookings found.</td>
                        </tr>
<?php
}
// 5. Close the database connection
$conn->close();
?>
                    </tbody>                 
                </table>
                
                <div class="table-footer" style="text-align: right; margin-top: 15px;">
                    <button class="view-all-btn">View Full Calendar →</button>
                </div>
            </div>

        </main>
    </div>
</body>
</html>