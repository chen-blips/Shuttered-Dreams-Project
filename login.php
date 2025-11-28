<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pop-up Login</title>
    <link rel="stylesheet" href="login.css"> </head>
<body>

    <button onclick="document.getElementById('loginModal').style.display='block'">
        Open Login
    </button>

    <div id="loginModal" class="modal">
        
        <form class="modal-content animate" action="landing.php" method="post">
            
            <div class="container">
                <h2>Login</h2>
                
                <label for="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" required>

                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required>
                    
                <button type="submit" class="login-btn">Login</button>
                <label>
                    <input type="checkbox" checked="checked" name="remember"> Remember me
                </label>
            </div>

            <div class="container" style="background-color:#f1f1f1">
                <button type="button" onclick="document.getElementById('loginModal').style.display='none'" class="cancel-btn">Cancel</button>
                <span class="psw">Forgot <a href="#">password?</a></span>
            </div>
        </form>
    </div>

    <script src="JS/login.js"></script>

</body>
</html>