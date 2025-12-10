<?php
// NOTE: This script is included by bookings.php, so $conn is already available.

// --- CSS Variables for Inline Styling ---

// 1. Action Button Base Style (For View and Edit) - Styled like a button
$view_edit_style = 'style="display: inline-block; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.85em; font-weight: 600; color: #495057; background-color: #f8f9fa; border: 1px solid #ced4da; margin: 0 2px; white-space: nowrap;"';

// 2. Accept Button Styles (Green) - Primary Button Look
$accept_style = 'style="display: inline-block; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.85em; font-weight: 600; color: white; background-color: #28a745; border: 1px solid #28a745; margin: 0 2px; white-space: nowrap;"';

// 3. Decline Button Styles (Red) - Danger Button Look
$decline_style = 'style="display: inline-block; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.85em; font-weight: 600; color: white; background-color: #dc3545; border: 1px solid #dc3545; margin: 0 2px; white-space: nowrap;"';

// 4. Status Tag Base Style
$tag_base_style = 'style="padding: 4px 8px; border-radius: 12px; font-size: 0.75em; font-weight: 700; text-transform: uppercase; color: white; white-space: nowrap;';


// 1. SQL Query to Fetch ALL Upcoming Inquiries
$sql = "SELECT inquiry_id, wedding_date, preferred_names, package_selection, status 
        FROM inquiries 
        WHERE wedding_date >= CURDATE()
        ORDER BY wedding_date ASC";

$result = mysqli_query($conn, $sql);

// Check if the query was successful 
if ($result === false) {
    $mysql_error_detail = mysqli_error($conn);
    error_log("MySQLi Query Error: " . $mysql_error_detail);
    echo '<tr><td colspan="6" style="text-align: center; color: red;">Query Error: ' . htmlspecialchars($mysql_error_detail) . '</td></tr>';
}

// 2. Check for Results and Output HTML Rows
if ($result && mysqli_num_rows($result) > 0) {
    
    while($row = mysqli_fetch_assoc($result)) {
        
        $action_links = '';
        $status_icon = '';
        
        // --- Status Color and INLINE Style Determination (Icon Added Here) ---
        $status_color_style = '';
        
        switch ($row['status']) {
            case 'Confirmed':
                $status_color_style = 'background-color: #28a745;'; // Green
                $status_icon = '✔️';
                break;
            case 'Payment Due':
                $status_color_style = 'background-color: #ffc107; color: #333;'; // Yellow/Orange
                $status_icon = '💰';
                break;
            case 'Paid in Full':
                $status_color_style = 'background-color: #007bff;'; // Blue
                $status_icon = '💵';
                break;
            case 'Awaiting Quote':
                $status_color_style = 'background-color: #6c757d;'; // Gray
                $status_icon = '✉️';
                break;
            case 'Declined':
                $status_color_style = 'background-color: #dc3545;'; // Red
                $status_icon = '❌';
                break;
            case 'Pending':
                $status_color_style = 'background-color: #ffc107; color: #333;'; // Warning Yellow
                $status_icon = '⏳';
                break;
            default:
                $status_color_style = 'background-color: #cccdcdff;'; // Default Gray
                $status_icon = '⚫';
        }
        
        // Combine base style and color style for the final status tag inline style
        $final_tag_style = $tag_base_style . $status_color_style . '"';

        
        $display_date = date('M j, Y', strtotime($row['wedding_date']));
        $inquiry_id = htmlspecialchars($row['inquiry_id']); 
        
        // --- Action Links Logic with Button Styling (No Icons) ---
        if ($row['status'] === 'Pending') {
            // Pending: Show Accept/Decline Buttons
            $action_links .= '<a href="bookings.php?id=' . $inquiry_id . '&status=Confirmed"' . $accept_style . '>Accept</a>';
            $action_links .= ' '; 
            $action_links .= '<a href="bookings.php?id=' . $inquiry_id . '&status=Declined"' . $decline_style . '>Decline</a>';
        } else {
            // Others: Show View/Edit Links (Styled as neutral buttons)
            $action_links .= '<a href="view_inquiry.php?id=' . $inquiry_id . '"' . $view_edit_style . '>View</a>';
            $action_links .= ' '; 
            $action_links .= '<a href="edit_inquiry.php?id=' . $inquiry_id . '"' . $view_edit_style . '>Edit</a>';
        }
        
        // --- Output Table Row ---
        echo "<tr>";
        // 1. ID/No. COLUMN
        echo "<td>" . $inquiry_id . "</td>"; 
        // 2. Existing columns follow
        echo "<td>" . htmlspecialchars($display_date) . "</td>";
        echo "<td><strong>" . htmlspecialchars($row['preferred_names']) . "</strong></td>";
        echo "<td>" . htmlspecialchars($row['package_selection']) . "</td>";
        // 3. STATUS COLUMN with combined INLINE STYLE and ICON
        echo "<td><span {$final_tag_style}>" . $status_icon . ' ' . htmlspecialchars($row['status']) . "</span></td>";
        echo "<td>{$action_links}</td>";
        echo "</tr>";
    }
    
    mysqli_free_result($result);

} else {
    // No upcoming inquiries found
    echo '<tr><td colspan="6" style="text-align: center;">No upcoming bookings found.</td></tr>';
}

?>