document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // 1. DYNAMIC DATA POPULATION (Upcoming Shoots)
    // ==========================================================
    
    // Simulated data that would normally come from an API/database call
    const upcomingShoots = [
        { date: '2025-11-15', name: 'James & Chloe', package: 'Diamond', status: 'Contract Signed' },
        { date: '2025-12-03', name: 'Mia D.', package: 'Engagement', status: 'Payment Due' },
        { date: '2026-01-20', name: 'The Wilsons', package: 'Platinum', status: 'Initial Deposit' },
        { date: '2026-03-10', name: 'Laura & Ken', package: 'Gold', status: 'Draft Quote' },
        { date: '2026-04-05', name: 'Alex M.', package: 'Portrait', status: 'Paid in Full' },
    ];

    const tableBody = document.getElementById('upcomingTableBody');
    
    if (tableBody) {
        // Function to dynamically populate the table rows
        upcomingShoots.forEach(shoot => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = shoot.date;
            row.insertCell().textContent = shoot.name;
            row.insertCell().textContent = shoot.package;
            
            // Handle the status cell styling
            const statusCell = row.insertCell();
            const statusSpan = document.createElement('span');
            statusSpan.textContent = shoot.status;
            
            // Simple color coding based on status 
            if (shoot.status === 'Contract Signed' || shoot.status === 'Paid in Full') {
                statusCell.style.color = '#4CAF50'; // Green (Success)
                statusSpan.style.fontWeight = 'bold';
            } else if (shoot.status === 'Payment Due') {
                statusCell.style.color = '#F44336'; // Red (Warning)
                statusSpan.style.fontWeight = 'bold';
            } else {
                statusCell.style.color = '#2196F3'; // Blue (In Progress)
            }
            
            statusCell.appendChild(statusSpan);
        });
    }


    // ==========================================================
    // 2. DASHBOARD INTERACTIVITY 
    // ==========================================================

    // Functionality for the 'View Full Calendar' button
    const viewAllBtn = document.querySelector('.upcoming-shoots .view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            alert('Navigating to the Full Calendar/Bookings page...');
            // window.location.href = '/bookings';
        });
    }

    // Functionality for the 'Upload New Gallery' button
    const uploadBtn = document.querySelector('.btn-primary');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            // Simulate a progress bar update or open a modal
            const progressBar = document.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.width = '100%';
                progressBar.textContent = 'Upload Initiated...';
                setTimeout(() => {
                    alert('File Uploader Modal should open now!');
                }, 500);
            }
        });
    }

    // Functionality for the 'Manage Leads' button
    const manageLeadsBtn = document.querySelector('.recent-inquiries .view-all-btn');
    if (manageLeadsBtn) {
        manageLeadsBtn.addEventListener('click', () => {
            alert('Navigating to the Leads/Inquiries management page...');
            // window.location.href = '/leads';
        });
    }
});