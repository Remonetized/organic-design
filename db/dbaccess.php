<?php
# DB details
define('DB_SERVER', 'localhost'); define('DB_USERNAME', 'root'); define('DB_PASSWORD', ''); define('DB_NAME', 'wd_db');

# Create connection
$dbc = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

# Check connection
if (!$dbc) {
  die("Connection failed: " . $dbc->connect_error);
}