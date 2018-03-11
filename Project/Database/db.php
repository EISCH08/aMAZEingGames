<?php
/* Database connection settings */
$host = 'localhost';
$user = 'root';
$pass = 'pass123';
$db = 'Accounts';
$mysqli = new mysqli($host,$user, $pass, $db) or die($mysqli->error);
