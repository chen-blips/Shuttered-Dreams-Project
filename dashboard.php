<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shuttered Dreams - Admin Dashboard</title>
    <link rel="stylesheet" href="style.css"> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Merriweather&family=Playfair+Display:wght@600&family=Sacramento&display=swap" rel="stylesheet">
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
                    <li class="active"><a href="#"><i class="fas fa-chart-line"></i> Dashboard</a></li>
                    <li><a href="bookings.php"><i class="fas fa-calendar-check"></i> Bookings</a></li>
                    <li><a href="inquiries.php"><i class="fas fa-envelope"></i> Leads/Inquiries</a></li>
                    <li><a href="galleries.html"><i class="fas fa-images"></i> Galleries & Albums</a></li>
                    <li><a href="#"><i class="fas fa-users"></i> Clients</a></li>
                </ul>
            </nav>
        </aside>

        <main class="main-content">
            <header class="header">
                <h1>Dashboard Overview</h1>
                <div class="user-profile">
                    <span>Admin User</span>
                    <i class="fas fa-user-circle"></i>
                </div>
            </header>

            <section class="kpi-cards">
                <div class="card card-blue">
                    <div class="icon"><i class="fas fa-envelope-open-text"></i></div>
                    <div class="details">
                        <p class="label">New Leads (30 Days)</p>
                        <p class="value" id="newLeads">42</p>
                        <span class="trend up"><i class="fas fa-arrow-up"></i> 8%</span>
                    </div>
                </div>
                <div class="card card-green">
                    <div class="icon"><i class="fas fa-dollar-sign"></i></div>
                    <div class="details">
                        <p class="label">Bookings This Month</p>
                        <p class="value" id="bookingsMonth">6</p>
                        <span class="trend down"><i class="fas fa-arrow-down"></i> 2%</span>
                    </div>
                </div>
                <div class="card card-red">
                    <div class="icon"><i class="fas fa-calendar-alt"></i></div>
                    <div class="details">
                        <p class="label">Available Weekends</p>
                        <p class="value" id="availableDates">14</p>
                        <span class="trend neutral">Stable</span>
                    </div>
                </div>
                <div class="card card-yellow">
                    <div class="icon"><i class="fas fa-hdd"></i></div>
                    <div class="details">
                        <p class="label">Total Storage Used</p>
                        <p class="value" id="storageUsed">68%</p>
                        <span class="trend up"><i class="fas fa-arrow-up"></i> 1%</span>
                    </div>
                </div>
            </section>

            <section class="data-section">
                <div class="panel upcoming-shoots">
                    <h2><i class="fas fa-camera-retro"></i> Upcoming Shoots</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Client Name</th>
                                <th>Package</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="upcomingTableBody">
                            </tbody>
                    </table>
                    <button class="view-all-btn">View Full Calendar →</button>
                </div>

                <div class="panel recent-inquiries">
                    <h2><i class="fas fa-bell"></i> Recent Notifications</h2>
                    <ul id="inquiriesList">
                        <li>**Taylor & Alex:** Needs custom quote. <span class="tag tag-high">High Priority</span></li>
                        <li>**Sarah M.:** Asking about availability for 2026. <span class="tag tag-low">New Lead</span></li>
                        <li>**Client R. Update:** Final payment due next week. <span class="tag tag-finance">Finance</span></li>
                    </ul>
                    <button class="view-all-btn">Manage Leads →</button>
                </div>
            </section>

            <section class="gallery-section">
                <div class="panel photo-upload-status">
                    <h2><i class="fas fa-upload"></i> Photo Upload Status</h2>
                    <p>**Last Upload:** 2 hours ago (Client: C. Smith)</p>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: 85%;">85% Processed</div>
                    </div>
                    <button class="btn-primary"><i class="fas fa-cloud-upload-alt"></i> Upload New Gallery</button>
                </div>
            </section>
        </main>
    </div>

    <script src="dashboard.js"></script>
</body>
</html>