<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clients Management - Shuttered Dreams</title>
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
                    <li><a href="dashboard.php"><i class="fas fa-home"></i>Dashboard</a></li>
                    <li><a href="bookings.php"><i class="fas fa-calendar-alt"></i>Bookings</a></li>
                    <li><a href="inquiries.php"><i class="fas fa-bullhorn"></i>Leads Inquiries</a></li>
                    <li><a href="galleries.html"><i class="fas fa-images"></i>Galleries & Albums</a></li>
                    <li class="active"><a href="clients.php"><i class="fas fa-users"></i>Clients</a></li>
                </ul>
            </nav>
        </aside>

        <main class="main-content">
            <header class="header">
                <h1>Client Directory</h1>
                <div class="user-profile">
                    Admin User <i class="fas fa-user-circle"></i>
                </div>
            </header>
            
            <div class="panel client-directory-panel">
                <h2>👤 All Clients</h2>
                
                <div class="table-actions" style="display: flex; justify-content: space-between; gap: 10px; margin-bottom: 15px;">
                    <input type="text" placeholder="Search client name or email..." style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; flex-grow: 1; max-width: 300px;">
                    <button class="btn-primary" style="font-weight: 600;">➕ Add New Client</button> 
                </div>

                <table class="clients-table">
                    <thead>
                        <tr>
                            <th>Client Name</th>
                            <th>Primary Contact</th>
                            <th>Total Bookings</th>
                            <th>Last Activity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>**Alex & Sarah M.**</td>
                            <td>alex.sarah@email.com</td>
                            <td>3</td>
                            <td>Today (Gallery View)</td>
                            <td>
                                <button class="action-btn">View Profile</button>
                                <button class="action-btn">History</button>
                            </td>
                        </tr>
                        <tr>
                            <td>**C. Smith**</td>
                            <td>c.smith@biz.com</td>
                            <td>1</td>
                            <td>2026-01-05 (Paid)</td>
                            <td>
                                <button class="action-btn">View Profile</button>
                                <button class="action-btn">History</button>
                            </td>
                        </tr>
                        <tr>
                            <td>**Jennifer Lee**</td>
                            <td>jlee@webmail.net</td>
                            <td>2</td>
                            <td>2025-11-20 (Invoice Sent)</td>
                            <td>
                                <button class="action-btn">View Profile</button>
                                <button class="action-btn">History</button>
                            </td>
                        </tr>
                        <tr>
                            <td>**Liam K.**</td>
                            <td>liam.k@domain.org</td>
                            <td>0</td>
                            <td>2025-11-28 (Inquiry Rejected)</td>
                            <td>
                                <button class="action-btn">View Profile</button>
                                <button class="action-btn">History</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="table-footer" style="text-align: right; margin-top: 15px;">
                    <button class="view-all-btn">Export Client Data →</button>
                </div>
            </div>

        </main>
    </div>
</body>
</html>