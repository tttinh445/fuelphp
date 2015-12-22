<?php

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('display_startup_errors', true);

$con=mysqli_connect("localhost","root","","muarau");
// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
mysqli_set_charset($con, 'utf8');
$result = mysqli_query($con,"SELECT id,name FROM Posts");
$arrResult = array();
while($row = mysqli_fetch_object($result)) {
    $arrResult[] = $row;
}

//echo '<pre>';
//print_r($arrResult);
//echo '</pre>';

mysqli_close($con);
echo json_encode($arrResult);