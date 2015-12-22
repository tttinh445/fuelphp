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

if (isset($_GET["page"])) { $page  = $_GET["page"]; } else { $page=1; };
$start_from = ($page-1) * 2; 
if (isset($_GET["page"])) { $take  = $_GET["take"]; } else { $take=1; };

$result = mysqli_query($con,"SELECT id,name FROM Posts limit $start_from,$take");
$arrResult = array();
while($row = mysqli_fetch_object($result)) {
    $arrResult['post'][] = $row;
}

$sql = "SELECT count(name) FROM Posts";
$rs_result = mysqli_query($con, $sql);
$row = mysqli_fetch_row($rs_result);
$total_records = $row[0];
$arrResult['pages'] = ceil($total_records/2);

//echo '<pre>';
//print_r($arrResult);
//echo '</pre>';

mysqli_close($con);
echo json_encode($arrResult);