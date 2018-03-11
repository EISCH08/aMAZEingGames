<?php
session_start();
$_SESSION['message'] = '';
include 'db.php';

if ($_SERVER['REQUEST_METHOD']=="POST") {
  if ($_POST['password']==$_POST['confirmpassword']) {
    $username = $mysqli->real_escape_string($_POST['username']);
    $email = $mysqli->real_escape_string($_POST['email']);
    $password = md5($_POST['password']);

    $sql = "INSERT INTO users (username, email, password)" . "VALUES ('$username','$email','$password')";

    if ($mysqli->query($sql) == true) {
      $_SESSION['message'] = "Registration Successful! Added $username to the database";
      header("location: index.php");
      # code...
    }


     }
}

?>






<link rel="stylesheet" type="text/css" href="style.css">
<body>

<form action="register.php" method="post" style="border:1px solid #ccc">
  <div class="container">
    <h1>Sign Up</h1>
    <p>Please fill in this form to create an account.</p>
    <hr>

    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" required>
    <label for="username"><b>Username</b></label>
    <input type="text" placeholder="Enter username" name="username" required>

    <label for="password"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="password" required>

    <label for="Password"><b>Confirm Password</b></label>
    <input type="password" placeholder="Repeat Password" name="confirmpassword" required>
    
    <label>
      <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me
    </label>
    
    <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p>

    <div class="clearfix">
      <button type="button" class="cancelbtn">Cancel</button>
      <button type="submit" class="signupbtn">Sign Up</button>
    </div>
  </div>
</form>

</body>

 