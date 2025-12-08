<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inquiry Management - Shuttered Dreams</title>
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
                    <li class="active"><a href="inquiries.php"><i class="fas fa-bullhorn"></i>Leads Inquiries</a></li>
                    <li><a href="galleries.html"><i class="fas fa-images"></i>Galleries & Albums</a></li>
                    <li><a href="clients.php"><i class="fas fa-users"></i>Clients</a></li>
                </ul>
            </nav>
        </aside>

        <main class="main-content">
            <header class="header">
                <h1>Leads & Inquiry Management</h1>
                <div class="user-profile">
                    Admin User <i class="fas fa-user-circle"></i>
                </div>
            </header>

            <div class="panel inquiries-list-panel">
                <h2>🔔 New Incoming Inquiries</h2>
                
                <table class="inquiry-table">
                    <thead>
                        <tr>
                            <th>Date Rec.</th>
                            <th>Client Name</th>
                            <th>Service Interest</th>
                            <th>Status</th>
                            <th class="action-column">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="new-inquiry">
                            <td>2025-12-07</td>
                            <td>**Jane D. & Mark B.**</td>
                            <td>Wedding Photography (2027)</td>
                            <td><span class="status-tag new">New Lead</span></td>
                            <td class="action-column">
                                <button class="action-btn accept-btn">Accept</button>
                                <button class="action-btn reject-btn">Reject</button>
                            </td>
                        </tr>
                        <tr>
                            <td>2025-12-05</td>
                            <td>**Robert J.**</td>
                            <td>Express Headshot</td>
                            <td><span class="status-tag reviewed">Reviewed</span></td>
                            <td class="action-column">
                                <button class="action-btn accept-btn">Accept</button>
                                <button class="action-btn reject-btn">Reject</button>
                            </td>
                        </tr>
                        <tr>
                            <td>2025-12-01</td>
                            <td>**Maria L. (Accepted)**</td>
                            <td>Family Portrait Session</td>
                            <td><span class="status-tag accepted">Accepted</span></td>
                            <td class="action-column">
                                <span class="tag tag-confirmed">Accepted</span>
                            </td>
                        </tr>
                        <tr>
                            <td>2025-11-28</td>
                            <td>**Liam K. (Rejected)**</td>
                            <td>Commercial Real Estate</td>
                            <td><span class="status-tag rejected">Rejected</span></td>
                            <td class="action-column">
                                <span class="tag tag-rejected">Rejected</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="table-footer" style="text-align: right; margin-top: 15px;">
                    <button class="view-all-btn">View Full Inquiry History →</button>
                </div>
            </div>

        </main>
    </div>
</body>
</html>