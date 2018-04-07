<?php
include '../Database/db.php';
if(isset($_POST['action']))
{          

    if($_POST['action']=="login")
    {
        $username = mysqli_real_escape_string($mysqli,$_POST['username']);
        $password = mysqli_real_escape_string($mysqli,$_POST['password']);
        $strSQL = mysqli_query($connection,"SELECT * FROM accounts WHERE username='".$email."' and password='".md5($password)."'");
        $Results = mysqli_fetch_array($strSQL);
        if(count($Results)>=1)
        {
            $message = $Results['username']." Login Sucessfully!!";
            
        }
        else
        {
            $message = "Invalid email or password!!";
        }        
    }
}
?>


<!doctype html>
<!--Main page of the website. Authors: Chelsea, Justin, Adam, Vlad, Parker-->

<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="website.css">
  <link rel="stylesheet" type="text/css" href="loginbutton.css">
</head>

<!--background color: right now it's grey just to show we can change it-->

<body bgcolor="#7F8C8D">

<!--header bar: right now it's horizonal at the top of the page
With assistance from https://csswizardry.com/2011/01/create-a-centred-horizontal-navigation/-->
<div id="nav">
  <ul>
  <li><a href=LINK>Home</a></li>
  <li><a href=LINK>User</a></li>
  <li><a href=LINK>High Scores</a></li>
  <li><a href=LINK>ETC</a></li>
  <div id="nav2"><li><button onclick="document.getElementById('id01').style.display='block'" style="width:auto;">Login</button></li></div>
</ul>
</div>

<div id="id01" class="modal">

  <form class="modal-content animate"  method="post">
    <div class="container">
      <label for="username"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required>

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required>

      <button type="submit">Login</button>
      <label>
        <input type="checkbox" checked="checked" name="remember"> Remember me
      </label>
    </div>

    <div class="container" style="background-color:#f1f1f1">
      <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
      <span class="psw"><a href="../database/register.php">Don't have an account?</a></span>
      
    </div>
  </form>
</div
<script type="javascript">
  var modal = document.getElementById('id01');
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
</script>

<!--we could do another navigation bar here with user info? Right now it's just
the centered userpic, which I like too-->

<div id="usernav">
  <ul>
    <li><a href=LINK><img src=https://i.imgur.com/FDhE9AF.png border=10px></a></li>
  </div>

<!--These are the game links-->

<br>
<br>
<br>
<br>
<br>
<br>
<div id="gamelinks">
<center><a href="mazegame.html"><img src=https://i.imgur.com/yWINN7P.png></a>
  <a href=LINK><img src=https://i.imgur.com/yWINN7P.png></a>
  <a href=LINK><img src=https://i.imgur.com/yWINN7P.png></a>
</center>
</div>

</body>
