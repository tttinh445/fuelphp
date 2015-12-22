<?php
$data = json_decode(file_get_contents("php://input"));
//echo $data->name . ' - ' . $data->alias;

$con=mysqli_connect("localhost","root","","muarau");
// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

mysqli_query($con,"INSERT INTO Posts (name)
VALUES ('".$data->name."')");

echo 'Insert success ' . $_FILES[$data->file]["name"];
//echo 'Insert success ';

mysqli_close($con);